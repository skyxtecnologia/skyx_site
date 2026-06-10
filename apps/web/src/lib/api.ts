import axios, { type InternalAxiosRequestConfig } from 'axios';

// A variável NEXT_PUBLIC_API_URL será configurada na Vercel.
// Se não existir, ele assume que você está rodando localmente (ex: porta 3001).
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Garante que os cookies do Better Auth sejam enviados em cross-origin (3000 -> 3001)
});
