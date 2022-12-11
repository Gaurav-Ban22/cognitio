import React, { useEffect, useState } from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";

import { auth } from "./firebase";
import AuthButton from "./components/AuthButton";
import NoPage from "./pages/NoPage";
import Sets from "./pages/Sets";
import { Card, SetData } from "./types";


function App() {
  function loginWithGoogle() {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider);
  }

  function logOut() {
    return auth.signOut();
  }

  const [currUser, setCurrUser] = useState<User | null>(null);
  const [sets, setSets] = useState<Map<string, SetData>>(new Map())

  onAuthStateChanged(auth, (user) => {
    setCurrUser(user);
  });

  useEffect(() => {
    async function fetchData() {
      fetch("/api/sets").then(res => res.json()).then((res) => {
        console.log(res)

        setSets(new Map(Object.entries(res)))
      })
    }
    fetchData()
  }, []
  )

  return (
    <div className="App">
      <header className="App-header">
        <h1><Link to="/">Cognitio</Link></h1>
        <AuthButton currUser={currUser} login={loginWithGoogle} logout={logOut} />
      </header>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sets/:id" element={<Sets />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        {sets.size}
        {Object.entries(sets).map(set => <Link to={"/sets/" + set[0]}>asdf</Link>)}
      </div>
    </div>
  );
}

export default App;
