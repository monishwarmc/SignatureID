// @ts-ignore
import { InputNew } from '@web3uikit/core';
import { ethers } from 'ethers';
import React, { useEffect, useState } from "react";

interface props {
    documents: string[];
    contract?: ethers.Contract;
}


// https://wealthguruji.com/blog/wp-content/uploads/2019/11/aadhar-card-sample-picture.jpg
// https://okcredit-blog-images-prod.storage.googleapis.com/2021/10/PANcard2-1.jpg
// https://cdndailyexcelsior.b-cdn.net/wp-content/uploads/2023/03/driving-license.jpg

const AddDocument : React.FC<props> = ({documents, contract}) => {

    let document = documents;

    const [add, setAdd] = useState(document[0]=="");
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (document[0]!="") {
            setAdd(false);
        }
        document = documents;
    }, [refresh])

    const addDocument = async() => {
        try {
            if (contract) {
                await contract.updateDocumentData(
                    document[0],
                    document[1],
                    document[2]
                );
                console.log('Document added successfully', document);
            }
        } catch (error) {
            console.error('Error adding document:', error);
        }
    }
    

  return (
    <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-6 text-gray p-6">
            Documents
        </h1>
    {add ? 
        <div className='flex flex-col items-center justify-center gap-3'>
        <InputNew
          label="Aadhar card"
          type="text"
          name="aadhar"
          value={document[0]}
          onChange={
            (e : any) => {document[0] = e.target.value}
          }
        />
        <InputNew
          label="Pan card"
          type="text"
          name="pan"
          value={document[1]}
          onChange={
            (e : any) => {document[1] = e.target.value}
          }
        />
        <InputNew
          label="License"
          type="text"
          name="license"
          value={document[2]}
          onChange={
            (e : any) => {document[2] = e.target.value}
          }
        />
        <div className='flex gap-9'>
        <button
        className='bg-green-200 p-1 rounded-xl h-9 w-16 text-stone-600'
        onClick={addDocument}
        >
            Add
        </button>

        <button
        className='bg-blue-200 p-1 rounded-xl h-9 w-16 text-stone-600'
        onClick={
          ()=>  setRefresh((p)=>!p)
        }
        >
            refresh
        </button>
        </div>
        </div>
    : <div className='flex flex-col items-center justify-center gap-9'>
        <img
        src={document[0]}
        alt="aadhar"
        height={350}
        width={350}
        />
        <img
        src={document[1]}
        alt="pan"
        height={350}
        width={350}
        />
        <img
        src={document[2]}
        alt="Lisence"
        height={350}
        width={350}
        />
        <button
        className='bg-green-200 p-1 rounded-xl h-9 w-16 text-stone-600'
        onClick={() => {
            setAdd(true);
        }}
        >
            edit
        </button>
    </div>}
    </div>
  )
}

export default AddDocument