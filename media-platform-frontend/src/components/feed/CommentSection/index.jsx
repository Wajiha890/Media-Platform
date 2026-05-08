import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const CommentSection = ({ comments, onAddComment, onClose }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(commentText);
      setCommentText('');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
          borderBottom: '1px solid #dbdbdb'
        }}>
          <h3 style={{ margin: 0 }}>Comments</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {comments.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#8e8e8e' }}>No comments yet</p>
          ) : (
            comments.map((comment, index) => (
              <div key={comment.id || index} style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
                <img
                  src={comment.user?.avatar || 'https://via.placeholder.com/32'}
                  alt={comment.user?.username}
                  style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                />
                <div>
                  <strong style={{ fontSize: '14px' }}>{comment.user?.username}</strong>
                  <p style={{ margin: '4px 0', fontSize: '14px' }}>{comment.text}</p>
                  <span style={{ fontSize: '10px', color: '#8e8e8e' }}>
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          padding: '16px',
          borderTop: '1px solid #dbdbdb',
          gap: '12px'
        }}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #dbdbdb',
              borderRadius: '20px',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            style={{
              background: commentText.trim() ? '#0095f6' : '#dbdbdb',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 16px',
              color: 'white',
              cursor: commentText.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};