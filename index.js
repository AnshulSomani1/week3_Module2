import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atmContract, setAtmContract] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getATMContract();
  }
  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContractInstance = new ethers.Contract(contractAddress, atmABI, signer);

    setAtmContract(atmContractInstance);
  };

  const getBalance = async () => {
    if (atmContract) {
      const balance = await atmContract.get_balance();
      setBalance(balance.toNumber());
    }
  };

  const deposit = async () => {
    if (atmContract) {
      const tx = await atmContract.deposit(1);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atmContract) {
      const num = document.getElementById("num1");
      const tx = await atmContract.withdraw(1);
      await tx.wait();
      getBalance();
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to use this ATM.</p>;
    }

    if (!account) {
      return <button style={{ backgroundColor: "#e1ecf4",borderRadius: "3px",border: "1px solid #7aa7c7",
        boxShadow: "rgba(255, 255, 255, .7) 0 1px 0 0 inset",color: "#39739d",
        cursor: "pointer",fontFamily: `-apple-system,system-ui,"Segoe UI","Liberation Sans",sans-serif`,
        fontSize: "16px", fontWeight: "500",  lineHeight: 1.25385,textAlign: "center", textDecoration: "none",padding:"12px 12px"
      }} onClick={connectAccount}>Connect to your MetaMask Wallet</button>;
      
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div className="atm-container">
        <div>
          <p style={{ letterSpacing: "2px",border: "solid transparent",padding:"12px 12px",
          borderRadius: "16px",borderWidth: "0 0 4px",fontFamily: "din-round,sans-serif",fontWeight: "700",
          margin:"5px", display: "inline"
          }}className="account-info">Your Account: <span style={{letterSpacing: "2px"}}>{account}</span></p>
          
        </div>

        <div style={{border: "solid transparent",borderRadius: "16px",borderWidth: "0 0 4px",
        fontFamily: "din-round,sans-serif"
        }}>
          <p style={{letterSpacing: "2px"}}>Your Balance: <span style={{letterSpacing: "2px"}}> {balance} ETH</span></p>
          
        </div>

        <button style={{  backgroundColor: "#e1ecf4",borderRadius: "3px",border: "1px solid #7aa7c7",
        boxShadow: "rgba(255, 255, 255, .7) 0 1px 0 0 inset",color: "#39739d",
        cursor: "pointer",fontFamily: `-apple-system,system-ui,"Segoe UI","Liberation Sans",sans-serif`,
        fontSize: "16px", fontWeight: "500",  lineHeight: 1.25385,textAlign: "center", textDecoration: "none",margin:"5px"
        }} className="atm-button" onClick={deposit}>Deposit 1 ETH</button>
        
        
        <button style={{ backgroundColor: "#e1ecf4",borderRadius: "3px",border: "1px solid #7aa7c7",
        boxShadow: "rgba(255, 255, 255, .7) 0 1px 0 0 inset",color: "#39739d",
        cursor: "pointer",fontFamily: `-apple-system,system-ui,"Segoe UI","Liberation Sans",sans-serif`,
        fontSize: "16px", fontWeight: "500",  lineHeight: 1.25385,textAlign: "center", textDecoration: "none",margin:"5px"
        }} className="atm-button" onClick={withdraw}>Withdraw 1 ETH</button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <>
    
    <main className="container">
      <header>
        <h1 >This is Metacrafters ATM!</h1>
      </header>
      {initUser()}
      </main>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: #FEFDED;
          backgroung-image: url('meta.jpg');
          font-family: Arial, sans-serif;
        }

        header {
          margin-bottom: 20px;
          fontFamily: din-round,sans-serif;

        }

        .atm-container {
          // display: flex;
          // flex-direction: column;
          // align-items: center;
          // padding: 20px;
          border: 2px solid #ccc;
          border-radius: 10px;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .account-info, .balance-info {
          font-size: 1.2em;
          margin-bottom: 10px;
        }
      `}</style>
    </>
  );
}
