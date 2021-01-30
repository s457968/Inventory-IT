import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyA710hb8OMoQPrjx2xokY47Pghq-zDnrVg",
    authDomain: "inventory-it-5d7a0.firebaseapp.com",
    databaseURL: "https://inventory-it-5d7a0-default-rtdb.firebaseio.com",
    projectId: "inventory-it-5d7a0",
    storageBucket: "inventory-it-5d7a0.appspot.com",
    messagingSenderId: "652338833165",
    appId: "1:652338833165:web:1cecd1109605d084be7244"
  };

const fire = firebase.initializeApp(firebaseConfig);

export default fire;