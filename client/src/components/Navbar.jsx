import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, LogOut } from 'lucide-react';

const Navbar = ({ roomCode, user }) => {
  const location = useLocation();
  const isWorkspace = location.pathname.startsWith('/room/');

  return (
    <nav style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '16px 32px', 
      background: 'var(--bg-panel)', 
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-light)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'var(--text-primary)' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', 
          padding: '8px', 
          borderRadius: '10px',
          display: 'flex',
          boxShadow: '0 4px 14px var(--accent-glow)'
        }}>
          <BookOpen size={24} color="#fff" />
        </div>
        <span style={{ fontSize: '1.2rem', fontWeight: '600', letterSpacing: '-0.5px' }}>CollabStudy</span>
      </Link>

      {isWorkspace && roomCode && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Room Code</span>
            <span style={{ fontWeight: '700', letterSpacing: '2px', color: 'var(--accent-secondary)' }}>{roomCode}</span>
          </div>
          
          <div style={{ height: '32px', width: '1px', background: 'var(--border-light)' }}></div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Hello, <strong>{user}</strong></span>
            <Link to="/" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
              <LogOut size={16} /> Leave
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
