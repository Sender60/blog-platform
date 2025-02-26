import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const Tags = ({ tags, onAddTag, onRemoveTag, onChangeTag }) => (
  <div className="tags">
    <label>Tags</label>
    {tags.map((tag, index) => (
      <div key={uuidv4()}>
        <input
          className="new-article-input tag"
          type="text"
          value={tag}
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
