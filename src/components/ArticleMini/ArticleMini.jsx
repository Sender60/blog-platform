import React from 'react';
import { format } from 'date-fns';
import './ArticleMini.scss';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

const ArticleMini = ({ id, article }) => {
  const { slug, title, description, createdAt, tagList, favoritesCount, author } = article;

  return (
    <li key={id} className="article">
      <div className="article__header">
        <div className="article__header-title-box">
          <div>
            <Link to={`/article/${slug}`}>
              <h1 className="article__header-title">{title}</h1>
            </Link>
            <span className="article__header-favorites-count">{favoritesCount}</span>
          </div>
          <div className="article__header-title-tags">
            {tagList.map((tag) => (
              <span key={uuidv4()} className="article__header-title-tag">
                {tag}
              </span>
            ))}
          </div>
          <p className="article__header-description">{description}</p>
        </div>
        <div className="article__header-user-box">
          <div className="article__header-user">
            <span className="article__header-user-username">{author.username}</span>
            <span className="article__header-user-date">{format(new Date(createdAt), 'MMMM dd, yyyy')}</span>
            <img className="article__header-user-avatar avatar" src={author.image} alt="avatar" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default ArticleMini;
