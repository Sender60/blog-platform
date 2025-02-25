import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NewArticle = () => {
  const { authorized } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authorized) {
      navigate('/sign-in');
    }
  }, [authorized]);
  return <div>NewArticle</div>;
};

export default NewArticle;
