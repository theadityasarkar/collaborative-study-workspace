import React, { useRef } from 'react';

const Editor = ({ content, onChange, onCursorMove }) => {
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const handleKeyUp = () => {
    if (textareaRef.current) {
      onCursorMove(textareaRef.current.selectionStart);
    }
  };

  const handleClick = () => {
    if (textareaRef.current) {
      onCursorMove(textareaRef.current.selectionStart);
    }
  };

  return (
    <div className="editor-container" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onClick={handleClick}
        placeholder="Start typing your collaborative notes here..."
        className="input-field"
        style={{
          flex: 1,
          resize: 'none',
          padding: '24px',
          fontFamily: "var(--font-sans)",
          fontSize: '1.1rem',
          lineHeight: '1.6',
          border: 'none',
          borderRadius: '12px',
          background: 'var(--bg-panel)',
          color: 'var(--text-primary)',
          boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)'
        }}
      />
    </div>
  );
};

export default Editor;
