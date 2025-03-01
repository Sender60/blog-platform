import React from 'react';
import ReactMarkdown from 'react-markdown';
import './Article.scss';
import { format } from 'date-fns';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { Popconfirm } from 'antd';
import { useGetArticleQuery, useDeleteArticleMutation } from '../../redux/api';

const Article = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetArticleQuery(slug);
  const [deleteArticle] = useDeleteArticleMutation(slug);

  const { username } = useSelector((state) => state.user);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  const { title, description, body, createdAt, tagList, favoritesCount, author } = data.article;

  const handleDelete = async () => {
    try {
      await deleteArticle(slug).unwrap();
      navigate('/');
    } catch (errorDelete) {
      console.error('Error deleting article:', errorDelete);
    }
  };

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
                <Popconfirm
                  title="Are you sure you want to delete this article?"
                  onConfirm={handleDelete}
                  okText="Yes"
                  cancelText="No"
                  placement="right"
                >
                  <button className="article__header-delete" type="button">
                    Delete
                  </button>
                </Popconfirm>
                <button className="article__header-edit" type="button" onClick={() => navigate(`/article/${slug}/edit`)}>
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
