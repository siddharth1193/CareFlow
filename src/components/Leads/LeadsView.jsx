import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users2,
  Plus,
  Filter,
  Search,
  MessageSquare,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Share2,
  Phone,
  Camera,
  Globe,
  QrCode,
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';

export const LeadsView = () => {
  const {
    leads,
    doctors,
    addLead,
    updateLeadStatus,
    convertLeadToAppointment,
    setActiveView,
    addToast
  } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sourceFilter, setSourceFilter] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [convertingLead, setConvertingLead] = useState(null);

  // New Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    source: 'WHATSAPP',
    serviceInterested: 'Dermatology & Skin Consult',
    notes: '',
    nextFollowUpAt: ''
  });

  // Convert Modal Form State
  const [convertForm, setConvertForm] = useState({
    doctorId: doctors[0]?.id || 'doc-1',
    date: '2026-09-07',
    time: '11:00 AM',
    fee: 1000,
    type: 'IN_PERSON'
  });

  // Funnel calculations
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'NEW').length;
  const contactedLeads = leads.filter((l) => l.status === 'CONTACTED' || l.status === 'QUALIFIED').length;
  const bookedLeads = leads.filter((l) => l.status === 'APPOINTMENT_BOOKED' || l.status === 'APPOINTMENT_OFFERED').length;
  const convertedLeads = leads.filter((l) => l.status === 'CONVERTED').length;
  const lostLeads = leads.filter((l) => l.status === 'LOST').length;

  const appointmentConversionRate = totalLeads > 0 ? (((bookedLeads + convertedLeads) / totalLeads) * 100).toFixed(1) : 0;
  const patientConversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : 0;

  // Filtered leads
  const filteredLeads = leads.filter((l) => {
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase()) || l.phone.includes(search) || l.serviceInterested.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || l.status === statusFilter;
    const matchesSource = sourceFilter === 'ALL' || l.source === sourceFilter;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.phone) {
      addToast({ title: "Validation Error", message: "Name and phone are required", type: "warning" });
      return;
    }
    addLead(newLeadForm);
    setIsAddModalOpen(false);
    setNewLeadForm({ name: '', phone: '', email: '', source: 'WHATSAPP', serviceInterested: 'General Consult', notes: '', nextFollowUpAt: '' });
  };

  const handleConvertSubmit = (e) => {
    e.preventDefault();
    if (!convertingLead) return;
    convertLeadToAppointment(convertingLead.id, convertForm);
    setConvertingLead(null);
  };

  const getSourceIcon = (source) => {
    switch (source) {
      case 'WHATSAPP': return <MessageSquare size={14} color="#25D366" />;
      case 'INSTAGRAM': return <Camera size={14} color="#ec4899" />;
      case 'WEBSITE': return <Globe size={14} color="#0ea5e9" />;
      case 'QR_CODE': return <QrCode size={14} color="#a855f7" />;
      default: return <Phone size={14} color="#f59e0b" />;
    }
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">
            <Users2 size={24} color="var(--primary)" />
            <span>Patient Acquisition & Lead CRM</span>
          </div>
          <div className="page-subtitle">
            Capture inquiries from WhatsApp, Instagram, Google & Website &rarr; Convert into Booked Patients
          </div>
        </div>

        <button className="btn btn-emerald" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={16} /> Add Inbound Lead
        </button>
      </div>

      {/* Visual Acquisition & Conversion Funnel */}
      <div className="glass-card" style={{ marginBottom: 24 }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 14 }}>
          Lead &rarr; Patient Conversion Funnel
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          {[
            { label: '1. Inbound Leads', count: totalLeads, rate: '100%', color: '#0ea5e9' },
            { label: '2. Contacted / Qual.', count: contactedLeads + bookedLeads + convertedLeads, rate: `${totalLeads ? (((contactedLeads + bookedLeads + convertedLeads)/totalLeads)*100).toFixed(0) : 0}%`, color: '#6366f1' },
            { label: '3. Appointment Offered', count: bookedLeads + convertedLeads, rate: `${appointmentConversionRate}%`, color: '#a855f7' },
            { label: '4. Consult Completed', count: convertedLeads, rate: `${patientConversionRate}%`, color: '#10b981' },
            { label: '5. Converted Patient', count: convertedLeads, rate: 'Active EHR', color: '#38bdf8' }
          ].map((step, idx) => (
            <div
              key={step.label}
              style={{
                padding: '14px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-surface)',
                border: `1px solid var(--border-color)`,
                borderTop: `4px solid ${step.color}`,
                position: 'relative'
              }}
            >
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>{step.label}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: 4, color: '#f8fafc' }}>
                {step.count}
              </div>
              <div style={{ fontSize: '0.7rem', color: step.color, fontWeight: 700, marginTop: 2 }}>
                {step.rate}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters and Controls */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 10, flex: 1, minWidth: 280 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={15} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-dim)' }} />
            <input
              type="text"
              className="input-control"
              placeholder="Search leads by name, phone, service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: 36 }}
            />
          </div>

          <select
            className="input-control"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: 170 }}
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">NEW</option>
            <option value="CONTACTED">CONTACTED</option>
            <option value="QUALIFIED">QUALIFIED</option>
            <option value="APPOINTMENT_OFFERED">APPOINTMENT_OFFERED</option>
            <option value="APPOINTMENT_BOOKED">APPOINTMENT_BOOKED</option>
            <option value="CONVERTED">CONVERTED</option>
            <option value="LOST">LOST</option>
          </select>

          <select
            className="input-control"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            style={{ width: 150 }}
          >
            <option value="ALL">All Sources</option>
            <option value="WHATSAPP">WhatsApp</option>
            <option value="INSTAGRAM">Instagram</option>
            <option value="WEBSITE">Website</option>
            <option value="GOOGLE">Google</option>
            <option value="QR_CODE">QR Code</option>
            <option value="PHONE">Phone</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Lead Name & Contact</th>
              <th>Source</th>
              <th>Service Interested</th>
              <th>Status</th>
              <th>Follow-up Date</th>
              <th>Notes / AI Summary</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id}>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{lead.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lead.phone}</div>
                </td>
                <td>
                  <span className="badge badge-muted" style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                    {getSourceIcon(lead.source)} {lead.source}
                  </span>
                </td>
                <td style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--primary)' }}>
                  {lead.serviceInterested}
                </td>
                <td>
                  <span
                    className={`badge ${
                      lead.status === 'CONVERTED'
                        ? 'badge-emerald'
                        : lead.status === 'APPOINTMENT_BOOKED'
                        ? 'badge-primary'
                        : lead.status === 'NEW'
                        ? 'badge-amber'
                        : lead.status === 'LOST'
                        ? 'badge-crimson'
                        : 'badge-indigo'
                    }`}
                  >
                    {lead.status.replace(/_/g, ' ')}
                  </span>
                </td>
                <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {lead.nextFollowUpAt ? new Date(lead.nextFollowUpAt).toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}
                </td>
                <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: 260 }}>
                  {lead.notes || '—'}
                </td>
                <td style={{ textAlign: 'right' }}>
                  {lead.status !== 'CONVERTED' ? (
                    <button
                      className="btn btn-emerald btn-sm"
                      onClick={() => setConvertingLead(lead)}
                    >
                      <Calendar size={13} /> Convert to Apt
                    </button>
                  ) : (
                    <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                      <CheckCircle2 size={12} /> Patient Registered
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Lead Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>Capture Inbound Patient Lead</div>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateLead}>
              <div className="modal-body">
                <div className="grid-2">
                  <div className="input-group">
                    <label className="input-label">Patient / Lead Name *</label>
                    <input
                      type="text"
                      className="input-control"
                      placeholder="e.g. Vikramaditya Rao"
                      required
                      value={newLeadForm.name}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Phone Number *</label>
                    <input
                      type="tel"
                      className="input-control"
                      placeholder="+91 98450 12345"
                      required
                      value={newLeadForm.phone}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="input-group">
                    <label className="input-label">Inbound Channel / Source</label>
                    <select
                      className="input-control"
                      value={newLeadForm.source}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, source: e.target.value })}
                    >
                      <option value="WHATSAPP">WhatsApp Direct</option>
                      <option value="INSTAGRAM">Instagram DM / Ad</option>
                      <option value="WEBSITE">Website Form</option>
                      <option value="GOOGLE">Google Search / GMB</option>
                      <option value="QR_CODE">Clinic Desk QR</option>
                      <option value="PHONE">Phone Call</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label className="input-label">Service / Specialty Interested</label>
                    <input
                      type="text"
                      className="input-control"
                      placeholder="e.g. Cardiology Annual Checkup"
                      value={newLeadForm.serviceInterested}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, serviceInterested: e.target.value })}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Lead Notes & Inquiries</label>
                  <textarea
                    className="input-control"
                    placeholder="Patient inquired about package pricing and weekend doctor availability..."
                    value={newLeadForm.notes}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-emerald">
                  Save & Capture Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Convert Lead to Appointment Modal */}
      {convertingLead && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>
                Convert Lead &rarr; Book Appointment ({convertingLead.name})
              </div>
              <button onClick={() => setConvertingLead(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleConvertSubmit}>
              <div className="modal-body">
                <div style={{ padding: 12, borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)', marginBottom: 16, fontSize: '0.82rem' }}>
                  <strong>Inquiring:</strong> {convertingLead.serviceInterested} • <strong>Phone:</strong> {convertingLead.phone}
                </div>

                <div className="input-group">
                  <label className="input-label">Select Physician / Specialist</label>
                  <select
                    className="input-control"
                    value={convertForm.doctorId}
                    onChange={(e) => {
                      const doc = doctors.find((d) => d.id === e.target.value);
                      setConvertForm({ ...convertForm, doctorId: e.target.value, fee: doc?.fee || 1000 });
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
                    <label className="input-label">Appointment Date</label>
                    <input
                      type="date"
                      className="input-control"
                      value={convertForm.date}
                      onChange={(e) => setConvertForm({ ...convertForm, date: e.target.value })}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Appointment Time</label>
                    <input
                      type="text"
                      className="input-control"
                      value={convertForm.time}
                      onChange={(e) => setConvertForm({ ...convertForm, time: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="input-group">
                    <label className="input-label">Consultation Mode</label>
                    <select
                      className="input-control"
                      value={convertForm.type}
                      onChange={(e) => setConvertForm({ ...convertForm, type: e.target.value })}
                    >
                      <option value="IN_PERSON">In-Person OPD Visit</option>
                      <option value="TELEHEALTH">Telehealth HD Video Consult</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label className="input-label">Consultation Fee (₹)</label>
                    <input
                      type="number"
                      className="input-control"
                      value={convertForm.fee}
                      onChange={(e) => setConvertForm({ ...convertForm, fee: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setConvertingLead(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-emerald">
                  <CheckCircle2 size={15} /> Confirm & Register Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
