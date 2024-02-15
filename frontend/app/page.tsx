"use client"

import { Contract, formatEther } from "ethers";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import abi from "../public/abi.json";
import Header from "./components/Header";
import Home from "./components/Home";

export default function Page() {

  const [bool, setBool] = useState<boolean>(true);

  const [wallet, setWallet] = useState({
    address: "",
    provider: undefined as ethers.Provider | undefined,
    signer: undefined as ethers.Signer | undefined,
    balance: 0
  });
  const [profile,setProfile] = useState({
    exist : false,
    data : [],
    documents: []
  });

  let ethereum : any;
  if (typeof window !== 'undefined') {
    ethereum = (window as any).ethereum;
  }

  const [contract, setContract] = useState<Contract | undefined>(); 
  let conAdd = '0x77E7b93Ab1fFdDAa0cb6F61BFc021eEbc3bCd3F5';

  const connect = async () => {
    if (ethereum != undefined) {
      try {
        let provider = new ethers.BrowserProvider(ethereum);
        let signer = await provider.getSigner();
        let bal = await provider.getBalance(signer.address);
        console.log("Connected to wallet!", signer.address);
        setWallet({
          address: await signer.getAddress(),
          provider: provider,
          signer: signer,
          balance: parseInt(formatEther(bal))
        });
        const contract = new Contract(conAdd, abi, signer);
        setContract(contract); 
        console.log("Contract set", contract);
      } catch (error) {
        console.error(error);
        console.log("Error connecting to wallet");
      }
    }
    else{
      if(ethereum == undefined){
        alert("No wallet found! Please install a wallet");
      }
    }
  }

  const getUserData = async () => {
    try {
      if (contract) { 
        let val = await contract.getUserData();
        console.log(val.toString());
        setProfile({
          ...profile,
          exist : true,
          data : (val.toString()).split(','),
        });
      }
    } catch (error) {
      setProfile({
        ...profile,
        exist : false,
      });
    } 
  } 

  const getUserDocuments = async () => {
    try {
      if (contract) { 
        let val = await contract.getDocumentData();
        console.log("documents", val.toString());
        setProfile({
          ...profile,
          exist : true,
          documents : val.toString().split(',')
        });
        console.log("documents data", profile.documents);
      }
    } catch (error) {
      console.log(error);
    }
    
  } 

  useEffect(() => {
    getUserData()
    getUserDocuments()
  }, [wallet]);

  return (
    <div className="">
      <Header 
      address = {wallet.address}
      balance = {wallet.balance}
      connect = {connect}
      setBool={setBool}
      />
      <Home 
      profile={profile}
      contract={contract}
      getUserData={getUserData}
      bool={bool}
      setBool={setBool}
      getUserDocument={getUserDocuments}
      />
    </div>
  );
}
