import firebase from 'firebase/app';
import 'firebase/firestore';
import { setUpRoom, createRoom } from "./network";

const firebaseConfig = {
  apiKey: "AIzaSyCmlUA-nwCjHoB-LQ2PS-a_A48BXYCut-Y",
  authDomain: "webrtc-135a9.firebaseapp.com",
  projectId: "webrtc-135a9",
  storageBucket: "webrtc-135a9.appspot.com",
  messagingSenderId: "446109055804",
  appId: "1:446109055804:web:aadf33bd0d107bc8bafc39",
  measurementId: "G-GRT5S9DKMX"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

const servers = {
  iceServers: [{
    urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
  }, ],
  iceCandidatePoolSize: 10,
};

// Global State
const pc = new RTCPeerConnection(servers);
let localStream = null;
let remoteStream = null;

// HTML elements
const webcamVideo = document.getElementById('webcamVideo');
const remoteVideo = document.getElementById('remoteVideo');

// 1. Setup media sources

async function initMeet() {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  remoteStream = new MediaStream();

  // Push tracks from local stream to peer connection
  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

  // Pull tracks from remote stream, add to video stream
  pc.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };

  webcamVideo.srcObject = localStream;
  remoteVideo.srcObject = remoteStream;

  const params = new URLSearchParams(window.location.search);
  if (params.has("meetid")) {
    let roomID = params.get("meetid");
    let callID = await setUpRoom(roomID);
    await answerCall(callID);
  } else {
    let offer = await createOffer();
    let roomID = await createRoom(offer);
    await setUpRoom(roomID);
  }
};

// 2. Create an offer
async function createOffer() {
  // Reference Firestore collections for signaling
  const callDoc = firestore.collection('calls').doc();
  const offerCandidates = callDoc.collection('offerCandidates');
  const answerCandidates = callDoc.collection('answerCandidates');

  // Get candidates for caller, save to db
  pc.onicecandidate = (event) => {
    event.candidate && offerCandidates.add(event.candidate.toJSON());
  };

  // Create offer
  const offerDescription = await pc.createOffer();
  await pc.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  };

  await callDoc.set({ offer });

  // Listen for remote answer
  callDoc.onSnapshot((snapshot) => {
    const data = snapshot.data();
    if (!pc.currentRemoteDescription && data.answer) {
      const answerDescription = new RTCSessionDescription(data.answer);
      pc.setRemoteDescription(answerDescription);
      console.log(data.answer);
    }
  });

  // When answered, add candidate to peer connection
  answerCandidates.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const candidate = new RTCIceCandidate(change.doc.data());
        console.log(change.doc.data());
        pc.addIceCandidate(candidate);
        showClient();
      }
    });
  });

  return callDoc.id;
};

// 3. Answer the call with the unique ID
async function answerCall(callId) {
  const callDoc = firestore.collection('calls').doc(callId);
  const answerCandidates = callDoc.collection('answerCandidates');
  const offerCandidates = callDoc.collection('offerCandidates');

  pc.onicecandidate = (event) => {
    event.candidate && answerCandidates.add(event.candidate.toJSON());
  };

  const callData = (await callDoc.get()).data();

  const offerDescription = callData.offer;
  await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

  const answerDescription = await pc.createAnswer();
  await pc.setLocalDescription(answerDescription);

  const answer = {
    type: answerDescription.type,
    sdp: answerDescription.sdp,
  };

  await callDoc.update({ answer });

  offerCandidates.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      console.log(change);
      if (change.type === 'added') {
        let data = change.doc.data();
        pc.addIceCandidate(new RTCIceCandidate(data));
        showClient();
      }
    });
  });
};

function showClient() {
  remoteVideo.style.display = "flex";
}

export { initMeet }