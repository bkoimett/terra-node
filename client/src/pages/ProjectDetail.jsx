import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Users } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import Badge from '../components/shared/Badge.jsx';
import FundingProgress from '../components/projects/FundingProgress.jsx';
import AmountPicker from '../components/funding/AmountPicker.jsx';
import MpesaSim from '../components/funding/MpesaSim.jsx';
import FundingReceipt from '../components/funding/FundingReceipt.jsx';
import ImpactSummary from '../components/funding/ImpactSummary.jsx';
import { api } from '../api/client.js';
import { useTerraNode } from '../context/TerraNodeContext.jsx';
import { formatArea, formatCurrency } from '../lib/formatters.js';
import { CATEGORY_LABELS } from '../lib/constants.js';

export default function ProjectDetail() {
  const { id } = useParams();
  const { user, setUser, addUserContribution, refresh } = useTerraNode();
  const [project, setProject] = useState(null);
  const [amount, setAmount] = useState(25);
  const [step, setStep] = useState('fund');
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getProject(id)
      .then(setProject)
      .catch(() => setProject(null))
      .finally(() => setLoading(false));
  }, [id]);

  const totalContributed = user.contributions.reduce(
    (sum, c) => sum + (c.creditsOrArea || 0),
    0
  );

  const handleMpesaComplete = async () => {
    const name = user.name || 'Anonymous Backer';
    try {
      const { transaction: tx, project: updated } = await api.fundProject(id, {
        amount,
        buyerName: name,
        type: 'micro-fund',
        metadata: { method: 'mpesa-sim' },
      });
      setProject(updated);
      setTransaction(tx);
      addUserContribution(tx);
      setStep('impact');
      await refresh();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="card h-96 animate-pulse bg-bg-tertiary" />
      </PageWrapper>
    );
  }

  if (!project) {
    return (
      <PageWrapper title="Project not found">
        <p className="text-text-secondary">This project may have been removed.</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <img
            src={project.imageUrl}
            alt={project.name}
            className="w-full rounded-xl object-cover aspect-video"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge type={project.category}>
              {CATEGORY_LABELS[project.category]}
            </Badge>
            <Badge variant="status" type={project.status}>
              {project.status}
            </Badge>
          </div>
          <h1 className="mt-4 font-heading text-3xl font-bold">{project.name}</h1>
          <p className="mt-2 flex items-center gap-1 text-text-secondary">
            <MapPin className="h-4 w-4" />
            {project.location.region}, {project.location.country}
          </p>
          <p className="mt-4 text-text-secondary">{project.description}</p>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="card">
              <p className="text-text-secondary">Target area</p>
              <p className="font-mono text-lg">{formatArea(project.targetArea)}</p>
            </div>
            <div className="card">
              <p className="text-text-secondary">Restored</p>
              <p className="font-mono text-lg">{formatArea(project.restoredArea)}</p>
            </div>
            <div className="card">
              <p className="text-text-secondary flex items-center gap-1">
                <Users className="h-4 w-4" /> Backers
              </p>
              <p className="font-mono text-lg">{project.backers}</p>
            </div>
            <div className="card">
              <p className="text-text-secondary">D-MRV Score</p>
              <p className="font-mono text-lg text-accent-green">
                {project.verificationScore ?? '—'}/100
              </p>
            </div>
          </div>
          <div className="mt-6">
            <FundingProgress raised={project.fundingRaised} goal={project.fundingGoal} />
          </div>
        </div>

        <div className="space-y-6">
          {step === 'fund' && (
            <>
              <div className="card">
                <label className="label">Your name (optional)</label>
                <input
                  className="input-field"
                  placeholder="Anonymous Backer"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>
              <div className="card">
                <AmountPicker
                  amount={amount}
                  onChange={setAmount}
                  costPerSqMeter={project.costPerSqMeter}
                />
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <MpesaSim
                disabled={amount < 1}
                onComplete={handleMpesaComplete}
              />
            </>
          )}

          {step === 'impact' && transaction && (
            <>
              <ImpactSummary
                sqm={transaction.creditsOrArea}
                region={project.location.region}
                totalContributed={totalContributed + transaction.creditsOrArea}
              />
              <FundingReceipt
                transaction={transaction}
                project={project}
                onCopy={() =>
                  navigator.clipboard.writeText(
                    `${window.location.origin}/projects/${id}?tx=${transaction._id}`
                  )
                }
              />
            </>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
