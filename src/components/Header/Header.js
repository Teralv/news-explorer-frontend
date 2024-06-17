import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Navigation from '../Navigation/Navigation';
import backgroundImage from '../../images/header-background.png';
import logoutIconWhite from '../../images/logout.png';
import { NavLink } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function Header(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const headerButtonClass = props.isLoggedIn ? 'header__button-profile_white' : 'header__signin-button';
  const headerButtonContent = props.isLoggedIn ? currentUser.name : 'Iniciar sesión';
  const onButtonClick = props.isLoggedIn ? props.onSignoutClick : props.onSigninClick;
  const fadeInCloseButtonClass = `${props.isOpen ? 'header__nav-button_active' : ''}`;



  return (
    <header className='header' style={{ background: `url(${backgroundImage}) no-repeat center/cover` }}>
      <div className='header__top-container'>
        <div className='header__logo'>NewsExplorer</div>
          <div className='header__nav-container'>
            <Navigation >
              <NavLink exact to='/' className='nav__home' activeClassName='nav__link_active'>Inicio</NavLink>
              {props.isLoggedIn ? <NavLink to='/saved-news' className='nav__articles' activeClassName='nav__link_active'>Artículos guardados</NavLink> : ''}
            </Navigation>

              <button type='button' className={headerButtonClass} onClick={onButtonClick}>
                {headerButtonContent}
                {props.isLoggedIn ?
                  <img src={logoutIconWhite} alt='logout' className={'savedNewsHeader__nav-logout'} onClick={onButtonClick} />
                  : ''
                }
              </button>
          </div>
          <div className={`header__nav-button ${fadeInCloseButtonClass} `} onClick={props.onNavClick}>
            <div className='header__nav-button_line'></div>
            <div className='header__nav-button_line'></div>
          </div>
      </div>

      <div className='header__content-container'>
          <h1 className='header__title'>¿Qué está pasando en el mundo?</h1>
          <p className='header__subtitle'>Encuentra las útlimas noticias sobre cualquier tema y guárdalas en tu cuenta personal.</p>
          <SearchForm  onSubmit={props.onSearchSubmit} isSearch={props.isSearch} />
      </div>
    </header>
  )
}