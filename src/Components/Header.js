import React from 'react'
import Nav from './Header/Nav';
import Hotline from './Header/Hotline';

//funcional component
function Header(props) {
  const {title} = props;
  return (
    <header className="header">
        <div className='container'>
            <h1 className='text-center'>{title}</h1>
            <Hotline {...props}/>
            {/* <Nav nav={nav}/> */}
        </div>
    </header>
  )
}

export default Header;