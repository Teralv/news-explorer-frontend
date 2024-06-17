import React from 'react';

export default function Preloader() {

  return (
    <div className='preloader'>
      <div className='preloader__container'>
        <div className='preloader__spinner-container'>
          <div className='preloader__spinner'></div>
        </div>
        <p className='preloader__subtitle'>Buscando Noticias...</p>
      </div>
    </div>
  )
}