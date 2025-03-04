import { Button } from 'antd';
import React from 'react';

const Tags = ({ tags = [], onAddTag, onRemoveTag, onChangeTag }) => (
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
        <Button variant="outlined" color="red" style={{ padding: '20px', marginRight: '10px' }} onClick={() => onRemoveTag(index)}>
          Delete
        </Button>
        {index === tags.length - 1 && (
          <Button variant="outlined" color="primary" style={{ padding: '20px' }} onClick={() => onAddTag(index)}>
            Add
          </Button>
        )}
      </div>
    ))}
  </div>
);

export default Tags;
