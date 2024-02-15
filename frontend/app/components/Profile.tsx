"use client"

// @ts-ignore
import { Button, Table } from '@web3uikit/core';
import { ethers } from 'ethers';
import { useState } from 'react';
import AddDocument from './AddDocument';

interface HeaderProps {
  click: () => void;
  profile: any;
  contract?: ethers.Contract;
  getUserData: () => void;
  getUserDocument: () => void;
}

const Profile: React.FC<HeaderProps> = ({ click, profile, contract, getUserData, getUserDocument }) => {

  let profileData = profile.data;

  const [edit, setEdit] = useState(true);

  const handleEdit = () => {
    setEdit((p) => !p);
  };

  const handleSave = async () => {
    try {
      if (contract) {
        await contract.updateUserData(
          profileData[0],
          profileData[1],
          profileData[2],
          profileData[3],
          profileData[4],
          profileData[5],
          profileData[6],
          profileData[7],
          profileData[8]
        );
        console.log('User updated successfully', profileData);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
    setEdit((p) => !p);
  }

  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='flex gap-3'>
        <h1 className='text-3xl font-bold text-center mb-4 mr-36'
        >Profile
        </h1>
        <button
        className='bg-green-200 p-1 rounded-xl h-9 w-16 text-stone-600'
        onClick={() => {
            getUserData();
            profileData=profile.data;
            getUserDocument();
            console.log(profile.data);
        }}
        >refresh</button>
        {edit ? <button key={3} className='bg-orange-200 p-1 rounded-xl w-16 h-9 text-stone-600'
        onClick={handleEdit}
        >edit</button>
        : <button key={6} className='bg-green-200 p-1 rounded-xl w-16 h-9 text-stone-600'
        onClick={handleSave}
        >save</button>
        }
        </div>
        <Table
        columnsConfig="1fr 2fr"
        data={[
            [
            'Name: ',
            (edit ? profileData[0]
            : <input className='border-slate-950 border-2 rounded-lg p-1' type='text' defaultValue={profileData[0]} onChange={(e) => profileData[0]=e.target.value} />),
            ],
            [
            'Date of Birth: ',
            (edit ? profileData[1]
            : <input className='border-slate-950 border-2 rounded-lg p-1' type='text' defaultValue={profileData[1]} onChange={(e) => profileData[1]=e.target.value} />),
            ],
            [
            'Gender: ',
            (edit ? profileData[2]
            : <input className='border-slate-950 border-2 rounded-lg p-1' type='text' defaultValue={profileData[2]} onChange={(e) => profileData[2]=e.target.value} />),
            ],
            [
            'Nationality: ',
            (edit ? profileData[3]
            : <input className='border-slate-950 border-2 rounded-lg p-1' type='text' defaultValue={profileData[3]} onChange={(e) => profileData[3]=e.target.value} />),
            ],
            [
            'Email: ',
            (edit ? profileData[4]
            : <input className='border-slate-950 border-2 rounded-lg p-1' type='text' defaultValue={profileData[4]} onChange={(e) => profileData[4]=e.target.value} />),
            ],
            [
            'Phone Number: ',
            (edit ? profileData[5]
            : <input className='border-slate-950 border-2 rounded-lg p-1' type='text' defaultValue={profileData[5]} onChange={(e) => profileData[5]=e.target.value} />),
            ],
            [
            'Native Address: ',
            (edit ? profileData[6]
            : <input className='border-slate-950 border-2 rounded-lg p-1' type='text' defaultValue={profileData[6]} onChange={(e) => profileData[6]=e.target.value} />),
            ],
            [
            'Residential Address: ',
            (edit ? profileData[7]
            : <input className='border-slate-950 border-2 rounded-lg p-1' type='text' defaultValue={profileData[7]} onChange={(e) => profileData[7]=e.target.value} />),
            ],
            [
            'Social Profile: ',
            (edit ? profileData[8]
            : <input className='border-slate-950 border-2 rounded-lg p-1' type='text' defaultValue={profileData[8]} onChange={(e) => profileData[8]=e.target.value} />),
            ],
        ]}
        header={[
        ]}
        noPagination
        />
      <br />
        <AddDocument
        documents={profile.documents}
        contract={contract}
        />
      <br />
      <Button onClick={click} color='green' theme='secondary' text='return home' />
    </div>
  );
};

export default Profile;
