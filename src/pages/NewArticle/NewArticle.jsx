import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Tags from '../../components/Tags/Tags';
import './NewArticle.scss';

const NewArticle = () => {
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
      tagList: [''],
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div className="article">
      <h1>Create new article</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">
          {' '}
          Title
          <input
            className="new-article-input"
            type="text"
            id="title"
            placeholder="Title"
            {...register('title', { required: true, maxLength: 50 })}
          />
          {errors.title && <span className="error">Title is required</span>}
        </label>
        <label htmlFor="description">
          {' '}
          Description
          <input
            className="new-article-input"
            type="text"
            id="description"
            placeholder="Title"
            {...register('description', { required: true })}
          />
          {errors.description && <span className="error">Description is required</span>}
        </label>
        <label htmlFor="body">
          {' '}
          Body
          <textarea className="new-article-input" type="text" id="body" placeholder="Text" {...register('body', { required: true })} />
          {errors.body && <span className="error">Body is required</span>}
        </label>
        <Controller
          name="tagList"
          control={control}
          defaultValue={['']}
          render={({ field }) => (
            <Tags
              tags={field.value}
              onAddTag={(index) => {
                const newTags = [...field.value];
                newTags.splice(index + 1, 0, '');
                field.onChange(newTags);
              }}
              onRemoveTag={(index) => {
                const newTags = field.value.filter((_, i) => i !== index);
                if (newTags.length === 0) newTags.push('');
                field.onChange(newTags);
              }}
              onChangeTag={(index, value) => {
                const newTags = [...field.value];
                newTags[index] = value;
                field.onChange(newTags);
              }}
            />
          )}
        />
        <button className="new-article-button" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewArticle;
