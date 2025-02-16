import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import ArticleList from './pages/ArticleList/ArticleList';
import Article from './pages/Article/Article';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/article/:slug" element={<Article />} />
      </Routes>
    </div>
  );
}

export default App;
