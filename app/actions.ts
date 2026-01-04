'use server'
export async function loginUser(email: string, password: string) {
  const baseUrl = process.env.BACKEND_BASE_URL;
  const response = await fetch(`${baseUrl}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const responseData = await response.json();
  if (!responseData.status) {
    throw new Error('Login failed');
  }
  return responseData;
}