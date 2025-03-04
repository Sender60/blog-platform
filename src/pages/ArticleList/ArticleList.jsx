import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { useSearchParams } from 'react-router-dom';
import ArticleMini from '../../components/ArticleMini/ArticleMini';
import { useGetArticlesQuery } from '../../redux/api';

const ArticleList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get('page') || '1');
  const [page, setPage] = useState(initialPage);
  const { data, isLoading, error } = useGetArticlesQuery({ limit: 6, offset: (page - 1) * 6 });

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSearchParams({ page: newPage });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setPage(initialPage);
  }, [initialPage]);

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
