// src/components/upload/VideoUploader/MetadataForm.jsx
import React from 'react';
import { User, MapPin, Tag, FileText } from 'lucide-react';

export const MetadataForm = ({ metadata, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...metadata, [field]: value });
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    handleChange('tags', tags);
  };

  const handlePeopleChange = (e) => {
    const people = e.target.value.split(',').map(person => person.trim());
    handleChange('people', people);
  };

  return (
    <div className="metadata-form">
      <h3>Video Details</h3>
      
      <div className="form-group">
        <label>
          <FileText size={18} />
          Title *
        </label>
        <input
          type="text"
          placeholder="Enter video title"
          value={metadata.title}
          onChange={(e) => handleChange('title', e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>
          <FileText size={18} />
          Caption
        </label>
        <textarea
          placeholder="Write a caption..."
          value={metadata.caption}
          onChange={(e) => handleChange('caption', e.target.value)}
          rows={3}
        />
      </div>

      <div className="form-group">
        <label>
          <MapPin size={18} />
          Location
        </label>
        <input
          type="text"
          placeholder="Add location"
          value={metadata.location}
          onChange={(e) => handleChange('location', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>
          <Tag size={18} />
          Tags (comma separated)
        </label>
        <input
          type="text"
          placeholder="nature, travel, adventure"
          value={metadata.tags.join(', ')}
          onChange={handleTagsChange}
        />
      </div>

      <div className="form-group">
        <label>
          <User size={18} />
          People (comma separated)
        </label>
        <input
          type="text"
          placeholder="@john, @jane"
          value={metadata.people.join(', ')}
          onChange={handlePeopleChange}
        />
      </div>
    </div>
  );
};