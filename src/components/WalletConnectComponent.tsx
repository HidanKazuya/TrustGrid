import React, { useState, useEffect } from 'react';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { Button, Typography, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';

const WalletConnectComponent = () => {
const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
const [account, setAccount] = useState<string | null>(null);
const [balance, setBalance] = useState<string>('');
const [transactions, setTransactions] = useState<ethers.providers.TransactionResponse[]>([]);

const connectWallet = async () => {
    const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
        infuraId: "YOUR_INFURA_ID"
        }
    }
    };

    const web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
    providerOptions,
    });

    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();

    setProvider(provider);
    const address = await signer.getAddress();
    setAccount(address);

    const balance = await provider.getBalance(address);
    setBalance(ethers.utils.formatEther(balance) + ' ETH');

    const history = await provider.getSigner().provider!.getHistory(address);
    setTransactions(history);
};

useEffect(() => {
    if (provider && account) {
    provider.on('block', async () => {
        const balance = await provider.getBalance(account);
        setBalance(ethers.utils.formatEther(balance) + ' ETH');
    });
    }
}, [provider, account]);

return (
    <div>
    <Button variant="contained" color="primary" onClick={connectWallet}>
        Connect Wallet
    </Button>
    {account && (
        <Card>
        <CardContent>
            <Typography variant="h6">Account: {account}</Typography>
            <Typography variant="body1">Balance: {balance}</Typography>
            <Typography variant="h6">Transactions (last 5):</Typography>
            <List>
            {transactions.slice(0, 5).map((tx, index) => (
                <ListItem key={index}>
                <ListItemText primary={`Hash: ${tx.hash}`} secondary={`To: ${tx.to}, Value: ${ethers.utils.formatEther(tx.value)} ETH`} />
                </ListItem>
            ))}
            </List>
        </CardContent>
        </Card>
    )}
    </div>
);
};

export default WalletConnectComponent;
