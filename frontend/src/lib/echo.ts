import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo<'reverb'>;
  }
}

window.Pusher = Pusher;

console.log('🔍 Reverb Configuration:', {
  key: import.meta.env.VITE_REVERB_APP_KEY,
  host: import.meta.env.VITE_REVERB_HOST,
  port: import.meta.env.VITE_REVERB_PORT,
  scheme: import.meta.env.VITE_REVERB_SCHEME,
});

export const echo = new Echo<'reverb'>({
  broadcaster: 'reverb',
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: import.meta.env.VITE_REVERB_HOST,
  wsPort: Number(import.meta.env.VITE_REVERB_PORT) || 8080,
  wssPort: Number(import.meta.env.VITE_REVERB_PORT) || 8080,
  forceTLS: import.meta.env.VITE_REVERB_SCHEME === 'https',
  enabledTransports: ['ws', 'wss'],
  disableStats: true,
});

// ✅ Type-safe connection debug logs
const connector = echo.connector as any;
if (connector.pusher) {
  connector.pusher.connection.bind('connected', () => {
    console.log('✅ Connected to Reverb');
  });

  connector.pusher.connection.bind('error', (err: any) => {
    console.error('❌ Reverb connection error:', err);
  });

  connector.pusher.connection.bind('disconnected', () => {
    console.warn('⚠️ Disconnected from Reverb');
  });
}

window.Echo = echo;