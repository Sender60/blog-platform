import React from 'react';
import ReactMarkdown from 'react-markdown';
import './Article.scss';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { useGetArticleQuery } from '../../redux/api';

const Article = () => {
  const { slug } = useParams();
  const { data, isLoading, error } = useGetArticleQuery(slug);

  const { username } = useSelector((state) => state.user);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  const { title, description, body, createdAt, tagList, favoritesCount, author } = data.article;

  return (
    <div className="article">
      <div className="article__header">
        <div className="article__header-title-box">
          <div>
            <h1 className="article__header-title">{title}</h1>
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
          <div>
            {username === author.username && (
              <>
                <button className="article__header-delete" type="button">
                  Delete
                </button>
                <button className="article__header-edit" type="button">
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Article;
