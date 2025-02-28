import React from 'react';

const Tags = ({ tags, onAddTag, onRemoveTag, onChangeTag }) => (
  <div className="tags">
    <label>Tags</label>
    {tags.map((tag, index) => (
      <div key={tag.id}>
        <input
          className="new-article-input tag"
          type="text"
          value={tag.text}
          onChange={(e) => onChangeTag(index, e.target.value)}
          placeholder="Tag"
        />
        <button className="new-article-button remove" type="button" onClick={() => onRemoveTag(index)}>
          Delete
        </button>
        {index === tags.length - 1 && (
          <button className="new-article-button add" type="button" onClick={() => onAddTag(index)}>
            Add
          </button>
        )}
      </div>
    ))}
  </div>
);

export default Tags;
