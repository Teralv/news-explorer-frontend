import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import SigninPopup from '../SigninPopup/SigninPopup';
import SignupPopup from '../SignupPopup/SignupPopup';
import SuccessPopup from '../SuccessPopup/SuccessPopup';
import NavPopup from '../NavPopup/NavPopup';
import SavedNews from '../SavedNews/SavedNews';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import newsApi from '../../utils/NewsApi';

function App() {
  /// Auth hooks ///
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [submitError, setSubmitError] = React.useState('');

  ///Search hooks ///
  const [isSearch, setIsSearch] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSearchResults, setIsSearchResults] = React.useState(false);

  ///Articles hooks ///
  const [savedArticles, setSavedArticles] = React.useState([]); //auth.js is needed
  const [searchArticles, setSearchArticles] = React.useState([]);

  ///Popups hooks ///
  const [isSigninPopupOpen, setIsSigninPopupOpen] = React.useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = React.useState(false);
  const [isInfoToolsTipOpen, setIsInfoToolsTipOpen] = React.useState(false);
  const [isPopupNavOpen, setIsPopupNavOpen] = React.useState(false);

  ///Context hooks ///
  const [validEmail, setValidEmail] = React.useState(true);
  const [validPassword, setValidPassword] = React.useState(true);
  const [validUsername, setValidUsername] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState({});


  function handleSigninClick() {
    setSubmitError('');
    setIsSigninPopupOpen(true);
  }

  function handleSignupClick() {
    setSubmitError('');
    setIsSignupPopupOpen(true);
  }

  function handleSignout() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
  }

  function handlePopupNavClick() {
    if (isPopupNavOpen) {
      setIsPopupNavOpen(false);
    } else {
      setIsPopupNavOpen(true);
    }
  }

  function closeAllPopups() {
    setIsSigninPopupOpen(false);
    setIsSignupPopupOpen(false);
    setIsInfoToolsTipOpen(false);
    setIsPopupNavOpen(false);
  }

  function handleSearchSubmit(keyword) {
    setIsSearch(true);
    setIsLoading(true);
    newsApi
      .getArticles(keyword)
      .then((data) => {
        if (data.articles.length === 0) {
          setIsSearchResults(false);
        } else {
          setSearchArticles(data.articles);
          setIsSearchResults(true);
        }
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        setIsLoading(false);
      })
  }

  const errorMessages = {
    notValidEmail: "Dirección de correo electrónico no válida",
    notValidPassword: "Utilice 8 caracteres o más para su contraseña",
    notValidUsername: "Utilice más caracteres para su nombre de usuario"
  };

  return (

      <Switch>
        <ProtectedRoute path='/saved-news' loggedIn={isLoggedIn}>
          <CurrentUserContext.Provider value={currentUser}>
            <SavedNewsHeader
              onNavClick={handlePopupNavClick}
              isOpen={isPopupNavOpen}
              onSignoutClick={handleSignout}
              savedArticlesArray={savedArticles}>
              <NavPopup
                isOpen={isPopupNavOpen}
                isLoggedIn={isLoggedIn}
                onSigninClick={handleSigninClick}
                onSignoutClick={handleSignout}
                onNavClick={handlePopupNavClick}
              />
            </SavedNewsHeader>

            <SavedNews
              isLoggedIn={isLoggedIn}
              savedArticlesArray={savedArticles}
            />
            <Footer />
          </CurrentUserContext.Provider>
        </ProtectedRoute>

        <Route exact path='/'>
          <CurrentUserContext.Provider value={currentUser}>
            <Header
              isLoggedIn={isLoggedIn}
              onSigninClick={handleSigninClick}
              onSignoutClick={handleSignout}
              onNavClick={handlePopupNavClick}
              onSearchSubmit={handleSearchSubmit}
              isSearch={isSearch}
            />

            <NavPopup
              isOpen={isPopupNavOpen}
              isLoggedIn={isLoggedIn}
              onSigninClick={handleSigninClick}
              onNavClick={handlePopupNavClick}
              onSignoutClick={handleSignout}
            />

            <Main
              isSearch={isSearch}
              isSearchResults={isSearchResults}
              isLoading={isLoading}
              newsArticleArray={searchArticles}
              onNavClick={handlePopupNavClick}
              isLoggedIn={isLoggedIn}
            />

            <SigninPopup
              isOpen={isSigninPopupOpen}
              onClose={closeAllPopups}
              openSignupPopup={handleSignupClick}
              openSigninPopup={handleSigninClick}
              /*onSignin={handleSigninSubmit}*/
              isValidEmail={validEmail}
              isValidPassword={validPassword}
              onValidityChangeEmail={setValidEmail}
              onValidityChangePassword={setValidPassword}
              submitError={submitError}
              errorMessages={errorMessages}
            />

            <SignupPopup
              isOpen={isSignupPopupOpen}
              onClose={closeAllPopups}
              openSignupPopup={handleSignupClick}
              openSigninPopup={handleSigninClick}
              /*onSignup={handleSignupSubmit}*/
              isValidEmail={validEmail}
              isValidPassword={validPassword}
              isValidUsername={validUsername}
              onValidityChangeEmail={setValidEmail}
              onValidityChangePassword={setValidPassword}
              onValidityChangeUsername={setValidUsername}
              submitError={submitError}
              errorMessages={errorMessages}
            />

            <SuccessPopup
              isOpen={isInfoToolsTipOpen}
              onClose={closeAllPopups}
              openSigninPopup={handleSigninClick}
            />

            <Footer />
          </CurrentUserContext.Provider>
        </Route>
      </Switch>

  );
}

export default App;
