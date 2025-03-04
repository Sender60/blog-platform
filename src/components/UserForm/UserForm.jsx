import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './UserForm.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { useRegisterMutation, useLoginMutation, useUpdateUserMutation } from '../../redux/api';
import { setLogin } from '../../redux/reducers/userSlice';

const UserForm = ({ fields, title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fieldError, setFieldError] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onBlur',
  });

  const [registerMutation, { isLoading: isRegisterLoading, error: registerError }] = useRegisterMutation();
  const [loginMutation, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();
  const [updateUserMutation] = useUpdateUserMutation();

  const serverFieldMapping = {
    username: 'Имя пользователя',
    email: 'Email',
  };

  const transformServerErrors = (serverErrors) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    Object.entries(serverErrors).reduce((acc, [key, value]) => {
      if (serverFieldMapping[key]) {
        acc[serverFieldMapping[key]] = value;
      }
      return acc;
    }, {});

  const onSubmit = async (data) => {
    let formData;
    if (title === 'Регистрация') {
      formData = {
        user: {
          username: data['Имя пользователя'],
          email: data.Email,
          password: data['Пароль'],
        },
      };
    } else if (title === 'Вход') {
      formData = {
        user: {
          email: data.Email,
          password: data['Пароль'],
        },
      };
    } else if (title === 'Редактирование профиля') {
      formData = {
        user: {
          username: data['Имя пользователя'],
          email: data.Email,
          password: data['Пароль'],
          image: data['Avatar image (url)'],
        },
      };
    }

    try {
      let res;
      if (title === 'Регистрация') {
        res = await registerMutation(formData).unwrap();
      } else if (title === 'Вход') {
        res = await loginMutation(formData).unwrap();
      } else if (title === 'Редактирование профиля') {
        res = await updateUserMutation(formData).unwrap();
      }

      dispatch(
        setLogin({
          username: res.username,
          email: res.email,
          password: res.password,
          image: res.image || data['Avatar image (url)'] || 'https://www.gravatar.com/avatar/?d=identicon',
        }),
      );
      if (title === 'Редактирование профиля') {
        localStorage.setItem('token', res.token);
      } else {
        localStorage.setItem('token', res.user.token);
      }
      navigate('/', { replace: true });
      setFieldError({});
    } catch (error) {
      console.error(error);
      if (title === 'Вход' && error.data.errors['email or password'] === 'is invalid') {
        setFieldError({ email: 'Неправильный логин или пароль' });
      }
      if (title === 'Регистрация' && error.data.errors) {
        setFieldError(transformServerErrors(error.data.errors));
      }
    }
  };

  const getRegisterError = (rgsError) => {
    if (rgsError.status === 500) {
      return `Произошла внутренняя ошибка сервера: ${JSON.stringify(rgsError.data.errors)}`;
    }
    if (rgsError.data && rgsError.data.errors) {
      if (rgsError.data.errors.username && rgsError.data.errors.email) {
        return 'Пользователь с таким именем и почтовым адресом уже зарегистрирован';
      }
      return Object.entries(rgsError.data.errors)
        .map(([field, message]) => {
          if (field === 'username') return 'Пользователь с таким именем уже зарегистрирован';
          if (field === 'email') return 'Пользователь с таким почтовым адресом уже зарегистрирован';
          return message;
        })
        .join(' ');
    }
    return rgsError.message || 'Произошла ошибка';
  };

  const getLoginError = (lgError) => {
    if (lgError.status === 500) {
      return `Произошла внутренняя ошибка сервера: ${JSON.stringify(lgError.data.errors)}`;
    }
    if (lgError.data && lgError.data.errors) {
      if (lgError.data.errors['email or password'] === 'is invalid') {
        return 'Неправильный логин или пароль';
      }
      return Object.values(lgError.data.errors).join(', ');
    }
    return lgError.message || 'Произошла ошибка';
  };

  return (
    <div className="user-form">
      <h1 className="user-form__title">{title}</h1>
      <form className="user-form__form" onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <label key={field.name}>
            <span>{field.name}</span>
            <input
              type={field.type}
              {...register(field.name, {
                required: field.required || false,
                pattern: field.pattern,
                minLength: field.minLength,
                maxLength: field.maxLength,
                validate:
                  field.name === 'Повторите пароль'
                    ? (value) => {
                        const passwordd = watch('Пароль');
                        if (value !== passwordd) {
                          return 'Passwords do not match';
                        }
                        return true;
                      }
                    : undefined,
              })}
              placeholder={field.placeholder}
              className="user-form__input"
              style={fieldError[field.name] ? { border: '1px solid red' } : {}}
            />
            {errors && errors[field.name] && (
              <label className="user-form__error" htmlFor={field.name}>
                {errors[field.name].message}
              </label>
            )}
          </label>
        ))}
        {title === 'Регистрация' && (
          <label style={{ display: 'block' }}>
            <input type="checkbox" required />
            Согласие обработки персональных данных
          </label>
        )}
        <Button disabled={isRegisterLoading || isLoginLoading} htmlType="submit">
          Submit
        </Button>
        {(registerError || loginError) && (
          <label className="user-form__error">{registerError ? getRegisterError(registerError) : getLoginError(loginError)}</label>
        )}
      </form>
    </div>
  );
};

export default UserForm;
