var firebaseConfig = {
    apiKey: "AIzaSyDv4evXsUt_R_u37Sg07DT-k1HywKC5lE4",
    authDomain: "todo-list-62996.firebaseapp.com",
    databaseURL: "https://todo-list-62996-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "todo-list-62996",
    storageBucket: "todo-list-62996.appspot.com",
    messagingSenderId: "82532655600",
    appId: "1:82532655600:web:e690e962f8fe4e8fad3d35"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();