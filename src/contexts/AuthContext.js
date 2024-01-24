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

  async function getData() {
    const user = auth.currentUser;
    const userQuery = await getDocs(
      query(collection(db, "users"), where("email", "==", user.email))
    );
    const userData = userQuery.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const firstName = userData[0].firstName;
    const lastName = userData[0].lastName;
    const id = userData[0].id;
    return { firstName, lastName, id };
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

  async function deleteAccount() {
    const user = auth.currentUser;
    return deleteUser(user);
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
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
