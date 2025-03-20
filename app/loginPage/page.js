"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for useRouter
import { HandleAccountContext } from "@/context/AccountContext";

export default function loginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { session, setSession } = useContext(HandleAccountContext);

  async function login() {
    const login = { username: userName, password: password };
    console.log("login credentials", login);
    setPassword("");
    setUserName("");

    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Login successful:", data);
      setSession(data.session);
      router.push(`/me/${data.session.userId}`);
    } else {
      const error = await response.json();
      alert(error.message);
    }
  }

  return (
    <div className="flex flex-col min-h-screen items-center p-10 gap-10">
      <h1 className="text-5xl">Logga in:</h1>
      <div className="flex flex-col gap-5">
        <input
          type="text"
          className="bg-white text-black rounded-lg px-5 py-2"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={userName}
        />
        <input
          type="password"
          className="bg-white text-black rounded-lg px-5 py-2"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />

        <button
          className="bg-gray-500 px-5 py-2 rounded-lg text-center"
          onClick={login}
        >
          Log in
        </button>
      </div>
    </div>
  );
}
