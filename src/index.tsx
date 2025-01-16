import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { Provider } from 'react-redux';
import {store} from './redux/store'


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <TonConnectUIProvider manifestUrl="https://pressfffff.vercel.app/manifest.json">
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>,
    </TonConnectUIProvider>

);
