'use server'

import { cookies } from 'next/headers'
import { apiFetch } from '@/lib/server-utils'

export async function loginUser(email: string, password: string) {
  const baseUrl = process.env.BACKEND_BASE_URL;
  const response = await apiFetch(`${baseUrl}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  // Extract JSESSIONID from response headers
  const setCookieHeader = response.headers.get('set-cookie');
  if (setCookieHeader) {
    const jsessionidMatch = setCookieHeader.match(/JSESSIONID=([^;]+)/);
    if (jsessionidMatch) {
      const jsessionid = jsessionidMatch[1];
      (await cookies()).set('JSESSIONID', jsessionid, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });
    }
  }
  
  const responseData = await response.json();
  if (!responseData.status) {
    throw new Error('Login failed');
  }
  return responseData;
}