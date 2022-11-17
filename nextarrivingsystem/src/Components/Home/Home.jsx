import React from "react";
import Login from "../Login/login";
import Registers from "../Registers/Registers";
import firebaseApp, { db } from "../../Firebase/Firebase";
import {
  collection,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import Admin from "../Users/Admin";
import Clients from "../Users/Client";
import { Link } from "react-router-dom";
import { useState } from "react";
const auth = getAuth(firebaseApp);
console.log("soy auth", auth);

const Home = ({ user }) => {
  return (
    <div>
      {/* <div>{user.email}</div>
      <div>{user.rol}</div> */}
      <div>{/* <Registers/> */}</div>
      {user.rol === "client" ? <Clients /> : <Admin user={user} />}
      {/* <div>
        <button
          className="btn rounded-full hover:bg-red-600"
          onClick={() => signOut(auth)}
        >
          Cerra sesion
        </button>
      </div> */}
    </div>
  );
};
export default Home;
