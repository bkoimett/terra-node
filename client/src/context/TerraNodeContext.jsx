import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../api/client.js';

const TerraNodeContext = createContext(null);

const STORAGE_KEYS = {
  debt: 'terranode-debt',
  profile: 'terranode-profile',
  user: 'terranode-user',
};

export function TerraNodeProvider({ children }) {
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentDebt, setCurrentDebt] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.debt);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [computeProfile, setComputeProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.profile);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.user);
      return saved ? JSON.parse(saved) : { name: '', contributions: [] };
    } catch {
      return { name: '', contributions: [] };
    }
  });

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsData, projectsData] = await Promise.all([
        api.getStats(),
        api.getProjects(),
      ]);
      setStats(statsData);
      setProjects(projectsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (currentDebt) localStorage.setItem(STORAGE_KEYS.debt, JSON.stringify(currentDebt));
  }, [currentDebt]);

  useEffect(() => {
    if (computeProfile)
      localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(computeProfile));
  }, [computeProfile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
  }, [user]);

  const saveDebtResult = (profile, result, comparisons) => {
    setComputeProfile(profile);
    setCurrentDebt({ ...result, comparisons });
  };

  const addUserContribution = (contribution) => {
    setUser((prev) => ({
      ...prev,
      contributions: [contribution, ...prev.contributions],
    }));
  };

  const value = {
    stats,
    projects,
    loading,
    error,
    currentDebt,
    computeProfile,
    user,
    setUser,
    refresh,
    saveDebtResult,
    addUserContribution,
  };

  return (
    <TerraNodeContext.Provider value={value}>{children}</TerraNodeContext.Provider>
  );
}

export function useTerraNode() {
  const ctx = useContext(TerraNodeContext);
  if (!ctx) throw new Error('useTerraNode must be used within TerraNodeProvider');
  return ctx;
}
