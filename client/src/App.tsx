import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Another from "./pages/Another";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";

import { auth } from "./firebase";
import AuthButton from "./components/AuthButton";


function App() {
  function loginWithGoogle() {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider);
  }

  function logOut() {
    return auth.signOut();
  }

  const [currUser, setCurrUser] = useState<User | null>(null);

  onAuthStateChanged(auth, (user) => {
    setCurrUser(user);
  });

  // the header tag can be extracted into a navbar for better layout
  return (
    <div className="App">
      <header className="App-header">
        <AuthButton currUser={currUser} login={loginWithGoogle} logout={logOut} />
        <img src={logo} className="App-logo" alt="logo" />
        <div className="menu">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/another">Another Page</Link>
            </li>
          </ul>
        </div>
      </header>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/another" element={<Another />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
