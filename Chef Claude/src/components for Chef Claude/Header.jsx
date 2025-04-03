import './Header.css'
import chefClaudeLogo from '../assets/Chef Claude Icon.png'

export default function Header(){
    return <>
    <header>
        <nav>
            <img src={chefClaudeLogo} alt="Chef Claude Icon" />
            <span>Chef Claude</span>
        </nav>
    </header>
    </>
}