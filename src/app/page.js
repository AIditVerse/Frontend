'use client';
import { useEffect } from "react";
import DraggableBackground from '../components/draggable';

// Function to connect to aptos Wallet
async function getAccount() {
  try {
    for (const key in window) {
      if (window.hasOwnProperty(key)) {
        console.log(key);
      }
    }
    // Assuming aptos Wallet is injected as `window.aptos`
    await window.aptos.connect();
    if (window.aptos.isConnected) {
      window.location.href = "/main";
    }
  } catch (error) {
    console.error("Error connecting to aptos Wallet:", error);
  }
}

export default function Landing() {
  useEffect(() => {
    const checkConnection = async () => {
      try {
        for (const key in window) {
          if (window.hasOwnProperty(key)) {
            console.log(key);
          }
        }
        // Attempt to connect to aptos Wallet
        await window.aptos.connect();
        console.log("Connected to aptos Wallet");
        // If connected, redirect to the main page
        if (window.aptos.isConnected) {
          window.location.href = "/main";
        }
      } catch (err) {
        console.error("Error checking connection:", err);
      }
    };

    // Wait until aptos Wallet object is available
    if (window.aptos) {
      setTimeout(checkConnection, 100);
    }
  }, []);

  return (
    <main>
      <DraggableBackground />
      <div className="flex flex-col justify-center items-center h-screen">
        <button className="p-[3px] relative" onClick={getAccount}>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
            Connect with Aptos Wallet
          </div>
        </button>
      </div>
    </main>
  );
}
