import React, { useEffect } from 'react';
import './Header.scss';
import { Button } from 'antd';
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
            <Button color="black" variant="text">
              Sign in
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button color="lime" variant="outlined" style={{ marginLeft: '10px' }}>
              Sign up
            </Button>
          </Link>
        </>
      );
    }

    return (
      <>
        <Link to="/new-article">
          <Button color="lime" variant="outlined">
            Create article
          </Button>
        </Link>
        <Link to="/profile">
          <div className="header__authorization-user">
            <span>{username}</span>
            <img className="avatar" src={image} alt="avatar" />
          </div>
        </Link>
        <Link to="/">
          <Button style={{ border: '1px solid lightgrey', color: 'grey' }} variant="outlined" onClick={handleLogout}>
            Log out
          </Button>
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
