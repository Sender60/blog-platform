import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import ArticleList from './pages/ArticleList/ArticleList';
import Article from './pages/Article/Article';
import { RegisterForm, LoginForm, EditUserForm } from './pages/RegisterForm/RegisterForm';
import NewArticle from './pages/NewArticle/NewArticle';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/article/:slug" element={<Article />} />
        <Route path="/sign-up" element={<RegisterForm />} />
        <Route path="/sign-in" element={<LoginForm />} />
        <Route path="/profile" element={<EditUserForm />} />
        <Route path="/new-article" element={<NewArticle />} />
      </Routes>
    </div>
  );
}

export default App;
