import { useEffect, useState } from "react";
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
import { SetData } from "./types";


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
        const temp = new Map()

        for (const [key, value] of Object.entries(res)) {
          temp.set(key, value);
        }
        setSets(temp)
      })
    }
    fetchData()
  }, []
  )

  return (
    <div className="App">
      <header className="App-header">
        <div className="left-half">
          <h1><Link to="/">Cognitio</Link></h1>
        </div>
        <div className="right-half">
          <AuthButton currUser={currUser} login={loginWithGoogle} logout={logOut} />
        </div>
      </header>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home sets={sets} />} />
          <Route path="/sets/:id/" element={<Sets />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
