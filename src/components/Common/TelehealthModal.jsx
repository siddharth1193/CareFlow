import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, FileText, CheckCircle2, Shield, User, Clock } from 'lucide-react';

export const TelehealthModal = () => {
  const { telehealthMeeting, setTelehealthMeeting, addToast, patients, doctors } = useApp();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [notes, setNotes] = useState('');
  const [activeTab, setActiveTab] = useState('notes');

  if (!telehealthMeeting) return null;

  const patient = patients.find((p) => p.id === telehealthMeeting.patientId) || { name: 'Karthik Sundaram', age: 34, uhid: 'CF-2026-00893' };
  const doctor = doctors.find((d) => d.id === telehealthMeeting.doctorId) || { name: 'Dr. Rahul Sharma', specialty: 'Orthopedics' };

  const handleEndCall = () => {
    addToast({
      title: "Teleconsultation Concluded",
      message: `Call with ${patient.name} ended. Notes saved to EHR.`,
      type: "success"
    });
    setTelehealthMeeting(null);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-content-xl" style={{ height: '88vh', background: '#090e17' }}>
        {/* Header */}
        <div className="modal-header" style={{ background: '#0d1527', borderColor: 'rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', animation: 'pulse-ping 1.2s infinite' }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>
                CareFlow HD Teleconsultation — Room #{telehealthMeeting.appointmentNumber || 'APT-2026-0906-05'}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Encrypted WebRTC Session (HIPAA & NDHM Compliant)
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="badge badge-emerald" style={{ padding: '4px 10px' }}>
              <Shield size={12} /> E2E Encrypted
            </span>
            <span style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock size={14} /> 12:45
            </span>
          </div>
        </div>

        {/* Video & Clinical Notes Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', flex: 1, overflow: 'hidden' }}>
          {/* Main Video Stream Simulator */}
          <div style={{ position: 'relative', background: '#050811', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {/* Patient Video Placeholder / Animation */}
            {isVideoOn ? (
              <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80"
                  alt="Patient Video Feed"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.9)' }}
                />
                {/* Patient Name Overlay */}
                <div style={{ position: 'absolute', bottom: 20, left: 20, background: 'rgba(15,23,42,0.85)', padding: '6px 14px', borderRadius: 'var(--radius-sm)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#fff' }}>{patient.name}</div>
                  <div style={{ fontSize: '0.72rem', color: '#38bdf8' }}>UHID: {patient.uhid} • Age: {patient.age}</div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#64748b' }}>
                <User size={64} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
                <div style={{ fontSize: '0.9rem' }}>Camera is Turned Off</div>
              </div>
            )}

            {/* Doctor Self Picture-in-Picture */}
            <div style={{ position: 'absolute', top: 20, right: 20, width: 140, height: 100, borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '2px solid #0ea5e9', boxShadow: '0 8px 20px rgba(0,0,0,0.6)', background: '#0f172a' }}>
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80"
                alt="Doctor Feed"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', bottom: 4, left: 6, fontSize: '0.65rem', color: '#fff', fontWeight: 700, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                You ({doctor.name.split(' ')[1]})
              </div>
            </div>

            {/* Control Bar Overlay */}
            <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(15,23,42,0.9)', padding: '8px 18px', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}>
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                style={{ width: 42, height: 42, borderRadius: '50%', border: 'none', background: isMicOn ? 'rgba(255,255,255,0.1)' : '#ef4444', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' }}
                title={isMicOn ? 'Mute Mic' : 'Unmute Mic'}
              >
                {isMicOn ? <Mic size={18} /> : <MicOff size={18} />}
              </button>

              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                style={{ width: 42, height: 42, borderRadius: '50%', border: 'none', background: isVideoOn ? 'rgba(255,255,255,0.1)' : '#ef4444', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' }}
                title={isVideoOn ? 'Turn Off Camera' : 'Turn On Camera'}
              >
                {isVideoOn ? <Video size={18} /> : <VideoOff size={18} />}
              </button>

              <button
                onClick={handleEndCall}
                style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: '#ef4444', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(239,68,68,0.4)', transition: '0.2s' }}
                title="End Consultation"
              >
                <PhoneOff size={20} />
              </button>
            </div>
          </div>

          {/* Side Clinical EHR & Live SOAP Notes */}
          <div style={{ background: '#0b1324', borderLeft: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 8 }}>
              <button
                className={`btn btn-sm ${activeTab === 'notes' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setActiveTab('notes')}
              >
                <FileText size={14} /> Live SOAP Notes
              </button>
              <button
                className={`btn btn-sm ${activeTab === 'ehr' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setActiveTab('ehr')}
              >
                <User size={14} /> Patient 360°
              </button>
            </div>

            <div style={{ padding: 18, flex: 1, overflowY: 'auto' }}>
              {activeTab === 'notes' ? (
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: 12 }}>
                    Consultation encounter notes will be automatically appended to the patient's digital health record upon call completion.
                  </div>

                  <div className="input-group">
                    <label className="input-label">Chief Complaint & Subjective</label>
                    <textarea
                      className="input-control"
                      value={notes || "Patient reports right knee pain and clicking sensation during stair climbing. MRI reviewed."}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Assessment & Clinical Plan</label>
                    <textarea
                      className="input-control"
                      defaultValue="Grade II Medial Meniscal Tear. Recommended conservative management: Physical therapy (quadriceps strengthening), oral NSAIDs for 5 days, avoid deep squatting. Follow up in 3 weeks."
                      rows={4}
                    />
                  </div>

                  <div style={{ marginTop: 16 }}>
                    <button className="btn btn-emerald btn-sm" style={{ width: '100%' }}>
                      <CheckCircle2 size={14} /> e-Sign & Generate Prescription
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ padding: 12, borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.04)', marginBottom: 14 }}>
                    <div style={{ fontWeight: 700, color: '#fff' }}>{patient.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Phone: {patient.phone}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Allergies: {patient.allergies?.length > 0 ? patient.allergies.join(', ') : 'None Reported'}</div>
                    <div style={{ fontSize: '0.8rem', color: '#38bdf8', marginTop: 4 }}>Condition: Meniscus Tear (Right Knee)</div>
                  </div>

                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', marginBottom: 8 }}>
                    Recent Lab & Radiology Reports:
                  </div>
                  <div style={{ padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid rgba(14,165,233,0.2)', background: 'rgba(14,165,233,0.05)', fontSize: '0.78rem' }}>
                    <div style={{ fontWeight: 700, color: '#38bdf8' }}>MRI Right Knee Joint</div>
                    <div style={{ color: '#cbd5e1', marginTop: 2 }}>Grade II posterior horn tear of medial meniscus.</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
