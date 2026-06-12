import axios, { type InternalAxiosRequestConfig } from 'axios';

// Com o Proxy, no navegador usamos rota relativa (string vazia).
// No servidor, usamos o fallback para a URL absoluta para evitar erros no Node.js.
const API_URL = typeof window !== 'undefined' ? '' : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001');

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Garante que os cookies do Better Auth sejam enviados em cross-origin (3000 -> 3001)
});
