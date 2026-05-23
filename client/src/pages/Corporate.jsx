import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import DebtDisplay from '../components/calculator/DebtDisplay.jsx';
import ProjectCard from '../components/projects/ProjectCard.jsx';
import { useTerraNode } from '../context/TerraNodeContext.jsx';
import { api } from '../api/client.js';
import { CREDIT_PACKAGES } from '../lib/constants.js';
import { formatArea, formatCurrency } from '../lib/formatters.js';

export default function Corporate() {
  const { currentDebt, projects, refresh } = useTerraNode();
  const [companyName, setCompanyName] = useState('');
  const [selectedTier, setSelectedTier] = useState('gold');
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [step, setStep] = useState('select');
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState(null);

  const tier = CREDIT_PACKAGES.find((p) => p.id === selectedTier);
  const debt = currentDebt || {
    arableLandDebt: 10000,
    estimatedCost: 85000,
    creditsToPurchase: 100,
  };
  const offsetPercent = tier?.percent || 100;
  const amount = Math.round(debt.estimatedCost * (offsetPercent / 100));
  const area = Math.round(debt.arableLandDebt * (offsetPercent / 100));

  const toggleProject = (id) => {
    setSelectedProjects((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handlePurchase = async () => {
    if (!companyName.trim() || selectedProjects.length === 0) {
      setError('Company name and at least one project required');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await api.corporatePurchase({
        buyerName: companyName,
        amount,
        creditsOrArea: area,
        projectIds: selectedProjects,
        packageTier: selectedTier,
        debtSummary: debt,
      });
      setReceipt(result);
      setStep('done');
      await refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!currentDebt) {
    return (
      <PageWrapper title="Corporate Credit Purchase">
        <div className="card text-center">
          <p className="text-text-secondary">
            Run the calculator first to quantify your compute debt.
          </p>
          <Link to="/calculator" className="btn-primary mt-4 inline-flex">
            Go to Calculator
          </Link>
        </div>
      </PageWrapper>
    );
  }

  if (step === 'done' && receipt) {
    return (
      <PageWrapper title="Purchase Confirmed">
        <div className="card mx-auto max-w-lg border-accent-green/30 text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full border-2 border-accent-green flex items-center justify-center">
            <span className="text-2xl">✓</span>
          </div>
          <h2 className="font-heading text-2xl font-bold">Restoration Certificate</h2>
          <p className="mt-2 text-text-secondary">{companyName}</p>
          <dl className="mt-6 space-y-2 text-left text-sm">
            <div className="flex justify-between">
              <dt>Credits</dt>
              <dd>{receipt.totalCredits}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Area restored</dt>
              <dd>{formatArea(receipt.totalArea)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Total paid</dt>
              <dd>{formatCurrency(receipt.totalAmount)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Package</dt>
              <dd className="capitalize">{selectedTier}</dd>
            </div>
          </dl>
          <Link to="/projects" className="btn-primary mt-6 inline-flex">
            View Projects
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      title="Corporate Credit Purchase"
      subtitle="Offset your compute debt with verified restoration credits."
    >
      <DebtDisplay debt={currentDebt} comparisons={currentDebt.comparisons} />

      <section className="mt-10">
        <h2 className="font-heading text-xl font-semibold">Select Package</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CREDIT_PACKAGES.map((pkg) => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => setSelectedTier(pkg.id)}
              className={`card text-left transition ${
                selectedTier === pkg.id ? 'ring-2 ring-accent-green' : ''
              }`}
            >
              <p className="font-heading font-semibold" style={{ color: pkg.color }}>
                {pkg.label}
              </p>
              <p className="mt-1 text-2xl font-mono">{pkg.percent}%</p>
              <p className="mt-2 text-sm text-text-secondary">
                {formatArea(Math.round(debt.arableLandDebt * (pkg.percent / 100)))}
              </p>
              <p className="text-sm text-accent-green">
                {formatCurrency(Math.round(debt.estimatedCost * (pkg.percent / 100)))}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-xl font-semibold">Allocate to Projects</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard
              key={p._id}
              project={p}
              selectable
              selected={selectedProjects.includes(p._id)}
              onSelect={toggleProject}
            />
          ))}
        </div>
      </section>

      {step === 'select' && (
        <div className="card mt-10 mx-auto max-w-md space-y-4">
          <div>
            <label className="label">Company Name</label>
            <input
              className="input-field"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Acme AI Labs"
            />
          </div>
          <div className="rounded-lg bg-bg-primary p-4 text-sm">
            <div className="flex justify-between">
              <span>Order total</span>
              <span className="font-mono font-semibold">{formatCurrency(amount)}</span>
            </div>
            <div className="mt-1 flex justify-between text-text-secondary">
              <span>Restoration area</span>
              <span>{formatArea(area)}</span>
            </div>
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="button"
            className="btn-primary w-full"
            onClick={() => setStep('payment')}
            disabled={!companyName.trim() || selectedProjects.length === 0}
          >
            Continue to Payment
          </button>
        </div>
      )}

      {step === 'payment' && (
        <div className="card mt-10 mx-auto max-w-md space-y-4">
          <p className="text-sm text-text-secondary">Simulated payment — no real charges</p>
          <input className="input-field" placeholder="Card number 4242 4242 4242 4242" />
          <div className="grid grid-cols-2 gap-4">
            <input className="input-field" placeholder="MM/YY" />
            <input className="input-field" placeholder="CVC" />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="button"
            className="btn-primary w-full"
            disabled={loading}
            onClick={handlePurchase}
          >
            {loading ? 'Processing...' : `Pay ${formatCurrency(amount)}`}
          </button>
        </div>
      )}
    </PageWrapper>
  );
}
