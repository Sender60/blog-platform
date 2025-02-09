import React, { useState } from 'react';
import './Header.scss';

const Header = () => {
  const [authorized, setAuthorized] = useState(true);

  function authorization() {
    if (!authorized) {
      return (
        <>
          <button type="button" className="header__authorization-in">
            Sign in
          </button>
          <button type="button" className="header__authorization-up">
            Sign up
          </button>
        </>
      );
    }

    return (
      <>
        <button type="button" className="header__authorization-create">
          Create article
        </button>
        <div className="header__authorization-user">
          <span>John Doe</span>
          <img className="avatar" src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar" />
        </div>
        <button type="button" className="header__authorization-out" onClick={() => setAuthorized(!authorized)}>
          Log out
        </button>
      </>
    );
  }

  return (
    <header className="header">
      <span className="header__logo">Sender60 Blog</span>
      <div className="header__user">
        <div className="header__authorization">{authorization()}</div>
      </div>
    </header>
  );
};

export default Header;
