import './App.css';
import {Header} from "./components/Header";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {HomePage} from "./components/HomePage";
import {Wallet} from "./components/Wallet";

function App() {

    return (
        <>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/wallet" element={<Wallet/>} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
