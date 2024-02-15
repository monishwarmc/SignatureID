// @ts-ignore
import { Button, InputNew } from '@web3uikit/core';
import React, { useState } from 'react';
import { ethers } from 'ethers';

interface RegisterProps {
  contract?: ethers.Contract;
  click: () => void;
}

const Register: React.FC<RegisterProps> = ({ contract, click }) => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    nationality: '',
    email: '',
    phoneNumber: '',
    nativeAddress: '',
    residentialAddress: '',
    socialProfile: ''
  });

  const handleSubmit = async() => {
    try {
      if (contract) {
        await contract.registerUser(
          formData.name,
          formData.dob,
          formData.gender,
          formData.nationality,
          formData.email,
          formData.phoneNumber,
          formData.nativeAddress,
          formData.residentialAddress,
          formData.socialProfile
        );
        console.log('User registered successfully', formData);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <form className='flex flex-col gap-9 items-center justify-center w-1/2'>
        <InputNew
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={
            (e : any) => setFormData({ ...formData, name: e.target.value })
          }
        />
        <InputNew
          label="Date of Birth"
          type="text"
          name="dob"
          value={formData.dob}
          onChange={
            (e : any) => setFormData({ ...formData, dob: e.target.value })
          }
          placeholder={'DD-MM-YYYY'}
        />
        <InputNew
          label="Gender"
          type="text"
          name="gender"
          value={formData.gender}
          onChange={
            (e : any) => setFormData({ ...formData, gender: e.target.value })
          }
        />
        <InputNew
          label="Nationality"
          type="text"
          name="nationality"
          value={formData.nationality}
          onChange={
            (e : any) => setFormData({ ...formData, nationality: e.target.value })
          }
        />
        <InputNew
          label="Email"
          type="text"
          name="email"
          value={formData.email}
          onChange={
            (e : any) => setFormData({ ...formData, email: e.target.value })
          }
        />
        <InputNew
          label="Phone Number"
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={
            (e : any) => setFormData({ ...formData, phoneNumber: e.target.value })
          }
        />
        <InputNew
          label="Native Address"
          type="text"
          name="nativeAddress"
          value={formData.nativeAddress}
          onChange={
            (e : any) => setFormData({ ...formData, nativeAddress: e.target.value })
          }
        />
        <InputNew
          label="Residential Address"
          type="text"
          name="residentialAddress"
          value={formData.residentialAddress}
          onChange={
            (e : any) => setFormData({ ...formData, residentialAddress: e.target.value })
          }
        />
        <InputNew
          label="Social Profile"
          type="text"
          name="socialProfile"
          value={formData.socialProfile}
          onChange={
            (e : any) => setFormData({ ...formData, socialProfile: e.target.value })
          }
        />
        <Button
          onClick={handleSubmit}
          color="green"
          theme="moneyPrimary"
          text="register"
        />
      </form>
      <br/>
      <Button
          onClick={click}
          color="green"
          theme="secondary"
          text="return home"
        />
    </div>
  );
};

export default Register;
