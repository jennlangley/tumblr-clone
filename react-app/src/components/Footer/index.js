import { useState } from 'react';
import './Footer.css';
const Footer = ({ isLoaded }) => {
    return (
        isLoaded && 
        <footer className='footer-container'>
            
            <div className='about'>
                <div className='linkedInLinks'>
                    <a className='iconLink' target='_blank' href="https://www.linkedin.com/in/jennifer-langley/">jennifer-langley</a>
                    <a className='iconLink' target='_blank' href="https://www.linkedin.com/in/gabriel-laguerre/">gabriel-laguerre</a> 
                </div>
                <a target='_blank' href="https://github.com/jennlangley/tumblr-clone">
                    <i className="fa-brands fa-github" />
                </a>
                <i className="fa-brands fa-linkedin" />
            </div>
        </footer>
    )
}

export default Footer;