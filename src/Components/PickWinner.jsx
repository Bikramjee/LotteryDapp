import React, {useState, useEffect} from 'react';
import {ethers} from 'ethers';
import {contractABI,contractAddress} from './Constants';


function PickWinner() {
    const [owner, setOwner] = useState('');
    const [contractInstance, setcontractInstance] = useState('');
    const [currentAccount, setCurrentAccount] = useState('');
    const [isOwnerConnected, setisOwnerConnected] = useState(false);
    const [winner, setWinner] = useState('');
    
    useEffect(() => {
        const loadBlockchainData = async () => {
            if (typeof window.ethereum !== 'undefined') {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                try {
                    const signer = provider.getSigner();
                    const address = await signer.getAddress();
                    console.log(address);
                    setCurrentAccount(address);
                    window.ethereum.on('accountsChanged', (accounts) => {
                        setCurrentAccount(accounts[0]);
                        console.log(currentAccount);
                    })
                } catch (err) {
                    console.error(err);
                }
            } else {
                alert('Please install Metamask to use this application')

            }
        };

        const contract = async () => {
           
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contractIns = new ethers.Contract(contractAddress, contractABI, signer);
            setcontractInstance(contractIns);
            
        }
        
        loadBlockchainData();
        contract();
    }, [currentAccount]);

    useEffect(() => {

        const own = async () => {
                if(contractInstance){
                try {
                    if (contractInstance) {
                        const own = await contractInstance.owner();
                        // console.log("kokooo");
                        await setOwner(own);
                    } else {
                        console.error('Contract instance not available');
                    }
                } catch (error) {
                    console.error('Error fetching owner:', error);
                }
            };
        }
        // Check if both owner and currentAccount have values
        if (owner && currentAccount) {
            // Compare the owner and currentAccount
            if (owner.toLowerCase() === currentAccount.toLowerCase()) {
                setisOwnerConnected(true);
            } else {
                setisOwnerConnected(false);
            }
        }
        own();
    }, [owner, currentAccount]);


  

    const pickWinner = async () => {
        try {
            if (contractInstance) {
                const winner = await contractInstance.pickWinner();
                setWinner(winner);
            } else {
                console.error('Contract instance not available');
            }
        } catch (error) {
            console.error('Error fetching winner:', error);
        }
    };

    return (
        <>
        <div className='container'>
            <h1>Result Page</h1>
            <div className='button-container'>
                 {  
                 ( isOwnerConnected ? (<button className="enter-button" onClick={pickWinner}> Pick Winner </button>) : 
                   (<p>You are not the owner, only Owner can select the winner</p>))
                 }
            </div>


            <p>Lottery Winner is : {winner ? winner.toString() : "no winner selected yet"}</p>
            
           
        </div>
         </>
    )

}

export default PickWinner;































