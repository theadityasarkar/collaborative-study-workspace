import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, roomCode, user }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar roomCode={roomCode} user={user} />
      <main style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
