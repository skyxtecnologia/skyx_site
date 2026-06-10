import { createAuthClient } from "better-auth/react";

// Cria e exporta o cliente apontando para a sua API Backend
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});