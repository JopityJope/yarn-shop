import React, { useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { auth, db } from "../firebase-config";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  getDocs,
  getDoc,
  where,
} from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const usersCollectionRef = collection(db, "users");

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword() {
    const user = auth.currentUser;
    return sendPasswordResetEmail(auth, user.email);
  }

  function forgottenPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  async function addData(data) {
    return addDoc(collection(db, "users"), data);
  }

  async function updateUserField(fieldName, value) {
    try {
      if (currentUser) {
        const userData = await getData();
        if (userData) {
          const id = userData.id;
          const userRef = doc(db, "users", id);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            await updateDoc(userRef, { [fieldName]: value });
          } else {
            console.error("User document not found");
          }
        } else {
          console.error("User data not available");
        }
      }
    } catch (error) {
      console.error("Error updating user field:", error.message);
    }
  }

  async function updateWishlist(wishlist) {
    await updateUserField("wishlist", wishlist);
  }

  async function updateCart(cart) {
    await updateUserField("cart", cart);
  }

  async function updateDelivery(deliveryAddress) {
    await updateUserField("deliveryAddress", deliveryAddress);
  }

  async function updatePayment(payment) {
    await updateUserField("payment", payment);
  }

  async function updateOrders(order) {
    await updateUserField("orders", order);
  }

  async function getData() {
    try {
      if (currentUser) {
        const user = auth.currentUser;
        const userQuery = await getDocs(
          query(collection(db, "users"), where("email", "==", user.email))
        );

        if (userQuery.docs.length > 0) {
          const userData = userQuery.docs[0].data();
          return { ...userData, id: userQuery.docs[0].id };
        } else {
          console.error("User document not found");

          return null;
        }
      }
      return null;
    } catch (error) {
      console.error("Error fetching user data:", error.message);

      return null;
    }
  }

  function deleteData(id) {
    return deleteDoc(doc(db, "users", id));
  }

  async function updateFirstName(id, newData) {
    console.log(id, newData);
    return updateDoc(doc(db, "users", id), { firstName: newData });
  }

  async function updateLastName(id, newData) {
    console.log(id, newData);
    return updateDoc(doc(db, "users", id), { lastName: newData });
  }

  async function changeEmail(email, password) {
    const user = auth.currentUser;
    const credentials = EmailAuthProvider.credential(user.email, password);

    try {
      await reauthenticateWithCredential(user, credentials);
      await verifyBeforeUpdateEmail(auth.currentUser, email);
    } catch (error) {
      throw error;
    }
  }

  async function deleteAccount(password) {
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);

      return true;
    } catch (error) {
      console.error("Error deleting account:", error.message);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    changeEmail,
    forgottenPassword,
    deleteAccount,
    addData,
    deleteData,
    updateFirstName,
    updateLastName,
    getData,
    usersCollectionRef,
    updateWishlist,
    updateCart,
    updateDelivery,
    updatePayment,
    updateOrders,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
