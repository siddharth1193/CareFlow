import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ListTodo,
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MessageSquare,
  Phone,
  Search,
  Filter,
  UserCheck,
  X
} from 'lucide-react';

export const TasksView = () => {
  const { tasks, addTask, updateTaskStatus, triggerNoShowRecovery, setActiveView, addToast } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newTaskForm, setNewTaskForm] = useState({
    title: '',
    category: 'LEAD_FOLLOWUP',
    priority: 'HIGH',
    assignedTo: 'Ananya Sharma (Reception)',
    dueDate: new Date().toISOString().split('T')[0]
  });

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskForm.title) return;
    addTask(newTaskForm);
    setIsAddModalOpen(false);
    setNewTaskForm({ title: '', category: 'LEAD_FOLLOWUP', priority: 'HIGH', assignedTo: 'Ananya Sharma (Reception)', dueDate: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">
            <ListTodo size={24} color="var(--primary)" />
            <span>Staff Task Management & Attention Queue</span>
          </div>
          <div className="page-subtitle">
            Auto-generated receptionist workflows: missed appointments, cold leads, and overdue follow-ups
          </div>
        </div>

        <button className="btn btn-emerald" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={16} /> Add Staff Task
        </button>
      </div>

      {/* Task Controls */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 10, flex: 1, minWidth: 260 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: 11, color: 'var(--text-dim)' }} />
            <input
              type="text"
              className="input-control"
              placeholder="Search staff tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: 32, fontSize: '0.82rem' }}
            />
          </div>

          <select
            className="input-control"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: 160 }}
          >
            <option value="ALL">All Task Statuses</option>
            <option value="TODO">TODO (Pending)</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredTasks.length}</strong> tasks
        </div>
      </div>

      {/* Tasks Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filteredTasks.map((t) => (
          <div
            key={t.id}
            className="glass-card"
            style={{
              padding: 16,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderLeft: `4px solid ${t.priority === 'HIGH' ? '#ef4444' : t.priority === 'MEDIUM' ? '#f59e0b' : '#0ea5e9'}`
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span className={`badge ${t.priority === 'HIGH' ? 'badge-crimson' : 'badge-amber'}`}>
                  {t.priority}
                </span>
                <span className="badge badge-muted">
                  {t.category.replace(/_/g, ' ')}
                </span>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                  Assigned: <strong style={{ color: '#cbd5e1' }}>{t.assignedTo}</strong>
                </span>
              </div>

              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: t.status === 'COMPLETED' ? 'var(--text-dim)' : 'var(--text-main)', textDecoration: t.status === 'COMPLETED' ? 'line-through' : 'none' }}>
                {t.title}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {t.category === 'NO_SHOW_RECOVERY' && t.status !== 'COMPLETED' && (
                <button
                  className="btn btn-emerald btn-sm"
                  onClick={() => triggerNoShowRecovery(t.relatedAppointmentId)}
                >
                  <MessageSquare size={13} /> WhatsApp Recovery
                </button>
              )}

              {t.category === 'LEAD_FOLLOWUP' && t.status !== 'COMPLETED' && (
                <button
                  className="btn btn-whatsapp btn-sm"
                  onClick={() => setActiveView('inbox')}
                >
                  <MessageSquare size={13} /> Open Inbox
                </button>
              )}

              {t.status !== 'COMPLETED' ? (
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => updateTaskStatus(t.id, 'COMPLETED')}
                >
                  <CheckCircle2 size={14} color="#10b981" /> Mark Done
                </button>
              ) : (
                <span className="badge badge-emerald">
                  <CheckCircle2 size={12} /> Completed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>Create Receptionist Task</div>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateTask}>
              <div className="modal-body">
                <div className="input-group">
                  <label className="input-label">Task Title / Action Item *</label>
                  <input
                    type="text"
                    className="input-control"
                    placeholder="e.g. Call patient to confirm insurance pre-auth"
                    required
                    value={newTaskForm.title}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, title: e.target.value })}
                  />
                </div>

                <div className="grid-2">
                  <div className="input-group">
                    <label className="input-label">Category</label>
                    <select
                      className="input-control"
                      value={newTaskForm.category}
                      onChange={(e) => setNewTaskForm({ ...newTaskForm, category: e.target.value })}
                    >
                      <option value="LEAD_FOLLOWUP">Lead Follow-up</option>
                      <option value="NO_SHOW_RECOVERY">No-Show Recovery</option>
                      <option value="REPORT_DELIVERY">Report Delivery</option>
                      <option value="PAYMENT_VERIFICATION">Payment Verification</option>
                      <option value="PATIENT_REACTIVATION">Patient Reactivation</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label className="input-label">Priority</label>
                    <select
                      className="input-control"
                      value={newTaskForm.priority}
                      onChange={(e) => setNewTaskForm({ ...newTaskForm, priority: e.target.value })}
                    >
                      <option value="HIGH">HIGH (Urgent)</option>
                      <option value="MEDIUM">MEDIUM</option>
                      <option value="LOW">LOW</option>
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Assigned Staff Persona</label>
                  <input
                    type="text"
                    className="input-control"
                    value={newTaskForm.assignedTo}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, assignedTo: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-emerald">
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
