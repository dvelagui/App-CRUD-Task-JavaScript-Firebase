// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDoc, getDocs, onSnapshot, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyAP8AInU-r5YflR2mTq9zcVi622n3TuIRk",
authDomain: "fir-crud-js-8cc03.firebaseapp.com",
projectId: "fir-crud-js-8cc03",
storageBucket: "fir-crud-js-8cc03.appspot.com",
messagingSenderId: "560946747400",
appId: "1:560946747400:web:ce3c8f487c00cfc00b19bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()
export const saveTask = (title, description) => addDoc(collection(db, "tasks"), {title, description});

export const getTasks = () =>  getDocs(collection(db, "tasks"));

export const onGetTask = (callback) => onSnapshot(collection(db, "tasks"), callback);

export const deleteTask = id => deleteDoc(doc(db, "tasks", id));

export const getTask = id =>  getDoc(doc(db, "tasks", id));

export const updateTask = (id, newFields) => updateDoc(doc(db,"tasks", id), newFields);