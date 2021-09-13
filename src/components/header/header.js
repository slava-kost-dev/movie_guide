import React, { useState } from 'react';

import './header.css'

function Header(props) {
  
  function onFormSubmit(e) {
   e.preventDefault();
  }

  return (
    <header className="header">
      <h2 className="header__text">Movie Catalog</h2>
      <form className="header__form" onSubmit={onFormSubmit}>
        <input onInput={props.onInputValue} type="text" placeholder="enter movie" />
      </form>
      <div className="header__user">
        <select className="header__form-select">
          <option>Alexander Borisenko</option>
          <option>Ivan Tytov</option>
          <option>Vasya Tamov</option>
        </select>
      </div>
    </header>
  )
}

export default Header;