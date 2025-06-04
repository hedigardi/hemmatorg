// src/services/orderService.js
import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy, writeBatch, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export async function createOrderInFirestore(orderData) {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      status: "new", // Initial status for a new order
      createdAt: serverTimestamp(), // Use server timestamp
    });
    const orderId = docRef.id;
    console.log("Main order created with ID: ", orderId);

    // Now, create entries in seller_order_items collection for each item
    const batch = writeBatch(db); // Use a batch write for efficiency
    const sellerOrderItemsCollectionRef = collection(db, "seller_order_items");

    // Ensure orderData.items is an array before iterating
    if (Array.isArray(orderData.items)) {
      orderData.items.forEach(item => {
        // Ensure item.dish and item.dish.sellerId exist
        if (item.dish && item.dish.sellerId) {
          const sellerOrderItemRef = doc(sellerOrderItemsCollectionRef); // Auto-generate ID
          batch.set(sellerOrderItemRef, {
            orderId: orderId,
            sellerId: item.dish.sellerId, // Get sellerId from the dish object
            buyerId: orderData.buyerId,
            dish: { // Store relevant item details
              id: item.dish.id,
              title: item.dish.title,
              priceAtPurchase: item.dish.price,
            },
            quantity: item.quantity,
            createdAt: serverTimestamp(), // Use server timestamp for item too
            status: "new", // Item-specific status (optional, can link to main order status)
          });
        } else {
          console.warn("Skipping item in seller_order_items due to missing dish or sellerId:", item);
        }
      });
    } else {
        console.warn("orderData.items is not an array:", orderData.items);
    }

    await batch.commit(); // Commit the batch write
    console.log(`Created ${orderData.items.length} seller order item entries for order ${orderId}`);

    return orderId; // Return the new order's ID
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

  // New function to get order items for a specific seller
export async function getSellerOrderItems(sellerId) {
    try {
      const sellerOrderItemsCollectionRef = collection(db, "seller_order_items");
      const q = query(
        sellerOrderItemsCollectionRef,
        where("sellerId", "==", sellerId),
        orderBy("createdAt", "desc") // Latest items first
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching seller order items:", error);
      throw error;
    }
  }