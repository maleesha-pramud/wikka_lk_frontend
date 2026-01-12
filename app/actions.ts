'use server'

import { cookies } from 'next/headers'
import { apiFetch } from '@/lib/server-utils'
import { redirect } from 'next/navigation';

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

async function handleRedirection(response: Response) {
  if (response.redirected) {
    redirect(response.url);
  }
}

export async function loginUser(email: string, password: string) {
  const response = await apiFetch(`${baseUrl}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  await handleRedirection(response);
  await setCookieHeader(response.headers.get('set-cookie'));

  const responseData = await response.json();
  if (!responseData.status) {
    throw new Error(responseData.message || 'Login failed');
  }
  return responseData;
}

export async function registerUser(name: string, email: string, address: string, password: string, accountType: 'buyer' | 'seller') {
  const response = await apiFetch(`${baseUrl}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, address, password, accountType: accountType == 'seller' ? 2 : 3 }),
  });

  await handleRedirection(response);
  await setCookieHeader(response.headers.get('set-cookie'));

  const responseData = await response.json();
  if (!responseData.status) {
    throw new Error(responseData.message || 'Registration failed');
  }
  return responseData;
}

export async function logoutUser() {
  const response = await apiFetch(`${baseUrl}/user/logout`, {
    method: 'GET',
  });

  await handleRedirection(response);
  const responseData = await response.json();

  if (!response.status) {
    throw new Error(responseData.message || 'Logout failed');
  } else {
    (await cookies()).delete('JSESSIONID');
  }
  return responseData;
}

// Brand Management Actions
export async function getAllBrands() {
  const response = await apiFetch(`${baseUrl}/brand`, {
    method: 'GET',
  });

  await handleRedirection(response);
  const responseData = await response.json();

  if (!responseData.status) {
    throw new Error(responseData.message || 'Failed to fetch brands');
  }
  return responseData;
}

export async function addBrand(name: string) {
  const response = await apiFetch(`${baseUrl}/brand`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });

  await handleRedirection(response);
  const responseData = await response.json();

  if (!responseData.status) {
    throw new Error(responseData.message || 'Failed to add brand');
  }
  return responseData;
}

export async function updateBrand(id: string, name: string) {
  const response = await apiFetch(`${baseUrl}/brand`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name }),
  });

  await handleRedirection(response);
  const responseData = await response.json();

  if (!responseData.status) {
    throw new Error(responseData.message || 'Failed to update brand');
  }
  return responseData;
}

export async function deleteBrand(id: string) {
  const response = await apiFetch(`${baseUrl}/brand?id=${id}`, {
    method: 'DELETE',
  });

  await handleRedirection(response);
  const responseData = await response.json();

  if (!responseData.status) {
    throw new Error(responseData.message || 'Failed to delete brand');
  }
  return responseData;
}