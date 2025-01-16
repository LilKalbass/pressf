import React, { useEffect } from "react";
import { useTelegram } from "../hooks/useTelegram";
import {
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import "./Main.css";

const Main = () => {
  const { user } = useTelegram();
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();
  const onDisconnect = async () => {
    await tonConnectUI.disconnect();
  };

  const onConnect = async () => {
    const data = {
      id: user.id,
      address,
    };
    fetch("https://testbot-production-3510.up.railway.app/user", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  useEffect(() => {
    if (address) {
      onConnect();
    }
  }, [address]);
  return (
    <div className="main">
      {address ? (
        <>
          <button className="disconnect-wallet" onClick={onDisconnect}>
            Disconnect
          </button>
          <div className="icon-cantainer">
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="icon">
                <img alt="icon" src="./image.png" />
              </div>
            ))}
          </div>
        </>
      ) : (
        <TonConnectButton />
      )}
    </div>
  );
};

export default Main;
