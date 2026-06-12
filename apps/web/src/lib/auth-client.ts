import { createAuthClient } from "better-auth/react";

// Cria e exporta o cliente apontando para a sua API Backend
export const authClient = createAuthClient({
    // O Proxy da Vercel vai redirecionar isso por baixo dos panos para o Render.
    // Usa dinamicamente a origem atual (ex: https://skyxtecnologia.com.br/api/auth)
    baseURL: typeof window !== "undefined" ? `${window.location.origin}/api/auth` : "http://localhost:3000/api/auth",
});