import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Garante que o .env seja lido da pasta apps/api, 
// independente da pasta onde o usuário rodar o comando no terminal.
dotenv.config({ path: path.resolve(__dirname, '../.env') });
