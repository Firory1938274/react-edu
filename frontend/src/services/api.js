const API_URL = 'http://localhost:3001/api';

export async function register(login, password, hourly_rate) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password, hourly_rate }),
  });
  return response.json();
}

export async function login(login, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password }),
  });
  return response.json();
}

export async function getUserSubscriptions(userId) {
  const response = await fetch(`${API_URL}/users/${userId}/subscriptions`);
  return response.json();
}

export async function addSubscription(subscriptionData) {
  const response = await fetch(`${API_URL}/subscriptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscriptionData),
  });
  return response.json();
}

export async function deleteSubscription(id) {
  await fetch(`${API_URL}/subscriptions/${id}`, {
    method: 'DELETE',
  });
}