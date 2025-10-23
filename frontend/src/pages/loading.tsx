// Loading.tsx
import React from 'react';
import Waves from '../components/Waves';

const Loading = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Waves
        lineColor="rgba(217, 192, 3, 0.9)"
        backgroundColor="rgba(0,0,0,0.06)"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={36}
      />

      <div style={styles.container}>
        <div style={styles.logo}>ZEDUC</div>
        <div style={styles.spinner}></div>
        <p style={styles.text}>Chargement en cours...</p>
      </div>
    </div>
  );
};

// Styles en ligne
const styles: any = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    gap: 16,
    position: 'relative',
    zIndex: 2,
    color: 'var(--color-primary, #030213)'
  },
  logo: {
    fontWeight: 700,
    fontSize: 28,
    letterSpacing: 4,
    color: 'var(--sidebar-primary, #030213)'
  },
  spinner: {
    border: '6px solid rgba(255,255,255,0.08)',
    borderTop: '6px solid rgba(124,58,237,0.9)',
    borderRadius: '50%',
    width: '48px',
    height: '48px',
    animation: 'loading-spin 1s linear infinite',
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    color: 'rgba(3,2,19,0.7)'
  }
};

export default Loading;

// Add keyframes globally if not already present in project CSS
const styleEl = document.createElement('style');
styleEl.innerHTML = `
@keyframes loading-spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }
`;
document.head.appendChild(styleEl);