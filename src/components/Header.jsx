import {Link} from "react-router-dom";
import {HomePage} from "./HomePage";
import {Wallet} from "./Wallet";

export const Header = () => {
    return (
        <header className=''>
            <nav>
                <ul className='text-2xl flex gap-x-8 decoration-2 underline-offset-4 decoration-yellow-500 underline justify-center items-center -mb-22 mt-8'>
                    <li className=''>
                        <Link to='/' element = {<HomePage/>}>Home</Link>
                    </li>
                    <li>
                        <Link to='/wallet' element={<Wallet/>}>Wallet</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}