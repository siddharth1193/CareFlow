import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users2,
  MessageSquareText,
  TrendingUp,
  Bot,
  Calendar,
  UserCheck,
  Stethoscope,
  Pill,
  FileSpreadsheet,
  Receipt,
  ListTodo,
  Workflow,
  Activity,
  RotateCcw,
  ChevronDown,
  ChevronRight
} from 'lucide-react';


const NavItem = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '8px 10px',
        borderRadius: 'var(--radius-sm)',
        background: isActive ? 'var(--primary-light)' : 'transparent',
        border: isActive ? '1px solid var(--primary-border)' : '1px solid transparent',
        color: isActive ? 'var(--primary)' : 'var(--text-muted)',
        cursor: 'pointer',
        fontSize: 'var(--text-sm)',
        fontWeight: isActive ? 700 : 500,
        fontFamily: 'inherit',
        transition: 'all var(--transition-fast)',
        textAlign: 'left'
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'var(--bg-surface)';
          e.currentTarget.style.color = 'var(--text-main)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'var(--text-muted)';
        }
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <Icon size={15} color={isActive ? 'var(--primary)' : 'currentColor'} />
        <span>{item.label}</span>
      </div>
      {item.badge && (
        <span
          className={`badge ${item.badgeColor || 'badge-muted'}`}
          style={{ fontSize: '0.62rem', padding: '1px 5px' }}
        >
          {item.badge}
        </span>
      )}
    </button>
  );
};

export const Sidebar = () => {
  const {
    activeView,
    setActiveView,
    leads,
    conversations,
    appointments,
    tasks,
    resetAllData
  } = useApp();

  const newLeadsCount      = leads.filter((l) => l.status === 'NEW').length;
  const unreadCount        = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);
  const noShowCount        = appointments.filter((a) => a.status === 'NO_SHOW' && !a.isRecovered).length;
  const pendingTasksCount  = tasks.filter((t) => t.status === 'TODO').length;

  const navSections = [
    {
      title: 'PRIMARY WORKFLOWS',
      items: [
        { id: 'dashboard',    label: 'Command Center',      icon: LayoutDashboard },
        { id: 'patients',     label: 'Patients & EHR',      icon: UserCheck },
        { id: 'appointments', label: 'Appointments',        icon: Calendar,
          badge: noShowCount > 0 ? `${noShowCount} no-show` : null, badgeColor: 'badge-amber' },
        { id: 'clinical',     label: 'Clinical Command',    icon: Activity },
        { id: 'growth',       label: 'Revenue & Growth',    icon: TrendingUp },
        { id: 'billing',      label: 'Billing & Invoices',  icon: Receipt },
        { id: 'ai-copilot',   label: 'Operational Copilot', icon: Bot, badge: 'AI', badgeColor: 'badge-ai' }
      ]
    },
    {
      title: 'SECONDARY TOOLS',
      items: [
        { id: 'tasks',        label: 'Attention Queue',   icon: ListTodo,
          badge: pendingTasksCount > 0 ? `${pendingTasksCount}` : null, badgeColor: 'badge-crimson' },
        { id: 'leads',        label: 'Lead CRM',          icon: Users2,
          badge: newLeadsCount > 0 ? `${newLeadsCount} new` : null, badgeColor: 'badge-emerald' },
        { id: 'inbox',        label: 'Omnichannel Inbox', icon: MessageSquareText,
          badge: unreadCount > 0 ? `${unreadCount}` : null, badgeColor: 'badge-whatsapp' },
        { id: 'triage',       label: 'Smart Triage',      icon: Stethoscope },
        { id: 'pharmacy',     label: 'e-Prescriptions',   icon: Pill },
        { id: 'diagnostics',  label: 'Diagnostics',       icon: FileSpreadsheet },
        { id: 'automation',   label: 'Automation',        icon: Workflow }
      ]
    }
  ];

  return (
    <aside
      style={{
        width: 232,
        height: 'calc(100vh - 60px)',
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '14px 10px',
        overflowY: 'auto',
        userSelect: 'none'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {navSections.map((sec) => (
          <div key={sec.title}>
            <div
              style={{
                fontSize: '0.62rem',
                fontWeight: 700,
                color: 'var(--text-dim)',
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                padding: '0 10px 5px'
              }}
            >
              {sec.title}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {sec.items.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isActive={activeView === item.id}
                  onClick={() => setActiveView(item.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div style={{ paddingTop: 12, borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <button
          onClick={resetAllData}
          className="btn btn-ghost btn-sm"
          style={{ width: '100%', justifyContent: 'flex-start', fontSize: 'var(--text-xs)', color: 'var(--text-dim)' }}
          title="Reset demo data to initial state"
        >
          <RotateCcw size={12} />
          <span>Reset Demo Data</span>
        </button>
      </div>
    </aside>
  );
};
