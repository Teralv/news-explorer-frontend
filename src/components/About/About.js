import React from 'react';
import authorAvatar from '../../images/about-image.png';

export default function About() {

  return (
    <section className='about'>
      <img src={authorAvatar} alt='author'className='about__author-picture' />
      <div className='about__text-container'>
        <h4 className='about__heading'>Acerca del autor</h4>
        <div className='about__paragraph-container'>
          <p className='about__paragraph'>
            Me llamo Alvaro Ibarra y soy desarrolladora web.
            Para desarrollar este proyecto he utilizado mis conocimientos recién adquiridos con:
            React.js, clases de JavaScript, RestApi, CSS, HTML, Node.js, MongoDB,
            ¡Google Cloud y mucho más!
          </p>
          <p className='about__paragraph'>
            Este es mi proyecto final para el curso de Desarrollo Web Full Stack de TripleTen. Mi experiencia
            durante el curso, ha sido excelente. He adquirido muchos conocimientos en tecnologías y herramientas
            clave, gracias a su estructura clara y a sus instructores capacitados y siempre dispuestos a ayudar.
            Recomiendo encarecidamente este curso para cualquiera que quiera adentrarse en el desarrollo web y
            fortalecer su carrera en tecnología.
          </p>
        </div>
      </div>
    </section>
  )
}