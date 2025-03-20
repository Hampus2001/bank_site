"use client";

import { HandleAccountContext } from "@/context/AccountContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserAccount() {
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { session, setSession } = useContext(HandleAccountContext);

  const [addMoney, setAddMoney] = useState(0);

  async function depositMoney() {
    const response = await fetch("http://localhost:4000/deposit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: addMoney, userId: userData.userId }),
    });
    if (response.ok) {
      const data = await response.json();
      userData.amount = data.amount;
      console.log("deposit successful, here's data:", data); // Log backend response
    } else {
      const error = await response.json();
      console.error("Error during deposit:", error); // Log error
      alert(error.message);
    }
    setAddMoney(0);
  }

  useEffect(() => {
    console.log("Session data being sent to backend:", session); // Log session data

    async function verifyLogin() {
      const response = await fetch("http://localhost:4000/verifyLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(session),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetch successful, here's data:", data); // Log backend response
        setUserData(data);
      } else {
        const error = await response.json();
        console.error("Error during verification:", error); // Log error
        alert(error.message);
        router.push("/loginPage");
      }

      setIsLoading(false);
    }

    verifyLogin();
  }, []);

  useEffect(() => {
    console.log("userData", userData);
  }, [userData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  async function logOut() {
    await fetch("http://localhost:4000/logOut", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(session),
    });
    setUserData(null);
    setSession([]);
    router.push("/loginPage");
  }

  return (
    <div className="flex flex-col min-h-screen items-center p-10">
      <h1>Account</h1>
      {userData && (
        <div className="flex flex-col">
          <p>Welcome, {userData.username}</p>
          <p>Account Balance: {userData.amount}</p>
          <div>
            <input
              type="number"
              placeholder="Choose amount"
              onChange={(e) => setAddMoney(e.target.value)}
            />
            <button onClick={depositMoney}>deposit money</button>
          </div>
          <button onClick={logOut}>Log outs</button>
        </div>
      )}
    </div>
  );
}
