import React from 'react';
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
  PlusCircle,
  RefreshCw,
  RotateCcw
} from 'lucide-react';

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

  const newLeadsCount = leads.filter((l) => l.status === 'NEW').length;
  const unreadMessagesCount = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);
  const noShowCount = appointments.filter((a) => a.status === 'NO_SHOW' && !a.isRecovered).length;
  const pendingTasksCount = tasks.filter((t) => t.status === 'TODO').length;

  const navSections = [
    {
      title: "Growth & Acquisition",
      items: [
        { id: 'dashboard', label: 'Executive HUD', icon: LayoutDashboard },
        { id: 'leads', label: 'Lead CRM Funnel', icon: Users2, badge: newLeadsCount > 0 ? `${newLeadsCount} new` : null, badgeColor: 'badge-emerald' },
        { id: 'inbox', label: 'Omnichannel Inbox', icon: MessageSquareText, badge: unreadMessagesCount > 0 ? `${unreadMessagesCount}` : 'AI', badgeColor: 'badge-whatsapp' },
        { id: 'growth', label: 'Revenue Recovery', icon: TrendingUp, badge: '₹64K', badgeColor: 'badge-primary' },
        { id: 'ai-copilot', label: 'AI Business Copilot', icon: Bot, badge: 'Smart', badgeColor: 'badge-indigo' }
      ]
    },
    {
      title: "Clinical Operations",
      items: [
        { id: 'appointments', label: 'Appointments & Sync', icon: Calendar, badge: noShowCount > 0 ? `${noShowCount} no-show` : null, badgeColor: 'badge-amber' },
        { id: 'patients', label: 'Patients & EHR 360°', icon: UserCheck },
        { id: 'triage', label: 'Smart Triage Flow', icon: Stethoscope },
        { id: 'pharmacy', label: 'e-Prescriptions Pad', icon: Pill },
        { id: 'diagnostics', label: 'Diagnostics & Scans', icon: FileSpreadsheet }
      ]
    },
    {
      title: "Finance & Automation",
      items: [
        { id: 'billing', label: 'Billing & GST Invoices', icon: Receipt },
        { id: 'tasks', label: 'Daily Attention Queue', icon: ListTodo, badge: pendingTasksCount > 0 ? `${pendingTasksCount}` : null, badgeColor: 'badge-crimson' },
        { id: 'automation', label: 'Automation & Safety', icon: Workflow }
      ]
    }
  ];

  return (
    <aside
      style={{
        width: 260,
        height: 'calc(100vh - 64px)',
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px 12px',
        overflowY: 'auto',
        userSelect: 'none'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {navSections.map((sec) => (
          <div key={sec.title}>
            <div
              style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                color: 'var(--text-dim)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '0 12px 6px'
              }}
            >
              {sec.title}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: isActive ? 'var(--primary-light)' : 'transparent',
                      border: isActive ? '1px solid rgba(14, 165, 233, 0.25)' : '1px solid transparent',
                      color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                      cursor: 'pointer',
                      fontSize: '0.84rem',
                      fontWeight: isActive ? 700 : 500,
                      fontFamily: 'inherit',
                      transition: 'all var(--transition-fast)'
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Icon size={17} color={isActive ? 'var(--primary)' : 'currentColor'} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`badge ${item.badgeColor || 'badge-primary'}`} style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Quick Reset & Actions */}
      <div style={{ paddingTop: 14, borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button
          onClick={resetAllData}
          className="btn btn-ghost btn-sm"
          style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.74rem', color: 'var(--text-dim)' }}
          title="Reset back to initial fresh dataset"
        >
          <RotateCcw size={13} />
          <span>Reset Demo Data</span>
        </button>
      </div>
    </aside>
  );
};
