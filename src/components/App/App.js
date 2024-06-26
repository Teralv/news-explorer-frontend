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
import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth';


function App() {
  /// Auth hooks ///
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [submitError, setSubmitError] = React.useState('');

  ///Search hooks ///
  const [isSearch, setIsSearch] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSearchResults, setIsSearchResults] = React.useState(false);
  const [isServerError, setIsServerError] = React.useState(false);

  ///Articles hooks ///
  const [savedArticles, setSavedArticles] = React.useState([]);
  const [searchArticles, setSearchArticles] = React.useState([]);
  const [currentKeyword, setCurrentKeyword] = React.useState('');

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
    setIsServerError(false);
    newsApi
      .getArticles(keyword)
      .then((data) => {
        if (data.articles.length === 0) {
          setIsSearchResults(false);
        } else {
          setSearchArticles(data.articles);
          setCurrentKeyword(keyword);
          setIsSearchResults(true);
        }
      }).catch((err) => {
        console.log(err);
        setIsServerError(true);
      }).finally(() => {
        setIsLoading(false);
      })
  }

  const submitErrorMessages = {
    signinValidationError: 'email or password are incorrect',
    signupConflictError: 'This email is not available',
    serverError: 'An error occured on the server'
  }

  function handleSignupSubmit(values) {
    console.log(values);
    auth
      .register(values)
      .then(() => {
        setIsSignupPopupOpen(false);
        setIsInfoToolsTipOpen(true);
      }).catch((error) => {
        if (error === 'Error 409') {
          console.log(error);
          setSubmitError(submitErrorMessages.signupConflictError);
        } else {
          setSubmitError(submitErrorMessages.serverError);
        }
      });
  }

  function handleSigninSubmit(values) {
    auth
      .login(values)
      .then((user) => {
        setCurrentUser(user.user);
        setIsLoggedIn(true);
        setIsSigninPopupOpen(false);
      })
      .catch((error) => {
        if (error === 'Error 400') {
          setSubmitError(submitErrorMessages.signinValidationError);
        } else {
          setSubmitError(submitErrorMessages.serverError);
        }
      });
  }

  const handleSaveClick = (card) => {
    const token = localStorage.getItem('jwt');
    mainApi
      .saveNewArticle(card, token)
      .then((newCard) => {
        setSavedArticles([newCard, ...savedArticles]);
      })
      .catch((error) => console.log(error));
  }

  function handleDeleteClick(articleId) {
    const token = localStorage.getItem('jwt');
    mainApi
      .deleteArticle(articleId, token)
      .then(() => {
        const newSavedArticle = savedArticles.filter((currentArticle) => {
          return currentArticle._id !== articleId;
        })
        setSavedArticles(newSavedArticle)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const errorMessages = {
    notValidEmail: 'Dirección de correo electrónico no válida',
    notValidPassword: 'Utilice 8 caracteres o más para su contraseña',
    notValidUsername: 'Utilice más caracteres para su nombre de usuario'
  };

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
          }
        })
        .catch(err => console.log(err))
    }
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      mainApi
        .getUserInfo(token)
        .then((userData) => {
          setCurrentUser({
            email: userData.email,
            name: userData.name,
            _id: userData._id,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      mainApi
        .getSavedArticles(token)
        .then((articlesArray) => {
          setSavedArticles(articlesArray);
        }).catch((err) => {
          console.log(err);
        });
    }
  }, [currentUser])

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
              isSearchResults={isSearchResults}
              keyword={currentKeyword}
              onClickDelete={handleDeleteClick}
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
              onClickSave={handleSaveClick}
              keyword={currentKeyword}
              onClickDelete={handleDeleteClick}
              savedArticlesArray={savedArticles}
              isServerError={isServerError}
              openSigninPopup={handleSigninClick}
            />

            <SigninPopup
              isOpen={isSigninPopupOpen}
              onClose={closeAllPopups}
              openSignupPopup={handleSignupClick}
              openSigninPopup={handleSigninClick}
              onSignin={handleSigninSubmit}
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
              onSignup={handleSignupSubmit}
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
