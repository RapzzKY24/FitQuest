// utils/supabase/proxy.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Ambil data user saat ini
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Ambil path yang sedang diakses user
  const pathname = request.nextUrl.pathname;

  // KONDISI User TIDAK ADA session, tapi mencoba akses protected page (/dashboard)
  if (!user && pathname.startsWith("/dashboard")) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/auth/login";
    return NextResponse.redirect(loginUrl);
  }

  // KONDISI User ADA session, tapi mencoba akses halaman login (/auth/login)
  if (user && pathname.startsWith("/auth/login")) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard"; // Redirect ke /dashboard
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}
