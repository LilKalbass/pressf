import React from "react";
import "./App.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
function App() {
  return (
    <TonConnectUIProvider manifestUrl="https://react-tg-app.web.app/manifest.json">
      <Header />
      <Main />
    </TonConnectUIProvider>
  );
}

export default App;
