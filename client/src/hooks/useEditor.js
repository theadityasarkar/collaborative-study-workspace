import { useState, useEffect, useRef } from 'react';
import { useSocket } from './useSocket';

export const useEditor = (roomCode, user) => {
  const socket = useSocket();
  const [content, setContent] = useState('');
  const [typingUsers, setTypingUsers] = useState([]);
  const [cursors, setCursors] = useState({});
  const typingTimerRef = useRef(null);

  useEffect(() => {
    if (!socket || !roomCode) return;

    socket.on('load-note', (initialContent) => {
      setContent(initialContent || '');
    });

    socket.on('note-update', (updatedContent) => {
      setContent(updatedContent);
    });

    socket.on('typing-start', (typingUser) => {
      if (typingUser !== user) {
        setTypingUsers(prev => [...new Set([...prev, typingUser])]);
      }
    });

    socket.on('typing-stop', (typingUser) => {
      setTypingUsers(prev => prev.filter(u => u !== typingUser));
    });

    socket.on('cursor-update', ({ user: cursorUser, position }) => {
      if (cursorUser !== user) {
        setCursors(prev => ({
          ...prev,
          [cursorUser]: position
        }));
      }
    });

    return () => {
      socket.off('load-note');
      socket.off('note-update');
      socket.off('typing-start');
      socket.off('typing-stop');
      socket.off('cursor-update');
    };
  }, [socket, roomCode, user]);

  const updateContent = (newContent) => {
    setContent(newContent);
    if (socket) {
      socket.emit('note-update', { roomCode, content: newContent });
      
      socket.emit('typing-start', { roomCode, user });
      
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      
      typingTimerRef.current = setTimeout(() => {
        socket.emit('typing-stop', { roomCode, user });
      }, 800);
    }
  };

  const updateCursor = (position) => {
    if (socket) {
      socket.emit('cursor-move', { roomCode, user, position });
    }
  };

  return { content, updateContent, updateCursor, typingUsers, cursors };
};
