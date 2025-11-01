interface ImportMetaEnv {
  readonly VITE_REVERB_APP_KEY: string;
  readonly VITE_REVERB_APP_SECRET: string;
  readonly VITE_REVERB_HOST: string;
  readonly VITE_REVERB_PORT: string;
  readonly VITE_REVERB_SCHEME: string;
  readonly VITE_API_URL:string;
  readonly VITE_URL:string;
  // add any other VITE_ env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}