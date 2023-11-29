import React from 'react'
import Web3 from 'web3'
import { contractABI,contractAddress } from '.Components/Constants';


const web3 = new web3(window.ethereum);



export const contract = new web3.eth.Contract(contractABI, contractAddress);


export const Web3 = () => {
  return (
    <>
    <div>Web3</div>
    </>
  )
}
