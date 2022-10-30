declare namespace NodeJS {
  export interface ProcessEnv {
    HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DATABASE: string;
    CORS_ORIGIN: string;
    PORT: string;
    JWT_SECRET: string;
    EXPIRES_IN: string;
  }
}
