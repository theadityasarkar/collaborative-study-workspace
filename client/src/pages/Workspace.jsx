import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Editor from '../components/Editor';
import Presence from '../components/Presence';
import { useSocket } from '../hooks/useSocket';
import { useEditor } from '../hooks/useEditor';

const Workspace = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const socket = useSocket();
  const user = location.state?.user;

  const [members, setMembers] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const { content, updateContent, updateCursor, typingUsers } = useEditor(roomId, user);

  useEffect(() => {
    if (!user) {
      navigate('/join');
      return;
    }

    if (socket) {
      socket.emit('join-room', { roomCode: roomId, user });

      socket.on('room-members', (roomMembers) => {
        setMembers(roomMembers);
      });

      socket.on('error-message', (msg) => {
        setErrorMsg(msg);
      });
    }

    return () => {
      if (socket) {
        socket.off('room-members');
        socket.off('error-message');
      }
    };
  }, [socket, roomId, user, navigate]);

  if (!user) return null;

  return (
    <Layout roomCode={roomId} user={user}>
      {errorMsg ? (
        <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
          <h3>Error</h3>
          <p>{errorMsg}</p>
          <button className="btn btn-secondary" onClick={() => navigate('/')} style={{ marginTop: '16px' }}>Return Home</button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '24px', flex: 1, height: 'calc(100vh - 120px)' }}>
          <div style={{ flex: 1, minWidth: '0' }} className="animate-fade-in">
            <Editor 
              content={content} 
              onChange={updateContent} 
              onCursorMove={updateCursor} 
            />
          </div>
          <div style={{ width: '300px', flexShrink: 0, animationDelay: '0.1s', opacity: 0 }} className="animate-fade-in">
            <Presence members={members} typingUsers={typingUsers} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Workspace;
