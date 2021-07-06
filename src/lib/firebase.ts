import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import {Shop} from "../types/Shop"
import {initialUser, User} from "../types/User";
import {Review} from "../types/Review"

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
    const snapshot = await firebase.firestore().collection("shops").orderBy("score", "desc").get()
    const shops = snapshot.docs.map((doc) => {
        return {...doc.data(),id : doc.id} as Shop
    })
    return shops
}

export const signin = async () => {
    const userCredintial = await firebase.auth().signInAnonymously()
    const {uid} = userCredintial.user
    const userDoc = await firebase.firestore().collection("users").doc(uid).get()
    if (!userDoc.exists) {
        await firebase.firestore().collection("users").doc(uid).set(initialUser)
        return {
            ...initialUser,
            id: uid
        } as User
    } else {
        return {
            id: uid,
            ...userDoc.data()
        } as User
    }
}

export const updateUser = async (userId: string, params: any) => {
    await firebase.firestore().collection("users").doc(userId).update(params)
}

export const createReviewRef = async (shopId: string) => {
    return await firebase.firestore().collection("shops").doc(shopId).collection("reviews").doc()
}

export const uploadImage = async (uri : string , path : string) => {
    const localUri = await fetch(uri)
    const blob = await localUri.blob()
    const ref = firebase.storage().ref().child(path)
    let downloadUrl = ""
    try{
        await ref.put(blob)
        downloadUrl = await ref.getDownloadURL()
    }catch(err){
        console.log(err)
    }
    return downloadUrl
}

export const getReviews = async (shopId : string) => {
    const shopReviewDoc = await firebase.firestore().collection("shops").doc(shopId).collection("reviews").orderBy("createdAt","desc").get()
    const reviews = shopReviewDoc.docs.map((doc) => {
        return {
            ...doc.data(),
            id : doc.id
        } as Review
    })
    return reviews
}
