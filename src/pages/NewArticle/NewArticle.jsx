import React from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import Tags from '../../components/Tags/Tags';
import './NewArticle.scss';
import { useSetArticleMutation } from '../../redux/api';

const NewArticle = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tagList: [{ id: uuidv4(), text: '' }],
    },
  });

  const [setArticle] = useSetArticleMutation();

  const tagList = useWatch({ control, name: 'tagList' });

  const onSubmit = async (data) => {
    const tags = tagList.map((tag) => tag.text).filter((tag) => tag !== '');
    const formData = { ...data, tagList: tags };
    const response = await setArticle(formData).unwrap();
    const { slug } = response.article;
    navigate(`/article/${slug}`);
  };

  return (
    <div className="article">
      <h1>Create new article</h1>
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
              tags={field.value}
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
        <Button htmlType="submit" type="primary" style={{ padding: '20px' }}>
          Create
        </Button>
      </form>
    </div>
  );
};

export default NewArticle;
