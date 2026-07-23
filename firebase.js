const firebaseConfig = {
  apiKey: "AIzaSyBxSnnYmQJHna8xvy4sd9JnnZ-IZPG3eeI",
  authDomain: "discordhub-d3b60.firebaseapp.com",
  projectId: "discordhub-d3b60",
  storageBucket: "discordhub-d3b60.firebasestorage.app",
  messagingSenderId: "907619302427",
  appId: "1:907619302427:web:40a608d98682b35f1b0cbe"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(function(user) {
  if (user) {
    localStorage.setItem("email", user.email);

    if (user.displayName) {
      localStorage.setItem("username", user.displayName);
    }
  } else {
    localStorage.removeItem("email");
    localStorage.removeItem("username");
  }
});