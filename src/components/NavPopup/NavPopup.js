import React from 'react';
import logoutIconWhite from '../../images/logout.png';
import { NavLink } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function NavPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const navPopupActiveClass = props.isOpen ? 'navPopup_fadein' : '';
  const headerButtonClass = props.isLoggedIn ? 'navPopup__button-profile_white' : 'navPopup__signin-button';
  const headerButtonContent = props.isLoggedIn ? currentUser.name : 'Login';
  const buttonFunctionOption = props.isLoggedIn ? props.onSignoutClick : props.onSigninClick;
  const fadeInCloseButtonClass = `${props.isOpen ? 'navPopup__nav-button_active' : ''}`;

  function onNavClick() {
    props.onNavClick();
  }

  function onButtonClick() {
    onNavClick();
    buttonFunctionOption();
  }

  return (
    <div className={`navPopup ${navPopupActiveClass}`}>
      <div className='navPopup__top-container'>
        <div className='navPopup__logo'>NewsExplorer</div>
        <div className={`navPopup__nav-button ${fadeInCloseButtonClass} `} onClick={onNavClick}>
          <div className='navPopup__nav-button_line'></div>
          <div className='navPopup__nav-button_line'></div>
        </div>
      </div>

      <div className='navPopup__container'>
        <NavLink exact to='/' className='navPopup__link'>Inicio</NavLink>
        {props.isLoggedIn ? <NavLink to='/saved-news' className='navPopup__link'>Artículos guardados</NavLink> : ''}

        <button type='button' className={headerButtonClass} onClick={onButtonClick}>
          {headerButtonContent}
          {props.isLoggedIn ?
            <img src={logoutIconWhite} alt='logout' className={'savedNewsHeader__nav-logout'} onClick={onButtonClick} />
            : ''
          }
        </button>
      </div>
    </div>
  )
}