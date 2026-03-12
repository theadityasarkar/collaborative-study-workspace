import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { joinRoom } from '../services/api';
import { User, Hash, Loader2 } from 'lucide-react';

const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!roomCode.trim() || !username.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      await joinRoom(roomCode, username);
      navigate(`/room/${roomCode.toUpperCase()}`, { state: { user: username } });
    } catch (err) {
      setError(err.response?.data?.message || 'Error joining workspace. Check code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="glass-panel animate-fade-in" style={{ 
        maxWidth: '480px', 
        width: '100%', 
        margin: '60px auto', 
        padding: '40px' 
      }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '8px', textAlign: 'center' }}>Join Workspace</h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '32px' }}>
          Enter a room code to collaborate instantly.
        </p>

        {error && (
          <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Room Code
            </label>
            <div style={{ position: 'relative' }}>
              <Hash size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="e.g. OS1UGN"
                className="input-field"
                style={{ paddingLeft: '44px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold' }}
                autoFocus
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Your Display Name
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. Alex, Maria..."
                className="input-field"
                style={{ paddingLeft: '44px' }}
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={!username.trim() || !roomCode.trim() || loading}
            style={{ marginTop: '10px', height: '48px' }}
          >
            {loading ? <Loader2 size={20} className="spinning" style={{ animation: 'spin 1s linear infinite' }} /> : 'Join Room'}
          </button>
        </form>
      </div>
      <style>{`
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Layout>
  );
};

export default JoinRoom;
