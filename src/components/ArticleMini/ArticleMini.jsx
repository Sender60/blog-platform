import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import './ArticleMini.scss';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import HeartSvg from '../HeartSvg/HeartSvg';
import { useDeleteFavoriteMutation, useSetFavoriteMutation, useGetArticleQuery } from '../../redux/api';

const ArticleMini = ({ id, article }) => {
  const { slug, title, description, createdAt, tagList, favorited, favoritesCount, author } = article;

  const { refetch } = useGetArticleQuery(slug);

  const [isFavorited, setIsFavorited] = useState({ favorited, favoritesCount });

  const [setFavorite] = useSetFavoriteMutation(slug);
  const [deleteFavorite] = useDeleteFavoriteMutation(slug);

  useEffect(() => {
    setIsFavorited({ favorited, favoritesCount });
  }, [favorited, favoritesCount]);

  const handleFavorite = async (slugArticle) => {
    if (!isFavorited.favorited) {
      try {
        await setFavorite(slugArticle).unwrap();
        setIsFavorited((prev) => ({ favorited: true, favoritesCount: prev.favoritesCount + 1 }));
        refetch();
      } catch (errorSetFavorite) {
        console.error('Error setting favorite:', errorSetFavorite);
      }
    } else {
      try {
        await deleteFavorite(slugArticle).unwrap();
        setIsFavorited((prev) => ({ favorited: false, favoritesCount: prev.favoritesCount - 1 }));
        refetch();
      } catch (errorDeleteFavorite) {
        console.error('Error deleting favorite:', errorDeleteFavorite);
      }
    }
  };

  return (
    <li key={id} className="article">
      <div className="article__header">
        <div className="article__header-title-box">
          <div>
            <Link to={`/article/${slug}`}>
              <h1 className="article__header-title">{title}</h1>
            </Link>
            <button type="button" className="article__header-favorites-button" onClick={() => handleFavorite(slug)}>
              <HeartSvg like={isFavorited.favorited} />
              <span className="article__header-favorites-count">{isFavorited.favoritesCount}</span>
            </button>
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
