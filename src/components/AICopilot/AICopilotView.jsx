import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bot,
  Sparkles,
  Send,
  TrendingUp,
  Lightbulb,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowRight,
  BarChart3,
  Calendar,
  IndianRupee,
  Users2
} from 'lucide-react';
import { aiService } from '../../services/aiService';

export const AICopilotView = () => {
  const { data, aiInsights, organization } = useApp();

  const [queryInput, setQueryInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'msg-init',
      sender: 'AI_COPILOT',
      text: `Namaste Dr. Arvind! I am your CareFlow AI Business Copilot. I analyze your real clinic database records (appointments, revenue recovery, leads, and staff tasks) to provide accurate business intelligence.\n\nAsk me any operational question or select one of the quick prompts below!`,
      timestamp: new Date().toISOString()
    }
  ]);

  const quickPrompts = [
    "How many appointments did we have this month?",
    "How much revenue did we recover from no-shows?",
    "How many patients need follow-up?",
    "Which doctor had the highest appointment volume?",
    "Show me our total collected vs pending revenue"
  ];

  const handleSendQuery = (textToSend) => {
    const q = textToSend || queryInput;
    if (!q.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'USER',
      text: q,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setQueryInput('');

    setTimeout(() => {
      const result = aiService.processCopilotQuery({ query: q, data });

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'AI_COPILOT',
        text: result.answer,
        stats: result.stats,
        actionRequired: result.actionRequired,
        timestamp: new Date().toISOString()
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 500);
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">
            <Bot size={24} color="var(--indigo)" />
            <span>AI Business Copilot & Growth Intelligence</span>
          </div>
          <div className="page-subtitle">
            Tenant-isolated, parameterized natural-language assistant and proactive clinic insights
          </div>
        </div>

        <span className="badge badge-indigo">
          <ShieldCheck size={12} /> RBAC & Tenant-Isolated Query Engine
        </span>
      </div>

      {/* Main Layout: Proactive Insights (Top) + Interactive Chat (Bottom) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
        {/* LEFT COLUMN: Natural Language Chat Interface */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: 640 }}>
          {/* Chat Header */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
              <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#fff' }}>
                Executive Copilot Session (Org: {organization.name.split(' ')[0]})
              </span>
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Zero Data Leakage Guarantee</span>
          </div>

          {/* Messages Stream */}
          <div style={{ flex: 1, padding: 18, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {messages.map((m) => {
              const isUser = m.sender === 'USER';
              return (
                <div
                  key={m.id}
                  style={{
                    alignSelf: isUser ? 'flex-end' : 'flex-start',
                    maxWidth: '88%'
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: 4 }}>
                    {isUser ? 'You (Clinic Owner)' : 'CareFlow AI Copilot'} • {new Date(m.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </div>

                  <div
                    style={{
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-md)',
                      background: isUser ? 'var(--primary-light)' : 'var(--bg-surface)',
                      border: `1px solid ${isUser ? 'rgba(14,165,233,0.3)' : 'var(--border-color)'}`,
                      color: 'var(--text-main)',
                      fontSize: '0.88rem',
                      lineHeight: 1.5,
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {m.text}

                    {/* Stats Widget inside message if present */}
                    {m.stats && (
                      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${m.stats.length}, 1fr)`, gap: 8, marginTop: 12 }}>
                        {m.stats.map((s, idx) => (
                          <div key={idx} style={{ padding: '8px 10px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)' }}>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{s.label}</div>
                            <div style={{ fontSize: '1rem', fontWeight: 800, color: s.color || 'var(--primary)', marginTop: 2 }}>{s.value}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Prompts Bar */}
          <div style={{ padding: '8px 16px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-surface)', display: 'flex', gap: 6, overflowX: 'auto' }}>
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.72rem', whiteSpace: 'nowrap' }}
                onClick={() => handleSendQuery(p)}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Query Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery();
            }}
            style={{ padding: '12px 16px', background: 'var(--bg-card-solid)', display: 'flex', gap: 10 }}
          >
            <input
              type="text"
              className="input-control"
              placeholder="Ask anything about appointments, doctors, leads, or recovered revenue..."
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0 20px' }}>
              <Send size={15} />
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: AI-Generated Business Insights (Requirement 12) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Lightbulb size={20} color="#fbbf24" />
            <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#fff' }}>
              AI-Generated Proactive Insights
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {aiInsights.map((item) => (
              <div
                key={item.id}
                className="glass-card"
                style={{
                  borderLeft: `4px solid ${item.badgeColor || '#0ea5e9'}`,
                  padding: 18
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <span className="badge" style={{ background: `${item.badgeColor}22`, color: item.badgeColor, border: `1px solid ${item.badgeColor}44`, fontSize: '0.68rem' }}>
                    {item.category} • {item.impact} IMPACT
                  </span>
                </div>

                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#f8fafc', marginBottom: 6 }}>
                  {item.title}
                </div>

                <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: 10 }}>
                  <strong style={{ color: '#cbd5e1' }}>Evidence:</strong> {item.evidence}
                </div>

                <div style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', fontSize: '0.78rem', color: '#38bdf8', display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                  <CheckCircle2 size={14} color="#38bdf8" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span><strong>Suggested Action:</strong> {item.suggestedAction}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
