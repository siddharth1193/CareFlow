import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquareText,
  Send,
  Bot,
  UserCheck,
  Phone,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  Clock,
  Zap,
  ArrowRight,
  Receipt
} from 'lucide-react';

export const InboxView = () => {
  const {
    conversations,
    patients,
    appointments,
    sendMessageToConversation,
    triggerHumanHandoff,
    returnControlToAI,
    resolveConversation,
    setSelectedPatient,
    setActiveView,
    addToast
  } = useApp();

  const [selectedConvId, setSelectedConvId] = useState(conversations[0]?.id || 'conv-1');
  const [inputText, setInputText] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [activeChannelTab, setActiveChannelTab] = useState('ALL');

  const activeConv = conversations.find((c) => c.id === selectedConvId) || conversations[0];
  const linkedPatient = patients.find((p) => p.id === activeConv?.patientId);
  const patientAppointments = appointments.filter((a) => a.patientId === linkedPatient?.id);

  // Filter conversations
  const filteredConversations = conversations.filter((c) => {
    const matchesStatus = filterStatus === 'ALL' || c.status === filterStatus;
    const matchesChannel = activeChannelTab === 'ALL' || c.channel === activeChannelTab;
    return matchesStatus && matchesChannel;
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;
    sendMessageToConversation(activeConv.id, inputText, 'STAFF', 'Ananya Sharma (Reception)');
    setInputText('');
  };

  const simulatePatientReply = (text) => {
    if (!activeConv) return;
    sendMessageToConversation(activeConv.id, text, 'PATIENT');
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden', background: 'var(--bg-app)' }}>
      {/* LEFT PANEL: Conversations List */}
      <div
        style={{
          width: 320,
          background: 'var(--bg-sidebar)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        {/* Header & Channel Filter */}
        <div style={{ padding: '16px 14px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <MessageSquareText size={18} color="#25D366" />
              <span>Omnichannel Inbox</span>
            </div>
            <span className="badge badge-whatsapp" style={{ fontSize: '0.65rem' }}>
              WHATSAPP 1ST
            </span>
          </div>

          {/* Status Filter Buttons */}
          <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 4 }}>
            {['ALL', 'AI_ACTIVE', 'WAITING_FOR_HUMAN', 'HUMAN_ACTIVE'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`btn btn-sm ${filterStatus === st ? 'btn-primary' : 'btn-ghost'}`}
                style={{ fontSize: '0.7rem', padding: '3px 8px' }}
              >
                {st === 'ALL' ? 'All' : st === 'WAITING_FOR_HUMAN' ? 'Needs Human' : st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation List Items */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filteredConversations.map((conv) => {
            const isSelected = conv.id === selectedConvId;
            return (
              <div
                key={conv.id}
                onClick={() => setSelectedConvId(conv.id)}
                style={{
                  padding: '14px 16px',
                  borderBottom: '1px solid var(--border-color)',
                  background: isSelected ? 'var(--primary-light)' : 'transparent',
                  borderLeft: isSelected ? '4px solid var(--primary)' : '4px solid transparent',
                  cursor: 'pointer',
                  transition: 'background var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.88rem', color: isSelected ? 'var(--primary)' : 'var(--text-main)' }}>
                    {conv.contactName}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                    {new Date(conv.lastMessageAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 6 }}>
                  {conv.lastMessage}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    className={`badge ${
                      conv.status === 'WAITING_FOR_HUMAN'
                        ? 'badge-crimson'
                        : conv.status === 'HUMAN_ACTIVE'
                        ? 'badge-amber'
                        : conv.status === 'AI_ACTIVE'
                        ? 'badge-emerald'
                        : 'badge-muted'
                    }`}
                    style={{ fontSize: '0.62rem' }}
                  >
                    {conv.status === 'WAITING_FOR_HUMAN' ? '⚠️ Human Needed' : conv.status.replace(/_/g, ' ')}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#25D366', fontWeight: 600 }}>WhatsApp</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CENTER PANEL: Active Conversation Thread */}
      {activeConv ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-app)' }}>
          {/* Thread Header with Human Handoff Control Bar */}
          <div
            style={{
              padding: '12px 20px',
              borderBottom: '1px solid var(--border-color)',
              background: 'var(--bg-sidebar)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)' }}>
                  {activeConv.contactName}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {activeConv.contactPhone}
                </span>
                <span
                  className={`badge ${
                    activeConv.status === 'WAITING_FOR_HUMAN'
                      ? 'badge-crimson'
                      : activeConv.status === 'HUMAN_ACTIVE'
                      ? 'badge-amber'
                      : 'badge-emerald'
                  }`}
                >
                  {activeConv.status.replace(/_/g, ' ')}
                </span>
              </div>
            </div>

            {/* Human Handoff Buttons (Requirement 4) */}
            <div style={{ display: 'flex', gap: 8 }}>
              {activeConv.status === 'AI_ACTIVE' || activeConv.status === 'WAITING_FOR_HUMAN' ? (
                <button
                  className="btn btn-amber btn-sm"
                  onClick={() => triggerHumanHandoff(activeConv.id)}
                  style={{ background: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }}
                >
                  <UserCheck size={14} /> Take Over from AI
                </button>
              ) : (
                <button
                  className="btn btn-emerald btn-sm"
                  onClick={() => returnControlToAI(activeConv.id)}
                >
                  <Bot size={14} /> Return Control to AI
                </button>
              )}

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => resolveConversation(activeConv.id)}
              >
                <CheckCircle2 size={14} /> Resolve
              </button>
            </div>
          </div>

          {/* Quick Simulation Bar for Testing AI Receptionist & Guardrails */}
          <div style={{ padding: '8px 20px', background: 'rgba(14,165,233,0.06)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary)' }}>
              ⚡ SIMULATE PATIENT QUERY:
            </span>
            <button
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.72rem', padding: '2px 8px' }}
              onClick={() => simulatePatientReply("What are the consultation fees for Dr. Priya Nair?")}
            >
              Fee Inquiry
            </button>
            <button
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.72rem', padding: '2px 8px' }}
              onClick={() => simulatePatientReply("I want to book an appointment today at 5:30 PM.")}
            >
              Book Slot
            </button>
            <button
              className="btn btn-danger btn-sm"
              style={{ fontSize: '0.72rem', padding: '2px 8px' }}
              onClick={() => simulatePatientReply("Do I have skin cancer? Prescribe me medicine.")}
            >
              Test Clinical Guardrail
            </button>
            <button
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.72rem', padding: '2px 8px' }}
              onClick={() => simulatePatientReply("I want to speak with a human receptionist.")}
            >
              Request Handoff
            </button>
          </div>

          {/* Message Thread Body */}
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {activeConv.messages.map((msg) => {
              const isPatient = msg.sender === 'PATIENT';
              const isAI = msg.sender === 'AI_RECEPTIONIST';
              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isPatient ? 'flex-start' : 'flex-end',
                    maxWidth: '80%',
                    alignSelf: isPatient ? 'flex-start' : 'flex-end'
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--text-dim)',
                      marginBottom: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}
                  >
                    {isAI ? (
                      <span style={{ color: '#34d399', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Bot size={11} /> CareFlow AI Receptionist
                      </span>
                    ) : isPatient ? (
                      <span style={{ fontWeight: 600 }}>{activeConv.contactName}</span>
                    ) : (
                      <span style={{ color: '#38bdf8', fontWeight: 700 }}>
                        {msg.senderName || 'Staff Member'}
                      </span>
                    )}
                    <span>• {new Date(msg.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>

                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      background: isPatient
                        ? 'var(--bg-surface)'
                        : isAI
                        ? 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.15))'
                        : 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(2,132,199,0.2))',
                      border: `1px solid ${isPatient ? 'var(--border-color)' : isAI ? 'rgba(16,185,129,0.35)' : 'rgba(14,165,233,0.35)'}`,
                      color: 'var(--text-main)',
                      fontSize: '0.88rem',
                      lineHeight: 1.5,
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {msg.text}

                    {/* Interactive Action Buttons if present */}
                    {msg.interactiveButtons && (
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                        {msg.interactiveButtons.map((btn, i) => (
                          <span
                            key={i}
                            className="badge badge-emerald"
                            style={{ cursor: 'pointer', fontSize: '0.72rem' }}
                            onClick={() => simulatePatientReply(btn)}
                          >
                            {btn}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Composer */}
          <form onSubmit={handleSendMessage} style={{ padding: '14px 20px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-sidebar)', display: 'flex', gap: 10 }}>
            <input
              type="text"
              className="input-control"
              placeholder={activeConv.status === 'AI_ACTIVE' ? "Type a message (will switch to Human Takeover)..." : "Type a WhatsApp response to patient..."}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" className="btn btn-whatsapp" style={{ padding: '0 20px' }}>
              <Send size={16} /> Send
            </button>
          </form>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
          Select a conversation from the left to start chatting
        </div>
      )}

      {/* RIGHT PANEL: Patient 360 & Quick Actions */}
      <div
        style={{
          width: 320,
          background: 'var(--bg-sidebar)',
          borderLeft: '1px solid var(--border-color)',
          padding: 20,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 16
        }}
      >
        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
          Patient Context 360°
        </div>

        {linkedPatient ? (
          <div>
            <div style={{ padding: 14, borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', marginBottom: 14 }}>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>{linkedPatient.name}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                UHID: <strong style={{ color: 'var(--primary)' }}>{linkedPatient.uhid}</strong> • {linkedPatient.age}y / {linkedPatient.gender}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                Blood Group: <strong>{linkedPatient.bloodGroup}</strong>
              </div>

              {/* Allergies Warning */}
              {linkedPatient.allergies?.length > 0 && (
                <div style={{ marginTop: 8, padding: '6px 8px', borderRadius: 'var(--radius-xs)', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontSize: '0.74rem', fontWeight: 700 }}>
                  ⚠️ Allergy: {linkedPatient.allergies.join(', ')}
                </div>
              )}
            </div>

            {/* Consent Status */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 6 }}>
                Communication Consent
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <span className="badge badge-whatsapp">WhatsApp: Active</span>
                <span className="badge badge-primary">SMS: Active</span>
                <span className="badge badge-emerald">Marketing: Granted</span>
              </div>
            </div>

            {/* Appointments */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 6 }}>
                Linked Appointments ({patientAppointments.length})
              </div>
              {patientAppointments.map((apt) => (
                <div key={apt.id} style={{ padding: 10, borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', marginBottom: 6, fontSize: '0.78rem' }}>
                  <div style={{ fontWeight: 700, color: '#f8fafc' }}>{apt.date} at {apt.time}</div>
                  <div style={{ color: 'var(--text-muted)' }}>{apt.reason} (Fee: ₹{apt.fee})</div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => { setSelectedPatient(linkedPatient); setActiveView('patients'); }}
                style={{ width: '100%' }}
              >
                <UserCheck size={14} /> Open Full EHR 360°
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setActiveView('appointments')}
                style={{ width: '100%' }}
              >
                <Calendar size={14} /> Schedule New Consult
              </button>
            </div>
          </div>
        ) : (
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            This conversation is linked to a prospect lead. Once converted, full medical EHR history will appear here.
          </div>
        )}
      </div>
    </div>
  );
};
