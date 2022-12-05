import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC_Zr5IgPIa8nGuHMTA6DZguyParxtH4fE",
  authDomain: "marrigeorbit-8a552.firebaseapp.com",
  projectId: "marrigeorbit-8a552",
  storageBucket: "marrigeorbit-8a552.appspot.com",
  messagingSenderId: "657323529084",
  appId: "1:657323529084:web:72b0e530440d1bafde4af9"
};

// Initialize Firebase
const firebaseApp  = firebase.initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const auth = firebase.auth()
const db = firebaseApp.firestore()
export {auth , db ,storage}
export const createUserCollecton =async(user,additionalData)=>{
  if(!user) return;
  const userRef = db.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists){
    const {email} = user;
    const {displayName} = additionalData;
    const {number} = additionalData;
    const {birth} = additionalData;
    const {gender} = additionalData;
    const {about} = additionalData;
    const {height} = additionalData;
    const {maritalStatus} = additionalData;
    const {diet} = additionalData;
    const {work} = additionalData;
    const {qaulification} = additionalData;
    const {collage} = additionalData;
    const {family} = additionalData;
    const {country} = additionalData;
    const {city}  = additionalData;
    const {state} = additionalData;
    const {religion} = additionalData;
    const {tounge} = additionalData;
    const {manglik} = additionalData;
    const {horoscope} = additionalData;
    const {address} = additionalData;
    const {aboutFamily} = additionalData;
    const {brother} = additionalData;
    const {sister} = additionalData;
    const {familyLive} = additionalData;
    const {fatherWork} = additionalData;
    const {motherWork} = additionalData;
    const {income} = additionalData;
    const {community} = additionalData;

    try{
      userRef.set({
      aboutFamily,
      country,
      address,
      brother,
      sister,
      familyLive,
      fatherWork,
      motherWork,
      horoscope,
      manglik,
      about,
      email,
      income,
      displayName,
      maritalStatus,
      height,
      number,
      gender,
      birth,
      diet,
      work,
      qaulification,
      collage,
      family,
      city,
      state,
      religion,
      tounge,
      community,
      createdAt :new Date(),
      isOnline:true,
      uid:user.uid,
      })
    }
    catch(err){
      console.log(err);
    }
  }
}