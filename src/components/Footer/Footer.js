import React from 'react';
import { Link } from 'react-router-dom';


export default function Footer() {

  return (
    <footer className='footer'>
      <p className='footer__credit'>© 2024 Supersite, Powered by News API</p>
      <ul className='footer__links-list'>
        <li className='footer__links'>
          <Link to='/' className='footer__links-link'>Inicio</Link>
          <a href='' target="_blank" rel="noopener noreferrer" className='footer__links-link'>Practicum</a>
        </li>

        <li className='footer__links-social'>
          <a href='' target="_blank" rel="noopener noreferrer" className=' footer__link-social footer__links-github'>
          </a>

          <a href='' target="_blank" rel="noopener noreferrer" className=' footer__link-social footer__links-facebook'>
          </a>
        </li>
      </ul>
    </footer>
  )
}