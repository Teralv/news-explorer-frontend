import React from 'react';

export default function SuccessPopup({ onClose, isOpen, openSigninPopup }) {
  const wrapperRef = React.useRef(null);
  const fadeIn = `${isOpen ? 'infotoolstip_fadein' : ''}`;

  React.useEffect(() => {
    const escKeyClose = (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    }
    window.addEventListener('keydown', escKeyClose)
    return () => window.removeEventListener('keydown', escKeyClose)
  }, [onClose])


  React.useEffect(() => {
    const overlayClose = (e) => {
      if (!wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        onClose();
      }
    }

    window.addEventListener('mouseup', overlayClose)
    return () => window.removeEventListener('mouseup', overlayClose)
  }, [onClose])

  const onLinkClick = () => {
    onClose();
    openSigninPopup();
  }

  return (
    <section className={`infotoolstip ${fadeIn}`} id='infotoolstip-popup'>
      <div className={'infotoolstip__container container'} ref={wrapperRef}>
          <button type='button' className={'infotoolstip__close-button'} onClick={onClose}></button>
          <div className={'infotoolstip__content-container'}>
            <h3 className='infotoolstip__message'>¡El registro se ha completado con éxito!</h3>
            <p className='infotoolstip__link' onClick={onLinkClick}>Inscribirse</p>
          </div>
      </div>
    </section>
  );
}