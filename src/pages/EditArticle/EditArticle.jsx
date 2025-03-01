import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateArticleMutation, useGetArticleQuery } from '../../redux/api';
import Tags from '../../components/Tags/Tags';

const EditArticle = () => {
  const navigate = useNavigate();
  const { slug: articleSlug } = useParams();
  const [updateArticle] = useUpdateArticleMutation();

  const { data: article, isLoading, refetch } = useGetArticleQuery(articleSlug);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (article) {
      reset({
        title: article.article.title,
        description: article.article.description,
        body: article.article.body,
        tagList: article.article.tagList.map((tag) => ({ id: uuidv4(), text: tag })),
      });
    }
  }, [article, reset]);

  const onSubmit = async (data) => {
    const tags = data.tagList.map((tag) => tag.text).filter((tag) => tag !== '');
    const formData = { ...data, tagList: tags };
    await updateArticle({ slug: articleSlug, article: formData }).unwrap();
    await refetch();
    navigate(`/article/${articleSlug}`);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="article">
      <h1>Edit article</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">
          Title
          <input
            className="new-article-input"
            type="text"
            id="title"
            placeholder="Title"
            {...register('title', { required: true, maxLength: 50 })}
          />
          {errors.title && <span className="new-article-input-error">Title is required</span>}
        </label>
        <label htmlFor="description">
          Description
          <input
            className="new-article-input"
            type="text"
            id="description"
            placeholder="Title"
            {...register('description', { required: true })}
          />
          {errors.description && <span className="new-article-input-error">Description is required</span>}
        </label>
        <label htmlFor="body">
          Body
          <textarea className="new-article-input" type="text" id="body" placeholder="Text" {...register('body', { required: true })} />
          {errors.body && <span className="new-article-input-error">Body is required</span>}
        </label>
        <Controller
          name="tagList"
          control={control}
          defaultValue={[{ id: uuidv4(), text: '' }]}
          render={({ field }) => (
            <Tags
              tags={field.value && field.value.length > 0 ? field.value : [{ id: uuidv4(), text: '' }]}
              onAddTag={(index) => {
                const newTags = [...field.value];
                newTags.splice(index + 1, 0, { id: uuidv4(), text: '' });
                field.onChange(newTags);
              }}
              onRemoveTag={(index) => {
                const newTags = field.value.filter((_, i) => i !== index);
                if (newTags.length === 0) newTags.push({ id: uuidv4(), text: '' });
                field.onChange(newTags);
              }}
              onChangeTag={(index, value) => {
                const newTags = [...field.value];
                newTags[index].text = value;
                field.onChange(newTags);
              }}
            />
          )}
        />
        <button className="new-article-button" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
