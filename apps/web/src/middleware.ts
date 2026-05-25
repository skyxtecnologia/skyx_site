import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Rotas protegidas
  const protectedRoutes = ['/dashboard'];

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute) {
    const token = request.cookies.get('auth-token');

    // Se não tem token, redireciona para login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Rotas públicas após login não devem ser acessadas
  if (pathname === '/login' || pathname === '/') {
    const token = request.cookies.get('auth-token');

    // Se tem token, redireciona para dashboard
    if (token && pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
