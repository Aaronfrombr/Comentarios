import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [comments, setComments] = useState(() => {
    const savedComments = localStorage.getItem('comments');
    return savedComments ? JSON.parse(savedComments) : [];
  });

  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  // Update localStorage whenever comments change
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!author || !text) return;

    const newComment = {
      id: Date.now(),
      author,
      text,
      timestamp: new Date().toLocaleString(),
    };

    setComments([newComment, ...comments]);
    setAuthor('');
    setText('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Real-Time Comments</h1>
      </header>

      <main>
        {/* Comment Form */}
        <form className="comment-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <textarea
            placeholder="Your Comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button type="submit">Post Comment</button>
        </form>

        {/* Comment Count */}
        <div className="comment-count">
          <strong>Total Comments:</strong> {comments.length}
        </div>

        {/* Comments List */}
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <div className="comment-header">
                <strong>{comment.author}</strong> <span>{comment.timestamp}</span>
              </div>
              <p>{comment.text}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
