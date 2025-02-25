import React, { useEffect } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUserQuery } from '../../redux/api';
import { setLogin, setLogout } from '../../redux/reducers/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { authorized, username, image } = useSelector((state) => state.user);
  const token = localStorage.getItem('token');
  const { data, error, isLoading } = useGetUserQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (!isLoading && !error && data) {
      console.log(data);
      dispatch(setLogin(data));
    }
  }, [data, error, isLoading, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setLogout());
    window.location.reload();
  };

  function authorization() {
    if (isLoading) return <div />;

    if (!authorized) {
      return (
        <>
          <Link to="/sign-in">
            <button type="button" className="header__authorization-in">
              Sign in
            </button>
          </Link>
          <Link to="/sign-up">
            <button type="button" className="header__authorization-up">
              Sign up
            </button>
          </Link>
        </>
      );
    }

    return (
      <>
        <Link to="/new-article">
          <button type="button" className="header__authorization-create">
            Create article
          </button>
        </Link>
        <Link to="/profile">
          <div className="header__authorization-user">
            <span>{username}</span>
            <img className="avatar" src={image} alt="avatar" />
          </div>
        </Link>
        <Link to="/">
          <button type="button" className="header__authorization-out" onClick={handleLogout}>
            Log out
          </button>
        </Link>
      </>
    );
  }

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        Sender60 Blog
      </Link>
      <div className="header__user">
        <div className="header__authorization">{authorization()}</div>
      </div>
    </header>
  );
};

export default Header;
