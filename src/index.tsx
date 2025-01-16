import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TonConnectUIProvider } from "@tonconnect/ui-react";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <TonConnectUIProvider manifestUrl="https://pressfffff.vercel.app/manifest.json">

  <React.StrictMode>
    <App />
  </React.StrictMode>
    </TonConnectUIProvider>

);
