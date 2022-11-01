import logo from "./logo.svg";
import "./App.css";
import Home from "./Components/Home/Home";
import { useState, React } from "react";
import FirebaseApp from "./Firebase/Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import Login from "./Components/Login/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Edit from "./Components/Orders/Edit";
import Create from "./Components/Orders/Create";
const auth = getAuth(FirebaseApp);

function App() {
  const [user, setUser] = useState(null);
  const firestore = getFirestore(FirebaseApp);

  async function getRol(uid) {
    const docuRef = doc(firestore, `users/${uid}`);
    const docu = await getDoc(docuRef);
    const userRol = docu.data().rol;
    return userRol;
  }
  async function setUserWithFirebaseRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      };
      setUser(userData);
    });
  }
  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      if (!user) {
        setUserWithFirebaseRol(usuarioFirebase);
      }
    } else {
      setUser(null);
    }
  });
  return (
    <div className="App">
      <BrowserRouter>
        {user ? (
          <Routes>
            <Route
              exact
              path="/"
              element={<Home user={user} correo={user.email} />}
            ></Route>
            <Route exact path='/edit/:id' element={<Edit/>}></Route>
            <Route exact path='/Create' element={<Create/>}></Route>
          </Routes>
        ) : (
          <Login />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
