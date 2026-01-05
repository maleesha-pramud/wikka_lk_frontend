import 'server-only'
import { cookies } from 'next/headers'

export async function apiFetch(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const jsessionid = cookieStore.get('JSESSIONID');
  
  const headers = new Headers(options.headers);
  if (jsessionid) {
    headers.set('Cookie', `JSESSIONID=${jsessionid.value}`);
  }
  
  return fetch(url, {
    ...options,
    headers,
  });
}
