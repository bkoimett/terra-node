import { useState } from 'react';
import { Smartphone, Loader2 } from 'lucide-react';

export default function MpesaSim({ onComplete, disabled }) {
  const [phone, setPhone] = useState('+254');
  const [step, setStep] = useState('idle');
  const [pin, setPin] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone.match(/^\+254\d{9}$/)) return;

    setStep('stk');
    await delay(1500);
    setStep('pin');
  };

  const handlePin = async (e) => {
    e.preventDefault();
    if (pin.length < 4) return;
    setStep('processing');
    await delay(2500);
    setStep('done');
    onComplete?.();
  };

  if (step === 'done') {
    return (
      <div className="card text-center">
        <p className="font-semibold text-sage">Payment confirmed</p>
        <p className="mt-1 text-sm text-text-secondary">M-Pesa STK push simulated</p>
      </div>
    );
  }

  if (step === 'pin') {
    return (
      <form onSubmit={handlePin} className="card space-y-4">
        <p className="text-sm text-text-secondary">
          Enter your M-Pesa PIN to authorize payment
        </p>
        <input
          type="password"
          maxLength={4}
          className="input-field text-center font-mono text-2xl tracking-widest"
          placeholder="••••"
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
        />
        <button type="submit" className="btn-primary w-full" disabled={pin.length < 4}>
          Confirm
        </button>
      </form>
    );
  }

  if (step === 'stk' || step === 'processing') {
    return (
      <div className="card flex flex-col items-center gap-3 py-8">
        <Loader2 className="h-8 w-8 animate-spin text-sage" />
        <p className="text-sm text-text-secondary">
          {step === 'stk' ? 'Sending STK push...' : 'Processing payment...'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <div className="flex items-center gap-2 text-sage">
        <Smartphone className="h-5 w-5" />
        <span className="font-medium">M-Pesa (Simulated)</span>
      </div>
      <div>
        <label className="label">Phone number</label>
        <input
          type="tel"
          className="input-field font-mono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+254712345678"
        />
        <p className="mt-1 text-xs text-text-muted">Kenyan format: +254 followed by 9 digits</p>
      </div>
      <button
        type="submit"
        className="btn-primary w-full"
        disabled={disabled || !phone.match(/^\+254\d{9}$/)}
      >
        Pay with M-Pesa
      </button>
    </form>
  );
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
