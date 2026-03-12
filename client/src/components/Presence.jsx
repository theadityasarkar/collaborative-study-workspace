import React from 'react';
import { Users, Edit3, Circle } from 'lucide-react';

const Presence = ({ members = [], typingUsers = [] }) => {
  return (
    <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
      
      <div>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
          <Users size={20} /> Room Members ({members.length})
        </h3>
        
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {members.map((member, i) => (
            <li key={i} className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-input)', padding: '10px 14px', borderRadius: '8px' }}>
              <div 
                style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 'bold', fontSize: '0.9rem', color: '#fff'
                }}
              >
                {member.charAt(0).toUpperCase()}
              </div>
              <span style={{ fontWeight: '500' }}>{member}</span>
              <span style={{ marginLeft: 'auto' }}>
                <Circle size={10} fill="var(--success)" color="var(--success)" className="status-dot pulsing" />
              </span>
            </li>
          ))}
          {members.length === 0 && (
            <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.9rem' }}>Nobody is here yet.</div>
          )}
        </ul>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border-light)' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '10px' }}>
          <Edit3 size={16} /> Activity
        </h4>
        <div style={{ minHeight: '30px' }}>
          {typingUsers.length > 0 ? (
            <div className="animate-fade-in" style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div className="typing-indicator" style={{ display: 'flex', gap: '3px' }}>
                <span style={{ width: '4px', height: '4px', background: 'currentColor', borderRadius: '50%', animation: 'pulse 1s infinite' }} />
                <span style={{ width: '4px', height: '4px', background: 'currentColor', borderRadius: '50%', animation: 'pulse 1s infinite 0.2s' }} />
                <span style={{ width: '4px', height: '4px', background: 'currentColor', borderRadius: '50%', animation: 'pulse 1s infinite 0.4s' }} />
              </div>
              {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
            </div>
          ) : (
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No recent activity.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Presence;
