import {db, auth} from "./firebase";
import {collection, getDocs, getDoc, doc, setDoc, addDoc, deleteDoc} from "firebase/firestore"

import React from 'react'

const FirebaseDataProvider =  {
  getList: async (resource) => {
    const querySnapshot = await getDocs(collection(db, resource))
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
      console.log('Data fetched:', data);
      return {data, total: data.length}
  },

  getOne: async (resource, params) => {
    const docRef = doc(db, resource, params.id)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) throw new Error("Document does not exist")
      return {data:{id:docSnap.id, ...docSnap.data()}}
  },

  create: async (resource, params) => {
    const docRef = await addDoc(collection(db, resource), params.data)
    return {data: {id: docRef.id, ...params.data}}
  },

  update: async (resource, params) => {
    const docRef = doc(db, resource, params.id)
    await setDoc(docRef, params.data, {merge: true})
    return {data: {id: params.id, ...params.data}}
  },

  delete: async (resource, params) => {
    const docRef = doc(db, resource, params.id)
    await deleteDoc(docRef)
    return {data: params.previousData}
  }
}

export default FirebaseDataProvider