import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import ArticleMini from '../../components/ArticleMini/ArticleMini';
import { useGetArticlesQuery } from '../../redux/api';

const ArticleList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, refetch } = useGetArticlesQuery({ limit: 6, offset: (page - 1) * 6 });

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  const handlePageChange = (newPage) => {
    window.scrollTo(0, 0);
    setPage(newPage);
  };

  if (isLoading) return 'Loading...';
  if (error) return 'Error';

  return (
    <>
      <ul className="article-list">
        {data.articles.map((item) => (
          <ArticleMini key={item.slug} article={item} />
        ))}
      </ul>
      <Pagination
        onChange={handlePageChange}
        showSizeChanger={false}
        defaultCurrent={1}
        current={page}
        total={Math.ceil(data.articlesCount / 6)}
        style={{ marginBottom: '20px' }}
        align="center"
      />
    </>
  );
};

export default ArticleList;
