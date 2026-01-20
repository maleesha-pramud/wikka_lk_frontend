'use server'

import { cookies } from 'next/headers'
import { apiFetch } from '@/lib/server-utils'
import { redirect } from 'next/navigation';

const baseUrl = process.env.BACKEND_BASE_URL;

// Types
type ActionResult<T = unknown> = 
  | { status: true; data: T }
  | { status: false; error: string };

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiRequestOptions {
  method: HttpMethod;
  body?: Record<string, unknown>;
  params?: Record<string, string>;
}

// Response Data Interfaces
interface ApiResponse<T = unknown> {
  status: boolean;
  message?: string;
  data?: T;
}

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

// Generic action handler to reduce code duplication
async function handleAction<T = unknown>(
  endpoint: string,
  options: ApiRequestOptions,
  errorMessage: string,
  shouldSetCookie = false
): Promise<ActionResult<T>> {
  try {
    const url = options.params 
      ? `${baseUrl}${endpoint}?${new URLSearchParams(options.params).toString()}`
      : `${baseUrl}${endpoint}`;

    const fetchOptions: RequestInit = {
      method: options.method,
      ...(options.body && {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options.body),
      }),
    };

    const response = await apiFetch(url, fetchOptions);
    
    await handleRedirection(response);
    
    if (shouldSetCookie) {
      await setCookieHeader(response.headers.get('set-cookie'));
    }

    const responseData: ApiResponse<T> = await response.json();
    
    if (!responseData.status) {
      return { status: false, error: responseData.message || errorMessage };
    }
    
    return { status: true, data: responseData as T };
  } catch (error) {
    return { 
      status: false, 
      error: error instanceof Error ? error.message : 'An unexpected error occurred' 
    };
  }
}

export async function loginUser(email: string, password: string): Promise<ActionResult> {
  return handleAction('/user/login', {
    method: 'POST',
    body: { email, password },
  }, 'Login failed', true);
}

export async function registerUser(
  name: string, 
  email: string, 
  address: string, 
  password: string, 
  accountType: 'buyer' | 'seller'
): Promise<ActionResult> {
  return handleAction('/user', {
    method: 'POST',
    body: { 
      name, 
      email, 
      address, 
      password, 
      accountType: accountType === 'seller' ? 2 : 3 
    },
  }, 'Registration failed', true);
}

export async function logoutUser(): Promise<ActionResult> {
  const result = await handleAction('/user/logout', {
    method: 'GET',
  }, 'Logout failed');
  
  if (result.status) {
    (await cookies()).delete('JSESSIONID');
  }
  
  return result;
}

// Brand Management Actions
export async function getAllBrands(): Promise<ActionResult> {
  return handleAction('/brand', { method: 'GET' }, 'Failed to fetch brands');
}

export async function addBrand(name: string): Promise<ActionResult> {
  return handleAction('/brand', {
    method: 'POST',
    body: { name },
  }, 'Failed to add brand');
}

export async function updateBrand(id: string, name: string): Promise<ActionResult> {
  return handleAction('/brand', {
    method: 'PUT',
    body: { id, name },
  }, 'Failed to update brand');
}

export async function deleteBrand(id: string): Promise<ActionResult> {
  return handleAction('/brand', {
    method: 'DELETE',
    params: { id },
  }, 'Failed to delete brand');
}

// Model Management Actions
export async function getAllModels(): Promise<ActionResult> {
  return handleAction('/model', { method: 'GET' }, 'Failed to fetch models');
}

export async function addModel(name: string, brandId: number): Promise<ActionResult> {
  return handleAction('/model', {
    method: 'POST',
    body: { name, brandId },
  }, 'Failed to add model');
}

export async function updateModel(id: string, name: string, brandId: number): Promise<ActionResult> {
  return handleAction('/model', {
    method: 'PUT',
    body: { id, name, brandId },
  }, 'Failed to update model');
}

export async function deleteModel(id: string): Promise<ActionResult> {
  return handleAction('/model', {
    method: 'DELETE',
    params: { id },
  }, 'Failed to delete model');
}

// Category Management Actions
export async function getAllCategories(): Promise<ActionResult> {
  return handleAction('/category', { method: 'GET' }, 'Failed to fetch categories');
}

export async function addCategory(name: string, icon?: string): Promise<ActionResult> {
  return handleAction('/category', {
    method: 'POST',
    body: { name, icon },
  }, 'Failed to add category');
}

export async function updateCategory(id: string, name: string, icon?: string): Promise<ActionResult> {
  return handleAction('/category', {
    method: 'PUT',
    body: { id, name, icon },
  }, 'Failed to update category');
}

export async function deleteCategory(id: string): Promise<ActionResult> {
  return handleAction('/category', {
    method: 'DELETE',
    params: { id },
  }, 'Failed to delete category');
}