import React, {useState, useEffect} from "react";
import {ethers} from 'ethers';
import {contractABI,contractAddress} from './Constants';

const Home = () => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [contractInstance, setcontractInstance] = useState('');
    const [balance, setBalance] = useState(0);
    const [players,setPlayers] = useState([]);

    useEffect(() => {
        const loadBlockchainData = async () => {
            const handleAccountsChanged = (accounts) => {
                if (accounts.length > 0) {
                    setCurrentAccount(accounts[0]);
                } else {
                    setCurrentAccount(null); // No account found
                }
            };
            
            if (typeof window.ethereum !== 'undefined') {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
      
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                try {
                    const signer = provider.getSigner();
                    const address = await signer.getAddress();
                    console.log(address,"tttttttt");
                    setCurrentAccount(address);
                    window.ethereum.on('accountsChanged',handleAccountsChanged
                    //  (accounts) => {
                    //     setCurrentAccount(accounts[0]);
                    //     console.log(currentAccount);
                    // }
                    )
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



    const enterLottery = async () => {
        const amountToSend = ethers.utils.parseEther('0.001');
        const tx = await contractInstance.enter({value: amountToSend,});
        await tx.wait();
    }

  


    const checkContractBalance = async () => {
        try {
            if (contractInstance) {
                const contractBalance = await contractInstance.checkBalance();
                setBalance(contractBalance.toString());
            } else {
                console.error('Contract instance not available');
            }
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    const getPlayers = async () => {
        try {
            if (contractInstance) {
                const play = await contractInstance.players();
                setPlayers(play);
            } else {
                console.error('Contract instance not available');
            }
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    };



    return(
        <>
        <div className="container">
            <h1>Lottery Page</h1>
            <div className="button-container">
                
                <button className="enter-button" onClick={enterLottery}> Enter Lottery </button>

                
            </div>
            <button onClick={checkContractBalance}> Check balance</button> 
            <h1>Balance : {balance}</h1>

            <button onClick={getPlayers}> Get All Players</button> 


            <div>
                {
                    players.map(curr=>(
                        <p key={curr}>{curr}<br/></p>
                    )
                        
                    )
                }
            </div>
            
        </div>
        </>
    ) 

}

export default Home;