import React from "react";
import "./Header.css";
import { useTelegram } from "../hooks/useTelegram";
import Button from "../Button/Button";

const Header = () => {
  const { user, onClose } = useTelegram();
  return (
    <div className="header">
      <Button onClick={onClose}>Cancel</Button>
      <h2 className="wallet-name">Wallet</h2>
      <span className="username">{user?.username}</span>
    </div>
  );
};

export default Header;
