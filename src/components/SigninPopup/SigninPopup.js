import React from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
/*import ValidationContext from '../../contexts/ValidationContext';*/

export default function SigninPopup(props) {

  const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');


  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);

  const [disableButton, setDisableButton] = React.useState(true);

  const disabledButtonClass = `${!disableButton ? '' : 'popup__form-button_disabled'}`;

  const showErrorMessageClassEmail = `${props.isValidEmail ? '' : 'form__input-error_active'}`;
  const showErrorMessageClassPassword = `${props.isValidPassword ? '' : 'form__input-error_active'}`;

  const showErrorInputClassEmail = `${props.isValidEmail ? '' : 'form__input_type_error'}`;
  const showErrorInputClassPassword = `${props.isValidPassword ? '' : 'form__input_type_error'}`;

  React.useEffect(() => {
    setEmail('');
    setPassword('');
    props.onValidityChangeEmail(true);
    props.onValidityChangePassword(true);
  }, [props.isOpen]);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setEmailError(`${props.errorMessages.notValidEmail}`);
      props.onValidityChangeEmail(false);
      setDisableButton(true);
      setIsEmailValid(false);
    } else {
      setEmailError('');
      setIsEmailValid(true);
      checkFormsVlidation();
    }
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      props.onValidityChangePassword(false);
      setPasswordError(`${props.errorMessages.notValidPassword}`);
      setDisableButton(true);
      setIsPasswordValid(false);
    }  else {
      setIsPasswordValid(true);
      setPasswordError('');
      checkFormsVlidation();
    }
  };

  const checkFormsVlidation = () => {
    if (isPasswordValid && isEmailValid) {
      props.onValidityChangePassword(true);
      props.onValidityChangeEmail(true);
      setDisableButton(false);
    }
  }


  function handleSubmit(e) {
    e.preventDefault();
    props.onSignin({
      email: email,
      password: password,
    });
  }

  return (
    <ModalWithForm
      name='signin'
      title='Iniciar sesión'
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText='Iniciar sesión'
      onSubmit={handleSubmit}
      linkName='inscribirse'
      openSignupPopup={props.openSignupPopup}
      openSigninPopup={props.openSigninPopup}
      disabledButtonClass={disabledButtonClass}
      disableButton={disableButton}
      submitError={props.submitError}
    >
      <fieldset className='signin__form-fieldset'>
        <label className='signin__form-label signin__form-label-email '>Correo electrónico</label>
        <input
          className={`signin__form-input ${showErrorInputClassEmail}`}
          type='email'
          id='signin-email-input'
          placeholder='Introduce tu correo electrónico'
          name='email'
          value={email || ''}
          onChange={onEmailChange}
          required
        />
        <span className={`form__input-error ${showErrorMessageClassEmail}`}>
          {emailError}
        </span>

        <label className='signin__form-label signin__form-label-password'>Contraseña</label>
        <input
          className={`signin__form-input ${showErrorInputClassPassword}`}
          type='password'
          id='signin-password-input'
          placeholder='Introduce tu contraseña'
          name='password'
          value={password || ''}
          onChange={onPasswordChange}
          required
        />
        <span className={`form__input-error ${showErrorMessageClassPassword}`}>
          {passwordError}
        </span>
      </fieldset>
    </ModalWithForm>
  );
}