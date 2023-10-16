import { useState } from 'react';
import './Footer.css';
const Footer = ({ isLoaded }) => {
    const [hover, setHover] = useState(true)
    return (
        isLoaded && 
        <footer className='footer-container'>
            <div className='github'>
                <i className="fa-brands fa-github" />
                <a className='iconLink' href="https://github.com/jennlangley/tumblr-clone">
                    Github
                </a>
            </div>
            <div className='linkedIn' onMouseOver={e=>setHover(true)}>
                <i className="fa-brands fa-linkedin" />
                <div className='linkedInLinks'>
                    <a className='iconLink' href="https://www.linkedin.com/in/jennifer-langley/">Jennifer Langley</a>
                    <a className='iconLink' href="https://www.linkedin.com/in/gabriel-laguerre/">Gabriel Laguerre</a> 
                </div>
                
            </div>
        </footer>
    )
}

export default Footer;