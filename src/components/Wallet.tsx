import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { connectWallet, disconnectWallet, setLoading } from "../redux/walletSlice";

export const formatAddress = (address: string) => {
    // Break address into two parts for display
    const firstPart = address.slice(2, Math.ceil(address.length / 2));
    const secondPart = address.slice(Math.ceil(address.length / 2));
    return `${firstPart}\n${secondPart}`;
};


export const Wallet = () => {
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

    // 0:1530bcb7175c470086df3b406e4dba8bf63cdf1e1d7d747841f195a18db00f68

    return (
        <>
            <div className='flex min-h-[80vh] flex-col items-center justify-center'>
                <h1 className='text-4xl mb-6'>TestAssigmentJS</h1>
                {address ? (
                    <div className='flex flex-col items-center'>
                        <div className='gap-y-1 flex flex-col'>
                            <h4 className='text-xl'>Connected Address: </h4>
                            <p className='mb-4 text-[12px]'>{formatAddress(address)}</p>
                        </div>
                        <button onClick={handleWalletAction}
                                className='bg-red-500 hover:bg-red-200 py-2 px-4 rounded-3xl duration-300 transition-all'>
                            Disconnect
                        </button>
                    </div>
                ) : (
                    <button onClick={handleWalletAction} className='bg-yellow-500 hover:bg-yellow-200 py-2 px-4 rounded-3xl'>
                        Connect TonWallet
                    </button>
                )}
            </div>
        </>
    );
}