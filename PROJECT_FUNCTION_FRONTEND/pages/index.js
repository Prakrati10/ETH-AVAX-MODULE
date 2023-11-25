import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
// import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";
import atm_abi from "./abi.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [age, setAge] = useState(undefined);
  const [name, setName] = useState(undefined);
  const ageInput = useRef(null);
  const nameInput = useRef(null);

  const contractAddress = "0x67B46A7b07168305F856a25A7Bb02da75d5CEcf5";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  }

  const getAge = async () => {
    if (atm) {
      setAge((await atm.getAge()).toNumber());
    }
  }

  const fetchName = async () => {
    console.log(atm);
    if (atm) {
      console.log(await atm.getName());
      setName((await atm?.getName()));
    }
  }

  const addAge = async (_age) => {
    if (atm) {
      let tx = await atm.setAge(_age);
      await tx.wait()
      getAge();
    }
  }

  const addName = async (_name) => {
    if (atm) {
      let tx = await atm.setName(_name);
      await tx.wait()
      fetchName();
    }
  }

  const initUser = () => {
    useEffect(() => {
      if (atm) {
        fetchName();
        getAge();
      }
    }, []);

    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p className="text-3xl font-bold">Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    return (
      <section className="form-container">
        <div>
          <p>Your Account: {account}</p>
          <p>Your Name is: {name}</p>
          <p>Your age is: {age}</p>

          <div className="form-control">
            <label htmlFor="id-name-input">
              Your name:
            </label>
            <div>
              <input id="id-name-input" type="text" placeholder="Enter your new Name" ref={nameInput} />
              <button className="" onClick={() => addName(nameInput.current.value)}>Set Name</button>
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="id-age-input">
              Set new age:
            </label>
            <div>
              <input id="id-age-input" type="number" placeholder="Set your new age" ref={ageInput} />
              <button onClick={() => addAge(ageInput.current.value)}>Set Age</button>
            </div>
          </div>
        </div>
        <style jsx>{`
        .form-container {}
        .form-container p {
          font-weight: bold;
        }
        .form-control {
          // width: 400px;
          display: flex;
          flex-flow: column nowrap;
          margin: 2rem auto;
        }
        .form-control label {
          text-align: left;
          line-height: 40px;
        }
        .form-control > div {
          display: flex;
          width: 100%;
        }
        .form-control input {
          border: 1px solid darkgray;
          border-radius: 8px 8px;
          padding: .8rem .8rem;
          flex-grow: 1;
        }
        .form-control input:focus {
          outline: 1px solid deepskyblue;
          outline-offset: 2px;
        }
        .form-control button {
          line-height: 40px;
          border-radius: 8px 8px;
          background: dodgerblue;
          color: white;
          border: 0;
          outline: 2px solid;
          outline-offset: 2px;
          margin: 8px .4rem;
          width: 200px;
          max-width: 200px;
          padding: 0 2rem;
          cursor: pointer;
          font-weight: bold;
        }
      `}
        </style>
      </section>
    )
  }

  useEffect(() => { getWallet(); }, []);

  return (
    <main className="container">
      <header><h1 className="text-3xl font-bold">Welcome to your Profile</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          width: 40%;
          margin: auto;
        }
        .container header {
          text-align: center
        }
      `}
      </style>
    </main>
  )
}
