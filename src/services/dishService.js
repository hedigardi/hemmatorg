// src/services/dishService.js
import { collection, getDocs, getDoc, doc, query, orderBy, where, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export async function getAllDishes() {
  try {
    const dishesCollectionRef = collection(db, "dishes");
    const q = query(dishesCollectionRef, orderBy("createdAt", "desc")); // Optional: order by creation date
    const querySnapshot = await getDocs(q);
    const dishes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return dishes;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    throw error; // Re-throw the error to be handled by the calling component
  }
}

export async function deleteDishFromFirestore(dishId) {
  try {
    const dishRef = doc(db, "dishes", dishId);
    await deleteDoc(dishRef);
    console.log(`Dish with ID: ${dishId} successfully deleted.`);
  } catch (error) {
    console.error("Error deleting dish:", error);
    throw error;
  }
}

export async function updateDishInFirestore(dishId, dishData) {
  try {
    const dishRef = doc(db, "dishes", dishId);
    await updateDoc(dishRef, dishData); // dishData should not include createdAt or sellerId if they are not changing
    console.log(`Dish with ID: ${dishId} successfully updated.`);
  } catch (error) {
    console.error("Error updating dish:", error);
    throw error;
  }
}

export async function getDishById(dishId) {
    try {
      const dishDocRef = doc(db, "dishes", dishId);
      const docSnap = await getDoc(dishDocRef);
  
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error("Maträtten hittades inte."); // Specific error for not found
      }
    } catch (error) {
      console.error("Error fetching dish by ID:", error);
      throw error;
    }
  }

  export async function getDishesBySellerId(sellerId) {
    try {
      const dishesCollectionRef = collection(db, "dishes");
      const q = query(
        dishesCollectionRef,
        where("sellerId", "==", sellerId),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching dishes by seller ID:", error);
      throw error;
    }
  }