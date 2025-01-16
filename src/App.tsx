import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { connectWallet, disconnectWallet, setLoading } from './redux/walletSlice';
import './App.css';

function App() {
    const dispatch = useDispatch();
    // @ts-ignore
    const { address, isLoading } = useSelector((state) => state.wallet);
    const [tonConnectUI] = useTonConnectUI();

    useEffect(() => {
        const checkConnection = async () => {
            dispatch(setLoading(true));
            if (tonConnectUI.account?.address) {
                dispatch(connectWallet(tonConnectUI.account.address));
            } else {
                dispatch(disconnectWallet());
            }
        };

        checkConnection();

        const unsub = tonConnectUI.onStatusChange((wallet) => {
            if (wallet?.account?.address) {
                dispatch(connectWallet(wallet.account.address));
            } else {
                dispatch(disconnectWallet());
            }
        });


        return () => unsub();
    }, [tonConnectUI, dispatch]);

    const handleWalletAction = async () => {
        dispatch(setLoading(true));
        if (tonConnectUI.connected) {
            await tonConnectUI.disconnect();
        } else {
            await tonConnectUI.openModal();
        }
    };

    if (isLoading) {
        return (
            <main className='flex min-h-screen flex-col items-center justify-center'>
                <div>
                    Loading...
                </div>
            </main>
        );
    }

    return (
        <main className='flex min-h-screen flex-col items-center justify-center'>
            <h1 className='text-4xl mb-6'>TestAssigmentJS</h1>
            {address ? (
                <div className='flex flex-col items-center gap-y-4'>
                    <p>Connected: {address}</p>
                    <button onClick={handleWalletAction} className='bg-yellow-500 hover:bg-yellow-200 py-2 px-4 rounded-3xl'>
                        Disconnect
                    </button>
                </div>
            ) : (
                <button onClick={handleWalletAction} className='bg-yellow-500 hover:bg-yellow-200 py-2 px-4 rounded-3xl'>
                    Connect TonWallet
                </button>
            )}
        </main>
    );
}

export default App;
