'use client'
import { useEffect, useState, useRef } from "react";
import { BackgroundBeamsWithCollision } from '../../components/background-beams'; 
import Sidebar from '../../components/sidebar-export';
import { HoverEffect } from '../../components/card'; // Adjust the import path as necessary

export default function Contribute() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletLoading, setWalletLoading] = useState(true); 

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Check if Ethereum provider is available
        if (typeof window.ethereum !== 'undefined') {
          // Retrieve accounts already connected
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  
          // Check if any accounts are returned
          if (accounts.length > 0) {
            console.log("Already connected to Ethereum wallet:", accounts[0]);
            setWalletAddress(accounts[0]); // Store the wallet address if needed
          } else {
            // If no accounts are connected, request access
            const newAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (newAccounts.length > 0) {
              console.log("Connected to Ethereum wallet:", newAccounts[0]);
              setWalletAddress(newAccounts[0]); // Store the wallet address
              // window.location.href = "/main"; 
            } else {
              console.error("No accounts found.");
            }
          }
        } else {
          console.error("Ethereum wallet not detected. Please install MetaMask or another wallet.");
        }
      } catch (err) {
        console.error("Error checking connection:", err);
      }
    };
  
    // Check connection on component mount
    checkConnection();
  }, []);
  


    const items = [
        {
          title: "Reentrancy",
          description: "Occurs when a contract calls a function on another contract that then calls back into the original contract before the original call completes, potentially leading to unintended consequences.",
          link: "https://swcregistry.io/docs/SWC-107/"
        },
        {
          title: "Integer Overflow and Underflow",
          description: "Happens when arithmetic operations exceed the maximum or minimum value of a data type, leading to unexpected results or potential security vulnerabilities.",
          link: "https://swcregistry.io/docs/SWC-101/"
        },
        {
          title: "Unchecked Call Return Values",
          description: "Failing to check the return value of an external function call can lead to unexpected behavior or security vulnerabilities.",
          link: "https://swcregistry.io/docs/SWC-104/"
        },
        {
          title: "Denial of Service (DoS)",
          description: "Occurs when a contract's functionality is intentionally hindered or prevented, often through excessive resource consumption or malicious actions.",
          link: "https://swcregistry.io/docs/SWC-113/"
        },
        {
          title: "All other vulnerabilities",
          description: "The content of the SWC registry has not been thoroughly updated since 2020. It is known to be incomplete and may contain errors as well as crucial omissions.",
          link: "https://swcregistry.io/"
        }
      ];

    return (
        <div className="flex h-screen">
            <Sidebar />

            <BackgroundBeamsWithCollision className="flex-grow flex flex-col justify-center items-center">
                <HoverEffect items={items} />
            </BackgroundBeamsWithCollision>
        </div>
    );
}
