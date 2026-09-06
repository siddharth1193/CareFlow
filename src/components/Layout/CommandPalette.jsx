import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, UserCheck, Users2, Stethoscope, Zap, TrendingUp, MessageSquareText, Calendar, Receipt, X } from 'lucide-react';

export const CommandPalette = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    setActiveView,
    patients,
    leads,
    doctors,
    setSelectedPatient,
    startDemoMode
  } = useApp();

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) || p.uhid.toLowerCase().includes(query.toLowerCase())
  );

  const filteredLeads = leads.filter((l) =>
    l.name.toLowerCase().includes(query.toLowerCase()) || l.serviceInterested.toLowerCase().includes(query.toLowerCase())
  );

  const filteredDoctors = doctors.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase()) || d.specialty.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectPatient = (p) => {
    setSelectedPatient(p);
    setActiveView('patients');
    setIsCommandPaletteOpen(false);
  };

  const handleSelectLead = () => {
    setActiveView('leads');
    setIsCommandPaletteOpen(false);
  };

  const handleSelectDoctor = () => {
    setActiveView('appointments');
    setIsCommandPaletteOpen(false);
  };

  const handleAction = (viewId) => {
    if (viewId === 'demo') {
      startDemoMode();
    } else {
      setActiveView(viewId);
    }
    setIsCommandPaletteOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsCommandPaletteOpen(false)}>
      <div
        className="modal-content"
        style={{ maxWidth: 620, padding: 0, overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
          <Search size={20} color="var(--primary)" />
          <input
            autoFocus
            type="text"
            className="input-control"
            placeholder="Type a command or search patients, leads, doctors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', padding: 0, fontSize: '1rem' }}
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results Body */}
        <div style={{ maxHeight: 400, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Quick Actions */}
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', padding: '4px 8px' }}>
              Quick Navigation & Automation
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
              <div
                onClick={() => handleAction('demo')}
                style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--emerald-light)', border: '1px solid rgba(16,185,129,0.25)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--emerald)', fontSize: '0.82rem', fontWeight: 700 }}
              >
                <Zap size={15} /> 14-Step Sales Demo
              </div>
              <div
                onClick={() => handleAction('growth')}
                style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--primary-light)', border: '1px solid rgba(14,165,233,0.25)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--primary)', fontSize: '0.82rem', fontWeight: 700 }}
              >
                <TrendingUp size={15} /> Revenue Recovery HUD
              </div>
              <div
                onClick={() => handleAction('inbox')}
                style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--whatsapp-light)', border: '1px solid rgba(37,211,102,0.25)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--whatsapp)', fontSize: '0.82rem', fontWeight: 700 }}
              >
                <MessageSquareText size={15} /> WhatsApp Inbox
              </div>
              <div
                onClick={() => handleAction('ai-copilot')}
                style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--indigo-light)', border: '1px solid rgba(99,102,241,0.25)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--indigo)', fontSize: '0.82rem', fontWeight: 700 }}
              >
                <Zap size={15} /> AI Business Copilot
              </div>
            </div>
          </div>

          {/* Patients */}
          {filteredPatients.length > 0 && (
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', padding: '4px 8px' }}>
                Patients ({filteredPatients.length})
              </div>
              {filteredPatients.slice(0, 3).map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSelectPatient(p)}
                  style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'var(--transition-fast)' }}
                  className="glass-card-interactive"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <UserCheck size={16} color="var(--primary)" />
                    <div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)' }}>{p.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>UHID: {p.uhid} • {p.phone}</div>
                    </div>
                  </div>
                  <span className="badge badge-primary">EHR 360°</span>
                </div>
              ))}
            </div>
          )}

          {/* Leads */}
          {filteredLeads.length > 0 && (
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', padding: '4px 8px' }}>
                Leads & CRM ({filteredLeads.length})
              </div>
              {filteredLeads.slice(0, 3).map((l) => (
                <div
                  key={l.id}
                  onClick={handleSelectLead}
                  style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  className="glass-card-interactive"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Users2 size={16} color="var(--emerald)" />
                    <div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)' }}>{l.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{l.serviceInterested} • via {l.source}</div>
                    </div>
                  </div>
                  <span className="badge badge-emerald">{l.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
