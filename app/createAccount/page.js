"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CreateAccountPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function createNewAccount() {
    const newAccount = { username: userName, password: password };

    setPassword("");
    setUserName("");

    await fetch("http://localhost:4000/createAccount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAccount),
    });
  }

  return (
    <div className="flex flex-col min-h-screen items-center p-10 gap-10">
      <h1 className="text-5xl">skapa ett konto:</h1>
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
        <Link href="/loginPage">
          <button
            className="bg-gray-500 px-5 py-2 rounded-lg  text-center"
            onClick={createNewAccount}
          >
            Create Account
          </button>
        </Link>
      </div>
    </div>
  );
}
