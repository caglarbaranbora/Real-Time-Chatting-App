// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
// Your web app's Firebase configuration
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCltp-Wf5vG9ki_M3cg3V4SHfSWhuZizyQ",
  authDomain: "chat-app-react-native-184d5.firebaseapp.com",
  projectId: "chat-app-react-native-184d5",
  storageBucket: "chat-app-react-native-184d5.appspot.com",
  messagingSenderId: "836658318686",
  appId: "1:836658318686:web:9625949ca36df1e76153cf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
