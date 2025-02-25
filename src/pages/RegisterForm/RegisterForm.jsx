import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserForm from '../../components/UserForm/UserForm';

const RegisterForm = () => {
  const fields = [
    {
      name: 'Имя пользователя',
      type: 'text',
      required: { value: true, message: 'Username is required' },
      pattern: { value: /^[A-Za-z0-9]+$/, message: 'Username must contain only letters and numbers' },
      minLength: { value: 3, message: 'Username must be at least 3 characters long' },
      maxLength: { value: 20, message: 'Username must be at most 20 characters long' },
      placeholder: 'Username',
    },
    {
      name: 'Email',
      type: 'email',
      required: { value: true, message: 'Email is required' },
      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i },
      placeholder: 'Email',
    },
    {
      name: 'Пароль',
      type: 'password',
      required: { value: true, message: 'Password is required' },
      minLength: { value: 6, message: 'Password must be at least 6 characters long' },
      maxLength: { value: 40, message: 'Password must be at most 40 characters long' },
      placeholder: 'Password',
    },
    {
      name: 'Повторите пароль',
      type: 'password',
      required: { value: true, message: 'Password confirmation is required' },
      placeholder: 'Confirm password',
    },
  ];
  return <UserForm fields={fields} title="Регистрация" />;
};

const LoginForm = () => {
  const fields = [
    { name: 'Email', type: 'email', required: true, placeholder: 'Email' },
    { name: 'Пароль', type: 'password', required: true, placeholder: 'Password' },
  ];
  return <UserForm fields={fields} title="Вход" />;
};

const EditUserForm = () => {
  const { authorized } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authorized) {
      navigate('/sign-in');
    }
  }, [authorized]);

  if (!authorized) return <div />;

  const fields = [
    { name: 'Имя пользователя', type: 'text', required: { value: true, message: 'Username is required' }, placeholder: 'Username' },
    { name: 'Email', type: 'email', required: { value: true, message: 'Email is required' }, placeholder: 'Email' },
    { name: 'Пароль', type: 'password', required: { value: true, message: 'Password is required' }, placeholder: 'New password' },
    { name: 'Avatar image (url)', type: 'text', required: false, placeholder: 'Avatar' },
  ];
  return <UserForm fields={fields} title="Редактирование профиля" />;
};

export { RegisterForm, LoginForm, EditUserForm };
