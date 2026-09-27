import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // IMPORTANTE: Como a API (Render) e o Frontend (Vercel) estão em domínios diferentes,
  // os cookies não são enviados pelo navegador para o Next.js (Middleware).
  // A proteção das rotas foi movida para o Client-Side (React) usando useSession().
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
