/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_OTHER_VAR?: string
  // añade más si usas otras variables
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
