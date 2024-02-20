import './Header.css'

import React from 'react'

import marvel from '../../images/marvel.png'

function Header ()  {
    return(
        <>
            <div className="Header">
                <img src={marvel} alt="marvel" />
            </div>
        </>
    )
}

export default Header