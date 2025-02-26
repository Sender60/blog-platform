/* eslint-disable no-nested-ternary */
import React from 'react';
import { useForm } from 'react-hook-form';
import './UserForm.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegisterMutation, useLoginMutation, useUpdateUserMutation } from '../../redux/api';
import { setLogin } from '../../redux/reducers/userSlice';

const UserForm = ({ fields, title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    } catch (error) {
      console.error(error);
    }
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
              style={errors && errors[field.name] ? { border: '1px solid red' } : {}}
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
        <button disabled={isRegisterLoading || isLoginLoading} type="submit">
          Submit
        </button>
        {(registerError || loginError) && (
          <label className="user-form__error">
            {registerError && registerError.status === 500
              ? `Произошла внутренняя ошибка сервера: ${JSON.stringify(registerError.data.errors)}`
              : registerError && registerError.data && registerError.data.errors
                ? Object.values(registerError.data.errors).join(', ')
                : registerError && registerError.message
                  ? registerError.message
                  : loginError && loginError.status === 500
                    ? `Произошла внутренняя ошибка сервера: ${JSON.stringify(loginError.data.errors)}`
                    : loginError && loginError.data && loginError.data.errors
                      ? Object.values(loginError.data.errors).join(', ')
                      : loginError && loginError.message
                        ? loginError.message
                        : 'Произошла ошибка'}
          </label>
        )}
      </form>
    </div>
  );
};

export default UserForm;
