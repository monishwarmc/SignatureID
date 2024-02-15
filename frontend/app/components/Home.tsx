"use client"

// @ts-ignore
import {Hero, Typography, Button, Stepper} from '@web3uikit/core'
import Register from './Register';
import Profile from './Profile';
import { ethers } from 'ethers';
import React from 'react';

interface HeaderProps{
    profile: any;
    contract?: ethers.Contract;
    getUserData: () => void;
    bool: boolean;
    setBool: (value: boolean | ((prevVar: boolean) => boolean)) => void;
    getUserDocument: () => void;
}

const Home: React.FC<HeaderProps> = ({profile, contract, getUserData, bool, setBool, getUserDocument}) => {

  const click = () => {
    setBool((p)=>!p);
    console.log("Clicked");
  };

  return (
    <div className="pt-44  bg-blue-600">
      {bool ?
        <div className="flex flex-col justify-center items-center ">
      <Hero
        align="right"
        backgroundColor="blue"
        backgroundURL='banner.png'
        height="17vw"
        padding="40px"
        rounded="20px"
        className='w-4/5'
        >
        <React.Fragment key=".0">
            <Typography
            color="#FFFFFF"
            variant="h3"
            >
            Welcome to Signature ID
            </Typography>
            <Typography
            color="#FFFFFF"
            variant="h1"
            >
            Decentralize your data
            </Typography>
            {profile.exist ? <Button
            onClick={click}
            customize={{
                backgroundColor: 'transparent',
                border: '1px solid white',
                color: '#FFFFFF'
            }}
            icon=">>>"
            iconLayout="trailing"
            isTransparent
            text="visit profile "
            theme="custom"
            />
            : <Button
            onClick={click}
            customize={{
                backgroundColor: 'transparent',
                border: '1px solid white',
                color: '#FFFFFF',
            }}
            icon=">>>"
            iconLayout="trailing"
            isTransparent
            text="Register now! "
            theme="secondary"
            />}
        </React.Fragment>
        </Hero>

        <p className="text-xl text-black mb-8 p-16 w-4/5">
          Signature ID is a decentralized identity management platform that empowers individuals to take control of their personal data and privacy. 
          In today&apos;s digital age, identity theft, data breaches, and privacy violations pose significant risks to individuals. 
          Traditional identity systems are centralized, requiring users to trust third parties to safeguard their sensitive information. 
          This lack of control over personal data leads to exploitation, surveillance, and the erosion of privacy rights.
        </p>

        <p className="text-xl text-black mb-8 px-16 pb-16 w-4/5">
          Signature ID aims to address these challenges by providing a secure, decentralized platform for managing identity information. Our platform leverages blockchain technology to ensure the integrity and security of user data. By storing identity information on the blockchain, users can control who has access to their data and how it is used.
        </p>

        <div
        className='flex flex-col items-center justify-center p-16 border-slate-600 border-4'
        >
        <h2 className="text-6xl font-bold mb-4">Key Features</h2>
        <br/>
        <ul className="list-disc ml-6 mb-8 ">
          <li className="text-3xl text-black" key={1}>Secure storage of personal data</li>
          <li className="text-3xl text-black" key={2}>Controlled access to data</li>
          <li className="text-3xl text-black" key={3}>Easy management of identity documents</li>
          <li className="text-3xl text-black" key={4}>Fast and efficient verification processes</li>
        </ul>
        </div>
        <div className='flex flex-col items-center justify-center'>
        <h2 className="text-6xl font-bold mb-4 p-6">How it Works</h2>
        <div
        style={{
            height: '1px',
            minHeight: '450px'
        }}
        >
        <Stepper
            className='bg-blue-400 p-16 rounded-2xl'
            step={1}
            isCompletedPageHidden
            stepData={[
            {
                content: <p>Users create a decentralized identity (DID) within Signature ID, <br/> storing personal information and credentials securely on the blockchain.</p>,
                title: 'Creating an Identity'
            },
            {
                content: <div><p>Users manage their credentials, such as academic degrees or professional certifications,<br/> within Signature ID. They can add, remove, or update credentials as needed.</p></div>,
                title: 'Managing Credentials'
            },
            {
                content: <div><p>Users can selectively share their credentials with third parties, such as employers or service providers,<br/> to prove their identity or qualifications.</p></div>,
                title: 'Sharing Credentials'
            },
            {
                content: <p>Third parties verify the authenticity of the shared credentials using Signature ID,<br/> which ensures that the credentials are valid and tamper-proof.</p>,
                title: 'Verifying Credentials'
            },
            {
                content: <p>Signature ID prioritizes user privacy and security,<br/> allowing users to control who can access their credentials and employing strong encryption and security measures.</p>,
                title: 'Privacy and Security'
            }
            ]}
        />
        </div>
        </div>
        </div>
        :
        <div>
          {
            profile.exist ?
            <Profile
            getUserData={getUserData}
            getUserDocument={getUserDocument}
            click={click}
            profile={profile}
            contract={contract}
            />
            : <Register
            contract={contract}
            click={click}
            />
          }
        </div>
        }
        <div className="flex flex-col items-center bg-blue-900 rounded-t-3xl bottom-0 h-16 mt-16">
        </div>
    </div>
  );
};

export default Home;
