import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div
      id="get-started-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        id="get-started-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-md w-full border border-tv-border shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-150 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-tv-muted hover:text-tv-text hover:bg-tv-pillBg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-tv-green-light rounded-full mx-auto flex items-center justify-center text-tv-green">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-tv-text">Welcome to TradingView!</h3>
            <p className="text-sm text-tv-muted leading-relaxed">
              We have sent a verification link to <span className="font-semibold text-tv-text">{email}</span>. You now have full access to live streaming quotes, charts, and screeners.
            </p>
            <button
              onClick={onClose}
              className="w-full mt-4 py-2.5 bg-tv-text text-white font-semibold rounded-xl hover:bg-black transition-colors cursor-pointer"
            >
              Continue to Markets
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* TV Glyph logo */}
            <div className="flex items-center gap-2 text-tv-text">
              <svg
                className="w-8 h-6 fill-current"
                viewBox="0 0 36 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.5 0H0V28H5.5V0Z" />
                <path d="M16 0H10.5V28H16V0Z" />
                <path d="M26.5 0H21V19H26.5V0Z" />
                <path d="M36 9H30.5V28H36V9Z" />
              </svg>
              <span className="font-extrabold text-lg tracking-tight">TradingView</span>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-tv-text">
                Start your market journey
              </h2>
              <p className="text-sm text-tv-muted mt-1">
                Join over 60M+ traders and investors charting the global financial world.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs text-tv-text font-medium">
                <Zap className="w-4 h-4 text-tv-blue flex-shrink-0" />
                <span>Real-time quotes across stocks, crypto, forex, and bonds</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-tv-text font-medium">
                <ShieldCheck className="w-4 h-4 text-tv-green flex-shrink-0" />
                <span>Custom alerts, customizable pine scripts, and indicators</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-tv-muted uppercase mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-tv-border focus:border-tv-blue focus:outline-none text-sm text-tv-text font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 tv-btn-gradient text-white font-semibold rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer text-sm"
              >
                Sign up with email
              </button>
            </form>

            <p className="text-[11px] text-center text-tv-muted">
              By continuing, you agree to TradingView's Terms of Use and Privacy Policy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
