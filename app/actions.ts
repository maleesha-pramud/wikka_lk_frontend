'use server'

import { cookies } from 'next/headers'
import { apiFetch } from '@/lib/server-utils'

const baseUrl = process.env.BACKEND_BASE_URL;

async function setCookieHeader(cookieString: string | null) {
  if (cookieString) {
    const jsessionidMatch = cookieString.match(/JSESSIONID=([^;]+)/);
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
}

export async function loginUser(email: string, password: string) {
  const response = await apiFetch(`${baseUrl}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  // Extract JSESSIONID from response headers
  await setCookieHeader(response.headers.get('set-cookie'));

  const responseData = await response.json();
  if (!responseData.status) {
    throw new Error('Login failed');
  }
  return responseData;
}

export async function registerUser(name: string, email: string, address: string, password: string, accountType: 'buyer' | 'seller') {
  const response = await apiFetch(`${baseUrl}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, address, password, accountType: accountType == 'seller' ? 2 : 3 }),
  });

  await setCookieHeader(response.headers.get('set-cookie'));

  const responseData = await response.json();
  if (!responseData.status) {
    throw new Error('Registration failed');
  }
  return responseData;
}