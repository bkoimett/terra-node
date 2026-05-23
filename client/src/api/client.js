const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Request failed: ${res.status}`);
  }
  return data;
}

export const api = {
  getStats: () => request('/stats'),
  getProjects: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/projects${qs ? `?${qs}` : ''}`);
  },
  getProject: (id) => request(`/projects/${id}`),
  getProjectTransactions: (id) => request(`/projects/${id}/transactions`),
  fundProject: (id, body) =>
    request(`/projects/${id}/fund`, { method: 'POST', body: JSON.stringify(body) }),
  calculateDebt: (profile) =>
    request('/calculator/debt', { method: 'POST', body: JSON.stringify(profile) }),
  corporatePurchase: (body) =>
    request('/transactions/corporate', { method: 'POST', body: JSON.stringify(body) }),
  getTransactions: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/transactions${qs ? `?${qs}` : ''}`);
  },
};
