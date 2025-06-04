// src/services/addDishToFirestore.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export async function addDishToFirestore(dishData) {
  try {
    const docRef = await addDoc(collection(db, "dishes"), {
      ...dishData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Fel vid uppladdning av maträtt:", error);
    throw error;
  }
}
