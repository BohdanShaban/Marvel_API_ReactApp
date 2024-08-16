import { useState, useCallback } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {

    setLoading(true);

    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const jsonData = await response.json();

      setLoading(false);

      return jsonData

    } catch (e) {
      setLoading(false);
      setError(e.message);
      throw e;
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return { loading, error, makeRequest, clearError }
}