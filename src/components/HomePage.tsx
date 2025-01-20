import React from "react";
import { useSelector } from "react-redux";
import {formatAddress } from "./Wallet";
import {useWebApp} from "../hooks/useWebApp";
export const HomePage = () => {
    // @ts-ignore
    const { address } = useSelector((state) => state.wallet);
    const { user} = useWebApp();

    return (
        <main className='flex min-h-[80vh] flex-col items-center justify-center'>
            <h1 className='text-4xl mb-6'>TestAssigmentJS</h1>
            <p className='text-lg'>Connect ur wallet to get started!</p>
            <div className='mt-8 max-w-[320px] flex-wrap justify-center'>
                <h2 className='text-xl text-center'>U may check ur nickname & walletAddress here!</h2>
                <p>
                    TgNickname:
                    {user ? (
                        <span className="ml-0.5 font-mono text-blue-500">{user}</span>
                    ) : (
                        `Proceed to "Wallet" page`
                    )}
                </p>
                <p>
                    TONWalletAddress:
                    {address ? (
                        <span className="ml-0.5 font-mono text-blue-500">{formatAddress(address)}</span>
                    ) : (
                        `Proceed to "Wallet" page`
                    )}
                </p>
            </div>
        </main>
    )
}