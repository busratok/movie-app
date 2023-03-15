import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDAOC6KvB8mjj2SEgGn6SqqinPAPFluHOQ",
  authDomain: "movieapp-30bb1.firebaseapp.com",
  projectId: "movieapp-30bb1",
  storageBucket: "movieapp-30bb1.appspot.com",
  messagingSenderId: "495013376826",
  appId: "1:495013376826:web:3b257b0828ce2dd1011603",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
