import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  Search,
  Moon,
  Sun,
  Building2,
  Bell,
  Globe,
  Zap,
  ChevronDown,
  FlaskConical
} from 'lucide-react';

export const Navbar = () => {
  const {
    organization,
    branches,
    activeBranchId,
    setActiveBranchId,
    currentUser,
    setUserRole,
    theme,
    toggleTheme,
    setIsCommandPaletteOpen,
    startDemoMode,
    setActiveView,
    activeView,
    tasks
  } = useApp();

  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen]     = useState(false);

  const pendingTasksCount = tasks.filter((t) => t.status === 'TODO').length;

  const rolePersonas = [
    { role: 'CLINIC_OWNER',  label: 'Dr. Arvind Swaminathan', subtitle: 'Clinic Owner — Executive View' },
    { role: 'DOCTOR',        label: 'Dr. Priya Nair',         subtitle: 'Senior Dermatologist — Doctor View' },
    { role: 'NURSE',         label: 'Sr. Nurse Meera Pillai', subtitle: 'Charge Nurse — Clinical Ops' },
    { role: 'RECEPTIONIST',  label: 'Ananya Sharma',          subtitle: 'Front Desk — Operations View' },
    { role: 'BILLING_STAFF', label: 'Rohan Mehta',            subtitle: 'Billing Manager — Finance View' },
    { role: 'PATIENT',       label: 'Suresh Narayanan',       subtitle: 'Patient Portal View' }
  ];

  return (
    <header
      style={{
        height: 60,
        background: 'var(--bg-sidebar)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'var(--backdrop-blur)'
      }}
    >
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <button
          onClick={() => setActiveView('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none', background: 'transparent', border: 'none', padding: 0, textAlign: 'left', font: 'inherit', color: 'inherit' }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, #2d7dd2, #1e5fa3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Activity size={19} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontWeight: 800, fontSize: '1.08rem', letterSpacing: '-0.03em', color: 'var(--text-main)' }}>
                CareFlow
              </span>
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 500, letterSpacing: '0.02em' }}>
              Healthcare Operations OS
            </div>
          </div>
        </button>

        {/* Branch Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--bg-surface)', padding: '4px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          <Building2 size={13} color="var(--primary)" />
          <select
            value={activeBranchId}
            onChange={(e) => setActiveBranchId(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            {branches.map((b) => (
              <option key={b.id} value={b.id} style={{ background: 'var(--bg-card-solid)', color: 'var(--text-main)' }}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search */}
      <div
        onClick={() => setIsCommandPaletteOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'var(--bg-surface)',
          padding: '6px 14px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-color)',
          cursor: 'pointer',
          width: 300,
          transition: 'border-color var(--transition-fast)'
        }}
        title="Quick Search (Ctrl+K)"
      >
        <Search size={14} color="var(--text-dim)" />
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-dim)', flex: 1 }}>
          Search patients, leads, actions...
        </span>
        <kbd
          style={{
            fontSize: '0.65rem',
            background: 'var(--bg-surface-elevated)',
            padding: '1px 5px',
            borderRadius: 3,
            border: '1px solid var(--border-color)',
            color: 'var(--text-dim)',
            fontWeight: 600
          }}
        >
          Ctrl K
        </kbd>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Landing Page Toggle */}
        <button
          className={`btn btn-sm ${activeView === 'landing' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => {
            if (activeView === 'landing') {
              setActiveView(currentUser?.role === 'PATIENT' ? 'patient-dashboard' : 'dashboard');
            } else {
              setActiveView('landing');
            }
          }}
          style={{ fontSize: 'var(--text-sm)' }}
        >
          <Globe size={13} />
          {activeView === 'landing' ? 'Back to App' : 'Landing'}
        </button>

        {/* Interactive Demo */}
        <button className="btn btn-emerald btn-sm" onClick={startDemoMode}>
          <Zap size={13} />
          <span>Interactive Demo</span>
          <span style={{ fontSize: '0.62rem', background: 'rgba(255,255,255,0.2)', padding: '1px 5px', borderRadius: 8, marginLeft: 2 }}>
            14 Steps
          </span>
        </button>

        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            aria-label="Toggle notifications"
            style={{ position: 'relative', width: 32, height: 32, padding: 0 }}
          >
            <Bell size={15} />
            {pendingTasksCount > 0 && (
              <span
                style={{
                  position: 'absolute', top: 2, right: 2,
                  width: 7, height: 7, borderRadius: '50%',
                  background: 'var(--color-critical-text)'
                }}
              />
            )}
          </button>

          {isNotifOpen && (
            <div
              style={{
                position: 'absolute', right: 0, top: 40,
                width: 290,
                background: 'var(--bg-card-solid)',
                border: '1px solid var(--border-color-hover)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                padding: 12, zIndex: 100
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                <span>Pending Actions ({pendingTasksCount})</span>
                <span
                  style={{ fontSize: 'var(--text-xs)', color: 'var(--primary)', cursor: 'pointer' }}
                  onClick={() => { setActiveView('tasks'); setIsNotifOpen(false); }}
                >
                  View All
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, maxHeight: 200, overflowY: 'auto' }}>
                {tasks.filter(t => t.status === 'TODO').slice(0, 4).map((t) => (
                  <div key={t.id} style={{ fontSize: 'var(--text-xs)', padding: '7px 9px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)', borderLeft: `3px solid ${t.priority === 'HIGH' ? 'var(--color-critical-text)' : 'var(--color-warning-text)'}` }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: 2 }}>{t.title}</div>
                    <div style={{ color: 'var(--text-dim)' }}>Assigned: {t.assignedTo}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          className="btn btn-ghost btn-sm"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={{ width: 32, height: 32, padding: 0 }}
        >
          {theme === 'dark' ? <Sun size={15} color="#f59e0b" /> : <Moon size={15} color="var(--primary)" />}
        </button>

        {/* Demo Persona Switcher */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              color: 'inherit',
              font: 'inherit'
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 24, height: 24, borderRadius: '50%',
                background: 'var(--primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: '0.65rem',
                flexShrink: 0
              }}
            >
              {currentUser.name.charAt(0)}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, lineHeight: 1.2, color: 'var(--text-main)' }}>
                {currentUser.name.split(' ')[0]}
              </div>
              <div style={{ fontSize: '0.62rem', color: 'var(--color-ai-text)', fontWeight: 600 }}>
                Demo Persona
              </div>
            </div>
            <ChevronDown size={12} color="var(--text-dim)" />
          </button>

          {isRoleMenuOpen && (
            <div
              style={{
                position: 'absolute', right: 0, top: 44,
                width: 250,
                background: 'var(--bg-card-solid)',
                border: '1px solid var(--border-color-hover)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                padding: 8, zIndex: 100
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 8px 8px', borderBottom: '1px solid var(--border-color)', marginBottom: 5 }}>
                <FlaskConical size={12} color="var(--color-ai-text)" />
                <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Demo Persona — Dashboard view changes per role
                </span>
              </div>
              {rolePersonas.map((item) => (
                <div
                  key={item.role}
                  onClick={() => {
                    setUserRole(item.role);
                    setIsRoleMenuOpen(false);
                  }}
                  style={{
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    background: currentUser.role === item.role ? 'var(--primary-light)' : 'transparent',
                    cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', gap: 2
                  }}
                >
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: currentUser.role === item.role ? 'var(--primary)' : 'var(--text-main)' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                    {item.subtitle}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
