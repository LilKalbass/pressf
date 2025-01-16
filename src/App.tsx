import React from "react";
import "./App.css";
import {useTonConnectUI} from "@tonconnect/ui-react";
import {useCallback, useState, useEffect} from "react";

function App() {
    const [tonConnectUI] = useTonConnectUI()
    const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null)
    const [isLoading,setIsLoading] = useState(true)

    const handleWalletConnection = useCallback((address:string) => {
        setTonWalletAddress(address)
        console.log("suckssfully")
        setIsLoading(false)
    }, [])
    const handleWalletDisconnect = useCallback(() => {
        setTonWalletAddress(null)
        console.log("sucks")
        setIsLoading(false)
    }, [])

    useEffect(() => {
        const checkConnection = async () => {
            if (tonConnectUI.account?.address) {
                handleWalletConnection(tonConnectUI.account?.address)
            } else {
                handleWalletDisconnect()
            }
        }
        checkConnection()

        const unsub = tonConnectUI.onStatusChange((wallet) => {
            if (wallet) {
                handleWalletConnection(wallet.account.address)
            } else {
                handleWalletDisconnect()
            }
        })

        return () => {
            unsub()
        }

    }, [tonConnectUI, handleWalletConnection, handleWalletDisconnect]);

    const handleWalletAction = async () => {
        if (tonConnectUI.connected) {
            setIsLoading(true)
            await tonConnectUI.disconnect()
        } else {
            await tonConnectUI.openModal()
        }
    }


    if (isLoading) {
        return (
            <main className='flex min-h-screen flex-col items-center justify-center'>
                <div>
                    Loading...
                </div>
            </main>
        )
    }
  return (
        <main className='flex min-h-screen flex-col items-center justify-center'>
            <h1 className='text-4xl mb-6'>TestAssigmentJS</h1>
            {tonWalletAddress ? (
                <div className='flex flex-col items-center gap-y-4'>
                    <p>
                        Connected: {tonWalletAddress}
                    </p>
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
