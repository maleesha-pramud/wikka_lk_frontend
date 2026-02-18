'use server'

import { cookies } from 'next/headers'
import { apiFetch } from '@/lib/server-utils'
import { redirect } from 'next/navigation';

const baseUrl = process.env.BACKEND_BASE_URL;

// Types
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
): Promise<ApiResponse<T>> {
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
    
    return responseData;
  } catch (error) {
    return { 
      status: false, 
      message: error instanceof Error ? error.message : 'An unexpected error occurred' 
    };
  }
}

export async function loginUser(email: string, password: string): Promise<ApiResponse> {
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
): Promise<ApiResponse> {
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

export async function logoutUser(): Promise<ApiResponse> {
  const result = await handleAction('/user/logout', {
    method: 'GET',
  }, 'Logout failed');
  
  if (result.status) {
    (await cookies()).delete('JSESSIONID');
  }
  return result;
}

// Brand Management Actions
export async function getAllBrands(): Promise<ApiResponse> {
  return handleAction('/brand', { method: 'GET' }, 'Failed to fetch brands');
}

export async function addBrand(name: string): Promise<ApiResponse> {
  return handleAction('/brand', {
    method: 'POST',
    body: { name },
  }, 'Failed to add brand');
}

export async function updateBrand(id: string, name: string): Promise<ApiResponse> {
  return handleAction('/brand', {
    method: 'PUT',
    body: { id, name },
  }, 'Failed to update brand');
}

export async function deleteBrand(id: string): Promise<ApiResponse> {
  return handleAction('/brand', {
    method: 'DELETE',
    params: { id },
  }, 'Failed to delete brand');
}

// Model Management Actions
export async function getAllModels(): Promise<ApiResponse> {
  return handleAction('/model', { method: 'GET' }, 'Failed to fetch models');
}

export async function getModelsByBrand(brandId: number): Promise<ApiResponse> {
  return handleAction(`/model/brand/${brandId}`, {
    method: 'GET',
  }, 'Failed to fetch models for the selected brand');
}

export async function addModel(name: string, brandId: number): Promise<ApiResponse> {
  return handleAction('/model', {
    method: 'POST',
    body: { name, brandId },
  }, 'Failed to add model');
}

export async function updateModel(id: string, name: string, brandId: number): Promise<ApiResponse> {
  return handleAction('/model', {
    method: 'PUT',
    body: { id, name, brandId },
  }, 'Failed to update model');
}

export async function deleteModel(id: string): Promise<ApiResponse> {
  return handleAction('/model', {
    method: 'DELETE',
    params: { id },
  }, 'Failed to delete model');
}

// Category Management Actions
export async function getAllCategories(): Promise<ApiResponse> {
  return handleAction('/category', { method: 'GET' }, 'Failed to fetch categories');
}

export async function addCategory(name: string, icon?: string): Promise<ApiResponse> {
  return handleAction('/category', {
    method: 'POST',
    body: { name, icon },
  }, 'Failed to add category');
}

export async function updateCategory(id: string, name: string, icon?: string): Promise<ApiResponse> {
  return handleAction('/category', {
    method: 'PUT',
    body: { id, name, icon },
  }, 'Failed to update category');
}

export async function deleteCategory(id: string): Promise<ApiResponse> {
  return handleAction('/category', {
    method: 'DELETE',
    params: { id },
  }, 'Failed to delete category');
}

// Product Management Actions
export async function getAllProducts(): Promise<ApiResponse> {
  return handleAction('/product', { method: 'GET' }, 'Failed to fetch products');
}

export async function addProduct(
  name: string,
  basePrice: number,
  description: string,
  contactNo: string,
  modelId: number,
  conditionId: number,
  categoryId: number,
  sellerId: number,
  statusId: number
): Promise<ApiResponse> {
  return handleAction('/product', {
    method: 'POST',
    body: {
      name,
      basePrice,
      description,
      contactNo,
      modelId,
      conditionId,
      categoryId,
      sellerId,
      statusId
    },
  }, 'Failed to add product');
}

export async function updateProduct(
  id: number,
  name: string,
  basePrice: number,
  description: string,
  contactNo: string,
  modelId: number,
  conditionId: number,
  categoryId: number,
  sellerId: number,
  statusId: number
): Promise<ApiResponse> {
  return handleAction('/product', {
    method: 'PUT',
    body: {
      id,
      name,
      basePrice,
      description,
      contactNo,
      modelId,
      conditionId,
      categoryId,
      sellerId,
      statusId
    },
  }, 'Failed to update product');
}

export async function deleteProduct(id: string): Promise<ApiResponse> {
  return handleAction('/product', {
    method: 'DELETE',
    params: { id },
  }, 'Failed to delete product');
}

// Product Condition Management Actions
export async function getAllConditions(): Promise<ApiResponse> {
  return handleAction('/product-condition', { method: 'GET' }, 'Failed to fetch conditions');
}