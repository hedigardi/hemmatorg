// src/services/orderService.js
import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export async function createOrderInFirestore(orderData) {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      status: "new", // Initial status for a new order
      createdAt: serverTimestamp(),
    });
    console.log("Order created with ID: ", docRef.id);
    return docRef.id; // Return the new order's ID
  } catch (error) {
    console.error("Error creating order:", error);
    throw error; // Re-throw the error to be handled by the calling component
  }
}

export async function getOrdersByUserId(userId) {
    try {
      const ordersCollectionRef = collection(db, "orders");
      // Skapa en query för att filtrera på buyerId och sortera efter skapandedatum
      const q = query(
        ordersCollectionRef,
        where("buyerId", "==", userId),
        orderBy("createdAt", "desc") // Senaste ordrarna först
      );
      const querySnapshot = await getDocs(q);
      const orders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return orders;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }