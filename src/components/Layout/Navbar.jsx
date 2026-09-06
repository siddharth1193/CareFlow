import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  Search,
  Moon,
  Sun,
  Sparkles,
  Building2,
  ShieldCheck,
  Bell,
  CheckCircle2,
  ExternalLink,
  Zap,
  Globe
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
    growthMetrics,
    tasks
  } = useApp();

  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const pendingTasksCount = tasks.filter((t) => t.status === 'TODO').length;

  return (
    <header
      style={{
        height: 64,
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
      {/* Brand & Landing Link */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div
          onClick={() => setActiveView('dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(14, 165, 233, 0.45)'
            }}
          >
            <Activity size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.03em', color: 'var(--text-main)' }}>
                CareFlow
              </span>
              <span className="badge badge-primary" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                AI GROWTH
              </span>
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              {organization.name.split(' ')[0]} Healthcare OS
            </div>
          </div>
        </div>

        {/* Branch Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--bg-surface)', padding: '5px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          <Building2 size={14} color="var(--primary)" />
          <select
            value={activeBranchId}
            onChange={(e) => setActiveBranchId(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              fontSize: '0.8rem',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
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

      {/* Quick Global Search Bar */}
      <div
        onClick={() => setIsCommandPaletteOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'var(--bg-surface)',
          padding: '7px 16px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-color)',
          cursor: 'pointer',
          width: 320,
          transition: 'var(--transition-fast)'
        }}
        title="Quick Search & Actions"
      >
        <Search size={15} color="var(--text-dim)" />
        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', flex: 1 }}>
          Search patients, leads, actions...
        </span>
        <kbd
          style={{
            fontSize: '0.68rem',
            background: 'var(--bg-surface-elevated)',
            padding: '2px 6px',
            borderRadius: 4,
            border: '1px solid var(--border-color)',
            color: 'var(--text-dim)',
            fontWeight: 700
          }}
        >
          Ctrl K
        </kbd>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Landing Page Button */}
        <button
          className={`btn btn-sm ${activeView === 'landing' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setActiveView(activeView === 'landing' ? 'dashboard' : 'landing')}
          style={{ fontSize: '0.8rem' }}
        >
          <Globe size={14} />
          {activeView === 'landing' ? 'Back to App' : 'Landing Page'}
        </button>

        {/* 14-Step Interactive Sales Demo Launcher */}
        <button
          className="btn btn-emerald btn-sm"
          onClick={startDemoMode}
          style={{ boxShadow: '0 0 14px rgba(16, 185, 129, 0.35)' }}
        >
          <Zap size={14} />
          <span>Interactive Demo</span>
          <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.2)', padding: '1px 5px', borderRadius: 10, marginLeft: 2 }}>
            14 Steps
          </span>
        </button>

        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            style={{ position: 'relative', width: 34, height: 34, padding: 0 }}
          >
            <Bell size={16} />
            {pendingTasksCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: 2,
                  right: 2,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#ef4444'
                }}
              />
            )}
          </button>

          {/* Notification Dropdown */}
          {isNotifOpen && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 42,
                width: 300,
                background: 'var(--bg-card-solid)',
                border: '1px solid var(--border-color-hover)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                padding: 12,
                zIndex: 100
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                <span>Attention Alerts ({pendingTasksCount})</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--primary)', cursor: 'pointer' }} onClick={() => { setActiveView('tasks'); setIsNotifOpen(false); }}>View All</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 220, overflowY: 'auto' }}>
                {tasks.slice(0, 3).map((t) => (
                  <div key={t.id} style={{ fontSize: '0.76rem', padding: 8, borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{t.title}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: 2 }}>Category: {t.category}</div>
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
          style={{ width: 34, height: 34, padding: 0 }}
        >
          {theme === 'dark' ? <Sun size={16} color="#fbbf24" /> : <Moon size={16} color="#6366f1" />}
        </button>

        {/* Role & Persona Switcher */}
        <div style={{ position: 'relative' }}>
          <div
            onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer'
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0ea5e9, #10b981)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 800,
                fontSize: '0.72rem'
              }}
            >
              {currentUser.name.charAt(0)}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, lineHeight: 1.1 }}>
                {currentUser.name.split(' ')[0]}
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: 600 }}>
                {currentUser.role}
              </div>
            </div>
          </div>

          {/* Role Dropdown */}
          {isRoleMenuOpen && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 42,
                width: 240,
                background: 'var(--bg-card-solid)',
                border: '1px solid var(--border-color-hover)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                padding: 8,
                zIndex: 100
              }}
            >
              <div style={{ padding: '6px 10px', fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>
                Switch RBAC Persona
              </div>
              {[
                { role: 'CLINIC_OWNER', label: 'Dr. Arvind Swaminathan', subtitle: 'Clinic Owner / Super Admin' },
                { role: 'DOCTOR', label: 'Dr. Priya Nair', subtitle: 'Senior Dermatologist (EHR/Rx)' },
                { role: 'RECEPTIONIST', label: 'Ananya Sharma', subtitle: 'Front Desk & Omnichannel Lead' },
                { role: 'BILLING_STAFF', label: 'Rohan Mehta', subtitle: 'Invoices, GST & Growth Desk' }
              ].map((item) => (
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
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                  }}
                >
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: currentUser.role === item.role ? 'var(--primary)' : 'var(--text-main)' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
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
