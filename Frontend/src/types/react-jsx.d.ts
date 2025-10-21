// Minimal shim to avoid "JSX.IntrinsicElements" and "react/jsx-runtime" missing declaration errors
// Recommended: install proper types with `npm i -D @types/react` in the project.
declare module 'react/jsx-runtime';
declare module 'react';

declare namespace JSX {
  // Allow any intrinsic element (simple shim for this workspace).
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
