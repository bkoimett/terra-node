import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import DebtDisplay from '../components/calculator/DebtDisplay.jsx';
import DebtChart from '../components/calculator/DebtChart.jsx';
import { useTerraNode } from '../context/TerraNodeContext.jsx';
import { api } from '../api/client.js';
import { GPU_TYPES, COOLING_TYPES } from '../lib/constants.js';

export default function Calculator() {
  const { currentDebt, computeProfile, saveDebtResult } = useTerraNode();
  const [profile, setProfile] = useState(
    computeProfile || {
      gpuType: 'H100',
      gpuCount: 1000,
      uptimeHoursPerDay: 22,
      coolingType: 'liquid',
      facilityLocation: 'Kenya',
    }
  );
  const [result, setResult] = useState(currentDebt);
  const [comparisons, setComparisons] = useState(currentDebt?.comparisons);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCalculate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await api.calculateDebt(profile);
      setResult(data.result);
      setComparisons(data.comparisons);
      saveDebtResult(data.profile, data.result, data.comparisons);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper
      title="AI Compute Debt Calculator"
      subtitle="Quantify the arable land and water footprint of your GPU infrastructure."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <form onSubmit={handleCalculate} className="card space-y-6">
          <div>
            <label className="label">GPU Type</label>
            <select
              className="input-field"
              value={profile.gpuType}
              onChange={(e) => setProfile({ ...profile, gpuType: e.target.value })}
            >
              {GPU_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">GPU Count: {profile.gpuCount.toLocaleString()}</label>
            <input
              type="range"
              min="1"
              max="100000"
              step="1"
              className="w-full accent-accent-green"
              value={profile.gpuCount}
              onChange={(e) =>
                setProfile({ ...profile, gpuCount: Number(e.target.value) })
              }
            />
            <input
              type="number"
              min="1"
              className="input-field mt-2"
              value={profile.gpuCount}
              onChange={(e) =>
                setProfile({ ...profile, gpuCount: Number(e.target.value) || 1 })
              }
            />
          </div>
          <div>
            <label className="label">
              Daily Uptime: {profile.uptimeHoursPerDay} hrs/day
            </label>
            <input
              type="range"
              min="0"
              max="24"
              step="0.5"
              className="w-full accent-accent-green"
              value={profile.uptimeHoursPerDay}
              onChange={(e) =>
                setProfile({ ...profile, uptimeHoursPerDay: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <label className="label">Cooling Type</label>
            <div className="flex gap-2">
              {COOLING_TYPES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setProfile({ ...profile, coolingType: c })}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm capitalize transition ${
                    profile.coolingType === c
                      ? 'border-accent-green bg-accent-green/10 text-accent-green'
                      : 'border-border hover:border-accent-green/50'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Calculating...' : 'Calculate Debt'}
          </button>
        </form>

        <div className="space-y-6">
          {result ? (
            <>
              <DebtDisplay debt={result} comparisons={comparisons} />
              <DebtChart debt={result} />
              <Link to="/corporate" className="btn-primary w-full">
                Offset This Debt
                <ArrowRight className="h-5 w-5" />
              </Link>
            </>
          ) : (
            <div className="card flex h-full min-h-[300px] items-center justify-center text-text-secondary">
              Configure your cluster and calculate to see results.
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
