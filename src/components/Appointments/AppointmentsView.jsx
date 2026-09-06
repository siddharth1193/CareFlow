import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  User,
  Video,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Search,
  Filter,
  TrendingUp,
  X,
  Share2
} from 'lucide-react';
import { calendarAdapter } from '../../services/calendarAdapter';

export const AppointmentsView = () => {
  const {
    appointments,
    doctors,
    patients,
    addAppointment,
    updateAppointmentStatus,
    triggerNoShowRecovery,
    recoverNoShowAppointment,
    setTelehealthMeeting,
    setSelectedPatient,
    setActiveView,
    addToast
  } = useApp();

  const [selectedDoctorId, setSelectedDoctorId] = useState('ALL');
  const [selectedDate, setSelectedDate] = useState('2026-09-06');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isSyncingGcal, setIsSyncingGcal] = useState(false);

  const [bookForm, setBookForm] = useState({
    patientId: patients[0]?.id || 'pat-101',
    doctorId: doctors[0]?.id || 'doc-1',
    date: '2026-09-06',
    time: '02:30 PM',
    type: 'IN_PERSON',
    reason: 'Follow-up Consultation',
    fee: 1000
  });

  const filteredAppointments = appointments.filter((a) => {
    const matchesDoc = selectedDoctorId === 'ALL' || a.doctorId === selectedDoctorId;
    const matchesStatus = statusFilter === 'ALL' || a.status === statusFilter;
    return matchesDoc && matchesStatus;
  });

  const handleSyncGoogleCalendar = async () => {
    setIsSyncingGcal(true);
    await calendarAdapter.syncDoctorAvailability('doc-all');
    setIsSyncingGcal(false);
    addToast({
      title: "Google Calendar & Outlook Synced",
      message: "14 Doctor OPD slots & availability refreshed via Calendar Adapter",
      type: "success"
    });
  };

  const handleCreateAppointment = (e) => {
    e.preventDefault();
    addAppointment(bookForm);
    setIsBookModalOpen(false);
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">
            <CalendarIcon size={24} color="var(--primary)" />
            <span>Multi-Doctor Appointments & Calendar Sync</span>
          </div>
          <div className="page-subtitle">
            Real-time OPD scheduling, Google Calendar 2-way sync, and No-Show Recovery automation
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={handleSyncGoogleCalendar}
            disabled={isSyncingGcal}
          >
            <RefreshCw size={14} className={isSyncingGcal ? 'animate-spin' : ''} />
            {isSyncingGcal ? 'Syncing...' : 'Sync Google Calendar'}
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setIsBookModalOpen(true)}>
            <Plus size={16} /> Book Appointment
          </button>
        </div>
      </div>

      {/* Calendar Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <select
            className="input-control"
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            style={{ width: 220 }}
          >
            <option value="ALL">All Doctors & Specialists</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.specialty})
              </option>
            ))}
          </select>

          <select
            className="input-control"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: 170 }}
          >
            <option value="ALL">All Statuses</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="NO_SHOW">NO SHOW</option>
            <option value="RECOVERED">RECOVERED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span className="badge badge-emerald">Google Calendar API: Connected</span>
        </div>
      </div>

      {/* Appointments List / Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 16 }}>
        {filteredAppointments.map((apt) => {
          const patient = patients.find((p) => p.id === apt.patientId);
          const doctor = doctors.find((d) => d.id === apt.doctorId);

          return (
            <div
              key={apt.id}
              className="glass-card"
              style={{
                borderLeft: `4px solid ${
                  apt.status === 'COMPLETED'
                    ? '#10b981'
                    : apt.status === 'RECOVERED'
                    ? '#0ea5e9'
                    : apt.status === 'NO_SHOW'
                    ? '#ef4444'
                    : '#6366f1'
                }`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary)' }}>
                      {apt.time}
                    </span>
                    <span className="badge badge-muted" style={{ fontSize: '0.68rem' }}>
                      {apt.date}
                    </span>
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginTop: 4 }}>
                    {patient?.name || 'Patient'}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    UHID: {patient?.uhid || 'CF-NEW'} • {patient?.phone}
                  </div>
                </div>

                <span
                  className={`badge ${
                    apt.status === 'COMPLETED'
                      ? 'badge-emerald'
                      : apt.status === 'RECOVERED'
                      ? 'badge-primary'
                      : apt.status === 'NO_SHOW'
                      ? 'badge-crimson'
                      : 'badge-indigo'
                  }`}
                >
                  {apt.status}
                </span>
              </div>

              <div style={{ padding: '8px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)', fontSize: '0.8rem', marginBottom: 12 }}>
                <div style={{ fontWeight: 600, color: '#f8fafc' }}>{doctor?.name} ({doctor?.specialty})</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem', marginTop: 2 }}>
                  Reason: {apt.reason} • Fee: ₹{apt.fee}
                </div>
              </div>

              {/* No-Show Recovery Action Box */}
              {apt.status === 'NO_SHOW' && (
                <div style={{ padding: '10px 12px', borderRadius: 'var(--radius-sm)', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', marginBottom: 12 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f87171', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <AlertTriangle size={13} /> Missed Appointment — ₹{apt.fee} Revenue at Risk
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                    <button
                      className="btn btn-emerald btn-sm"
                      onClick={() => triggerNoShowRecovery(apt.id)}
                      style={{ fontSize: '0.72rem', flex: 1 }}
                    >
                      📱 Send WhatsApp Link
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => recoverNoShowAppointment(apt.id)}
                      style={{ fontSize: '0.72rem' }}
                    >
                      ⚡ One-Click Rebook
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid var(--border-color)' }}>
                {apt.type === 'TELEHEALTH' ? (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setTelehealthMeeting(apt)}
                  >
                    <Video size={14} /> Join Video Room
                  </button>
                ) : (
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => { setSelectedPatient(patient); setActiveView('patients'); }}
                  >
                    EHR Dossier
                  </button>
                )}

                <div style={{ display: 'flex', gap: 6 }}>
                  {apt.status === 'CONFIRMED' && (
                    <>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => updateAppointmentStatus(apt.id, 'COMPLETED')}
                        title="Mark consult completed"
                      >
                        <CheckCircle2 size={13} color="#10b981" /> Complete
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => updateAppointmentStatus(apt.id, 'NO_SHOW')}
                        title="Mark patient as No-Show"
                      >
                        No-Show
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Book Appointment Modal */}
      {isBookModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>Schedule New Patient Appointment</div>
              <button onClick={() => setIsBookModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateAppointment}>
              <div className="modal-body">
                <div className="input-group">
                  <label className="input-label">Select Patient</label>
                  <select
                    className="input-control"
                    value={bookForm.patientId}
                    onChange={(e) => setBookForm({ ...bookForm, patientId: e.target.value })}
                  >
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (UHID: {p.uhid}) — {p.phone}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label className="input-label">Select Doctor & Department</label>
                  <select
                    className="input-control"
                    value={bookForm.doctorId}
                    onChange={(e) => {
                      const doc = doctors.find((d) => d.id === e.target.value);
                      setBookForm({ ...bookForm, doctorId: e.target.value, fee: doc?.fee || 1000 });
                    }}
                  >
                    {doctors.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.specialty}) — ₹{d.fee}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid-2">
                  <div className="input-group">
                    <label className="input-label">Date</label>
                    <input
                      type="date"
                      className="input-control"
                      value={bookForm.date}
                      onChange={(e) => setBookForm({ ...bookForm, date: e.target.value })}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Time Slot</label>
                    <input
                      type="text"
                      className="input-control"
                      value={bookForm.time}
                      onChange={(e) => setBookForm({ ...bookForm, time: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="input-group">
                    <label className="input-label">Mode</label>
                    <select
                      className="input-control"
                      value={bookForm.type}
                      onChange={(e) => setBookForm({ ...bookForm, type: e.target.value })}
                    >
                      <option value="IN_PERSON">In-Person Clinic Visit</option>
                      <option value="TELEHEALTH">Telehealth HD Video Consult</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label className="input-label">Consultation Fee (₹)</label>
                    <input
                      type="number"
                      className="input-control"
                      value={bookForm.fee}
                      onChange={(e) => setBookForm({ ...bookForm, fee: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Chief Complaint / Reason for Visit</label>
                  <input
                    type="text"
                    className="input-control"
                    placeholder="e.g. Chest pain follow-up, Routine blood review"
                    value={bookForm.reason}
                    onChange={(e) => setBookForm({ ...bookForm, reason: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setIsBookModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm & Sync Google Calendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
