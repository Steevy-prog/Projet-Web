import React from 'react';
import '../styles/SocialLoginButtons.css';

interface SocialLoginButtonsProps {
  onGoogleLogin?: () => void;
  onFacebookLogin?: () => void;
  onInstagramLogin?: () => void;
}

export function SocialLoginButtons({ onGoogleLogin, onFacebookLogin, onInstagramLogin }: SocialLoginButtonsProps) {
  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    if (onGoogleLogin) {
      onGoogleLogin();
    }
    // Ici, vous intégrerez l'API Google OAuth
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
    if (onFacebookLogin) {
      onFacebookLogin();
    }
    // Ici, vous intégrerez l'API Facebook Login
  };

  const handleInstagramLogin = () => {
    console.log('Instagram login clicked');
    if (onInstagramLogin) {
      onInstagramLogin();
    }
    // Ici, vous intégrerez l'API Instagram OAuth
  };

  return (
    <div className="social-login-container">
      <div className="social-login-divider">
        <span className="social-login-divider-text">Ou continuer avec</span>
      </div>
      
      <div className="social-login-buttons">
        {/* Bouton Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="social-login-btn google-btn"
          aria-label="Se connecter avec Google"
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            className="social-login-icon"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        </button>

        {/* Bouton Facebook */}
        <button
          type="button"
          onClick={handleFacebookLogin}
          className="social-login-btn facebook-btn"
          aria-label="Se connecter avec Facebook"
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            className="social-login-icon"
          >
            <path
              d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              fill="#1877F2"
            />
          </svg>
        </button>

        {/* Bouton Instagram */}
        <button
          type="button"
          onClick={handleInstagramLogin}
          className="social-login-btn instagram-btn"
          aria-label="Se connecter avec Instagram"
        >
          <svg
            viewBox="0 0 256 256"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            className="social-login-icon"
          >
            <g transform="scale(8,8)">
              <path
                d="M11.46875,5c-3.55078,0 -6.46875,2.91406 -6.46875,6.46875v9.0625c0,3.55078 2.91406,6.46875 6.46875,6.46875h9.0625c3.55078,0 6.46875,-2.91406 6.46875,-6.46875v-9.0625c0,-3.55078 -2.91406,-6.46875 -6.46875,-6.46875zM11.46875,7h9.0625c2.47266,0 4.46875,1.99609 4.46875,4.46875v9.0625c0,2.47266 -1.99609,4.46875 -4.46875,4.46875h-9.0625c-2.47266,0 -4.46875,-1.99609 -4.46875,-4.46875v-9.0625c0,-2.47266 1.99609,-4.46875 4.46875,-4.46875zM21.90625,9.1875c-0.50391,0 -0.90625,0.40234 -0.90625,0.90625c0,0.50391 0.40234,0.90625 0.90625,0.90625c0.50391,0 0.90625,-0.40234 0.90625,-0.90625c0,-0.50391 -0.40234,-0.90625 -0.90625,-0.90625zM16,10c-3.30078,0 -6,2.69922 -6,6c0,3.30078 2.69922,6 6,6c3.30078,0 6,-2.69922 6,-6c0,-3.30078 -2.69922,-6 -6,-6zM16,12c2.22266,0 4,1.77734 4,4c0,2.22266 -1.77734,4 -4,4c-2.22266,0 -4,-1.77734 -4,-4c0,-2.22266 1.77734,-4 4,-4z"
                fill="#E4405F"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}
