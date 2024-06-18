import React from 'react';
import { NavLink } from 'react-router-dom';

import logoutIcon from '../../images/logout-black.png';

import Navigation from '../Navigation/Navigation';

import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function SavedNewsHeader(props) {
  const currentUser = React.useContext(CurrentUserContext);
  //const fadeInCloseButtonClass = `${props.isOpen ? 'savedNewsHeader__nav-button_active' : ''}`;
  const articlesKeywords = props.savedArticlesArray.slice(0, 2).map((article) => article.keyword + ' ,');


  function onNavClick() {
    props.onNavClick();
  }

  return (
    <header className='savedNewsHeader'>
      <div className='savedNewsHeader__top-container'>
        <div className='savedNewsHeader__logo'>NewsExplorer</div>
        <div className='savedNewsHeader__nav-container'>
          <Navigation>
            <NavLink exact to='/' className='nav__home nav__link_loggedin' activeClassName='nav__link_active-black'>Inicio</NavLink>
            <NavLink to='/saved-news' className='nav__articles nav__link_loggedin' exact activeClassName='nav__link_active-black'>Artículos guardados</NavLink>
          </Navigation>
          <button type='button' className='savedNewsHeader__nav-profile'>
            {currentUser.name}
            <img src={logoutIcon} alt='logout' className='savedNewsHeader__nav-logout' onClick={props.onSignoutClick}/>
          </button>
        </div>
          <div className={`savedNewsHeader__nav-button `} onClick={props.onNavClick}>
            <div className='savedNewsHeader__nav-button_line'></div>
            <div className='savedNewsHeader__nav-button_line'></div>
          </div>
          {props.children}
      </div>
      <div className='savedNewsHeader__text-container'>
        <p className='savedNewsHeader__subtext'>Artículos guardados</p>
        <h5 className='savedNewsHeader__title'>{currentUser.name}, tienes {props.savedArticlesArray.length} artículos guardados</h5>
        <p className='savedNewsHeader__keywords'>Por palabras clave:
          <span className='savedNewsHeader__keywords-bold'> {articlesKeywords} y {props.savedArticlesArray.length-2} más</span>
        </p>
      </div>
    </header>
  )
}