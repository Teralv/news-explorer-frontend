import React from 'react';

export default function Navigation(props) {

  return (
    <nav className='nav'>
      {props.children}
    </nav>
  )
}