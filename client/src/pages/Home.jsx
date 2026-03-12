import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { PlusCircle, LogIn } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div style={{ 
        maxWidth: '800px', 
        margin: '60px auto', 
        textAlign: 'center',
        padding: '0 20px'
      }}>
        <h1 className="animate-fade-in" style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '24px', background: 'linear-gradient(to right, #fff, var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Study Together,<br/>Anywhere.
        </h1>
        
        <p className="animate-fade-in" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '48px', animationDelay: '0.1s', opacity: 0 }}>
          Real-time collaborative workspaces for students and teams. <br/>Share notes, track presence, and learn in sync.
        </p>

        <div className="animate-fade-in" style={{ 
          display: 'flex', 
          gap: '24px', 
          justifyContent: 'center',
          animationDelay: '0.2s',
          opacity: 0
        }}>
          <button 
            onClick={() => navigate('/create')}
            className="btn btn-primary" 
            style={{ padding: '16px 32px', fontSize: '1.1rem' }}
          >
            <PlusCircle size={20} /> Create New Room
          </button>
          
          <button 
            onClick={() => navigate('/join')}
            className="btn btn-secondary" 
            style={{ padding: '16px 32px', fontSize: '1.1rem', background: 'var(--bg-panel)' }}
          >
            <LogIn size={20} /> Join Existing
          </button>
        </div>

        {/* Feature Cards Showcase */}
        <div className="animate-fade-in" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '24px', 
          marginTop: '80px',
          animationDelay: '0.3s',
          opacity: 0,
          textAlign: 'left'
        }}>
          {[
            { title: "Real-time Sync", desc: "Notes update instantly across all connected students." },
            { title: "Live Presence", desc: "See who is online and track who is currently typing." },
            { title: "No Latency", desc: "Powered by Redis edge technologies." }
          ].map((feature, i) => (
            <div key={i} className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--text-primary)' }}>{feature.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
