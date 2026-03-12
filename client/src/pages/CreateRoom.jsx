import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { createRoom } from '../services/api';
import { User, Loader2 } from 'lucide-react';

const CreateRoom = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const data = await createRoom();
      const roomCode = data.room?.roomCode;
      
      if (roomCode) {
        // Pass username via router state
        navigate(`/room/${roomCode}`, { state: { user: username } });
      } else {
        setError('Failed to retrieve room code.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating workspace.');
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
        <h2 style={{ fontSize: '1.8rem', marginBottom: '8px', textAlign: 'center' }}>Create Workspace</h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '32px' }}>
          Set up a new collaborative room instance.
        </p>

        {error && (
          <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                autoFocus
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={!username.trim() || loading}
            style={{ marginTop: '10px', height: '48px' }}
          >
            {loading ? <Loader2 size={20} className="spinning" style={{ animation: 'spin 1s linear infinite' }} /> : 'Initialize Room'}
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

export default CreateRoom;
