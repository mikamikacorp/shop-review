import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import {Shop} from "../types/Shop"

if (!firebase.apps.length) {
    const firebaseConfig = {
        apiKey: "AIzaSyAVHrfqjmhmvfceeZ5Qdliz_vkQ2QPaWTE",
        authDomain: "showp-review.firebaseapp.com",
        projectId: "showp-review",
        storageBucket: "showp-review.appspot.com",
        messagingSenderId: "345989532919",
        appId: "1:345989532919:web:1937374bddce0a63db97f2",
        measurementId: "G-Y6C2SCG8PB"
    };
    firebase.initializeApp(firebaseConfig)
}

export const getShops = async () => {
    const snapshot = await firebase.firestore().collection("shops").get()
    const shops = snapshot.docs.map((doc) => {
        return doc.data() as Shop
    })
    return shops
}
