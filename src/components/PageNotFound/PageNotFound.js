import React from 'react';
import pageNotFoundIcon from '../../images/notFound.png';

export default function PageNotFound() {

  return (
    <div className='pageNotFound'>
      <div className='pageNotFound__container'>
          <img src={pageNotFoundIcon} alt='not found' className='pageNotFound__image' />
          <h6 className='pageNotFound__title'>No se encontró nada</h6>
          <p className='pageNotFound__text'>
            Lo sentimos, pero no hay nada que coincida
            con tus términos de búsqueda.
          </p>
      </div>
    </div>
  )
}