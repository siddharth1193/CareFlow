import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, CheckCircle2 } from 'lucide-react';

export const PatientCareAssistant = () => {
  const [queryInput, setQueryInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'msg-init',
      sender: 'ASSISTANT',
      text: `Hello! I am the CareFlow Care Assistant.\n\nI can help you navigate your patient portal, provide information about your appointments, and help you find clinic services.\n\nHow can I help you today?`,
      timestamp: new Date().toISOString()
    }
  ]);

  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const quickPrompts = [
    "When is my next appointment?",
    "How do I pay my pending bill?",
    "Are my diagnostic reports ready?",
    "How do I request a reschedule?"
  ];

  const processQuery = (q) => {
    const lowerQ = q.toLowerCase();
    
    // Deterministic rule-based responses matching AI honesty guidelines
    if (lowerQ.includes('appointment')) {
      return "You can view and manage your upcoming appointments by clicking on the 'Appointments' tab in the My Care menu. Your next appointment is currently scheduled for tomorrow at 10:00 AM.";
    }
    if (lowerQ.includes('bill') || lowerQ.includes('pay')) {
      return "You can view your pending and paid invoices in the 'Bills & Payments' section under the Financial menu. You currently have one pending invoice for ₹1,200.";
    }
    if (lowerQ.includes('report') || lowerQ.includes('diagnostic')) {
      return "Your recent Comprehensive Lipid Profile results are available. You can view or download them from the 'Diagnostics' section in the My Care menu.";
    }
    if (lowerQ.includes('reschedule') || lowerQ.includes('cancel')) {
      return "To request a reschedule or cancellation, go to the 'Appointments' tab, locate your upcoming appointment, and click the 'Request Reschedule' or 'Cancel' button.";
    }
    
    return "I can help you navigate CareFlow, check your appointment status, or find your medical records. For clinical advice, please consult your doctor during your visit.";
  };

  const handleSendQuery = (textToSend) => {
    const q = textToSend || queryInput;
    if (!q.trim() || isThinking) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'USER',
      text: q,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setQueryInput('');
    setIsThinking(true);

    // Simulate network delay for realistic UX
    setTimeout(() => {
      const answer = processQuery(q);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ASSISTANT',
        text: answer,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsThinking(false);
    }, 800);
  };

  return (
    <div className="page-wrapper" style={{ height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column', padding: 0 }}>
      {/* Header */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-sidebar)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-ai-text)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Bot size={22} /> Patient Care Assistant
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>
            Rule-based navigation and operational assistant.
          </div>
        </div>
        <span className="badge badge-ai">Automated Assistant</span>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', background: 'var(--bg-app)', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
          <CheckCircle2 size={24} color="var(--color-success-text)" />
          <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
            <strong>Safety Note:</strong> This assistant cannot diagnose conditions or prescribe medication. If this is a medical emergency, please call emergency services immediately.
          </div>
        </div>

        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', justifyContent: msg.sender === 'USER' ? 'flex-end' : 'flex-start' }}>
            <div 
              style={{ 
                maxWidth: '75%', 
                padding: '14px 18px', 
                borderRadius: 'var(--radius-md)',
                background: msg.sender === 'USER' ? 'var(--primary)' : 'var(--bg-card)',
                color: msg.sender === 'USER' ? '#fff' : 'var(--text-main)',
                border: msg.sender === 'USER' ? 'none' : '1px solid var(--color-ai-border)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                {msg.sender === 'USER' ? null : <Bot size={14} color="var(--color-ai-text)" />}
                <span style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.8, color: msg.sender === 'USER' ? '#fff' : 'var(--color-ai-text)' }}>
                  {msg.sender === 'USER' ? 'YOU' : 'CARE ASSISTANT'}
                </span>
              </div>
              <div style={{ fontSize: '0.95rem', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isThinking && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ padding: '12px 18px', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid var(--color-ai-border)' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Bot size={14} color="var(--text-dim)" /> Processing...
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: '20px 24px', background: 'var(--bg-sidebar)', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 12 }}>
          {quickPrompts.map((p, i) => (
            <button 
              key={i} 
              className="btn btn-secondary btn-sm" 
              onClick={() => handleSendQuery(p)}
              disabled={isThinking}
              style={{ whiteSpace: 'nowrap' }}
            >
              {p}
            </button>
          ))}
        </div>
        
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSendQuery(); }} 
          style={{ display: 'flex', gap: 12 }}
        >
          <input
            type="text"
            className="input-control"
            placeholder="Ask a question about your care..."
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            disabled={isThinking}
            style={{ flex: 1 }}
          />
          <button 
            type="submit" 
            className="btn btn-ai"
            disabled={!queryInput.trim() || isThinking}
            style={{ padding: '0 20px' }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
