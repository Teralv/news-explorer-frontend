import React from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';


export default function SignupPopup(props) {
  const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');

  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [usernameError, setUsernameError] = React.useState('');

  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
  const [isUsernamelValid, setIsUsernamelValid] = React.useState(false);

  const [disableButton, setDisableButton] = React.useState(true);

  const disabledButtonClass = `${!disableButton ? '' : 'popup__form-button_disabled'}`;

  const showErrorMessageClassEmail = `${props.isValidEmail ? '' : 'form__input-error_active'}`;
  const showErrorMessageClassPassword = `${props.isValidPassword ? '' : 'form__input-error_active'}`;
  const showErrorMessageClassUsername = `${props.isValidUsername ? '' : 'form__input-error_active'}`;

  const showErrorInputClassEmail = `${props.isValidEmail ? '' : 'form__input_type_error'}`;
  const showErrorInputClassPassword = `${props.isValidPassword ? '' : 'form__input_type_error'}`;
  const showErrorInputClassUsername = `${props.isValidUsername ? '' : 'form__input_type_error'}`;


  React.useEffect(() => {
    setEmail('');
    setPassword('');
    setUsername('');
    props.onValidityChangeUsername(true);
  }, [props.isOpen]);


  const onEmailChange = (e) => {
    setEmail(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setEmailError(`${props.errorMessages.notValidEmail}`);
      props.onValidityChangeEmail(false);
      setDisableButton(true);
      setIsEmailValid(false);
    } else if (e.target.value.length === 0) {
      props.onValidityChangeEmail(true);

      setDisableButton(true);
      setIsEmailValid(false);
    }
    else {
      setEmailError('');
      setIsEmailValid(true);
      checkFormsVlidation();
    }
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length === 0) {
      props.onValidityChangePassword(true);
      setDisableButton(true);
      setIsPasswordValid(false);
    } else if (e.target.value.length < 8) {
      setPasswordError(`${props.errorMessages.notValidPassword}`);
      props.onValidityChangePassword(false);
      setDisableButton(true);
      setIsPasswordValid(false);
    } else {
      setPasswordError('');
      setIsPasswordValid(true);
      checkFormsVlidation();
    }
  };

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value.length === 0) {
      props.onValidityChangeUsername(true);
      setDisableButton(true);
      setIsUsernamelValid(false);
    } else if (e.target.value.length < 2) {
      setUsernameError(`${props.errorMessages.notValidUsername}`);
      props.onValidityChangeUsername(false);
      setDisableButton(true);
      setIsUsernamelValid(false);
    } else {
      setUsernameError('');
      setIsUsernamelValid(true);
      checkFormsVlidation();
    }
  }

  const checkFormsVlidation = () => {
    if (isPasswordValid && isEmailValid && isUsernamelValid) {
      props.onValidityChangeEmail(true);
      props.onValidityChangePassword(true);
      props.onValidityChangeUsername(true);
      setDisableButton(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSignup({
      email: email,
      password: password,
      name: username,
    });
  }

  return (
    <ModalWithForm
      name='signup'
      title='Inscribirse'
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText='Inscribirse'
      onSubmit={handleSubmit}
      linkName='iniciar sesión'
      openSignupPopup={props.openSignupPopup}
      openSigninPopup={props.openSigninPopup}
      disabledButtonClass={disabledButtonClass}
      disableButton={disableButton}
      submitError={props.submitError}
    >
      <fieldset className='signup__form-fieldset'>
        <label className='signup__form-label signup__form-label-email'>Correo electrónico</label>
        <input
          className={`signup__form-input ${showErrorInputClassEmail}`}
          type='email'
          id='signup-email-input'
          placeholder='Introduce tu correo electrónico'
          name='email'
          value={email || ''}
          onChange={onEmailChange}
          required
        />
        <span className={`form__input-error ${showErrorMessageClassEmail}`}>
          {emailError}
        </span>

        <label className='signup__form-label signup__form-label-password'>Contraseña</label>
        <input
          className={`signup__form-input ${showErrorInputClassPassword}`}
          type='password'
          id='signup-password-input'
          placeholder='Introduce tu contraseña'
          name='password'
          value={password || ''}
          onChange={onPasswordChange}
          required
        />
        <span className={`form__input-error ${showErrorMessageClassPassword}`}>
          {passwordError}
        </span>

        <label className='signup__form-label signup__form-label-username'>Nombre de usuario</label>
        <input
          className={`signup__form-input ${showErrorInputClassUsername}`}
          type='text'
          id='signup-username-input'
          placeholder='Introduce tu nombre de usuario'
          name='username'
          value={username || ''}
          onChange={onUsernameChange}
          required
        />
        <span className={`form__input-error ${showErrorMessageClassUsername}`}>
          {usernameError}
        </span>
      </fieldset>
    </ModalWithForm>
  );
}