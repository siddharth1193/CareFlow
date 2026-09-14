import React from 'react';
import { useApp } from '../../context/AppContext';
import { Receipt, CreditCard, CheckCircle2 } from 'lucide-react';

export const PatientBilling = () => {
  const { invoices, addToast } = useApp();
  const patientId = 'pat-101';
  
  const myInvoices = invoices.filter(i => i.patientId === patientId).sort((a, b) => new Date(b.date) - new Date(a.date));
  const pending = myInvoices.filter(i => i.status === 'PENDING');
  const paid = myInvoices.filter(i => i.status === 'PAID');

  const handleDemoPayment = (invoiceId) => {
    addToast({
      title: 'Demo Action',
      message: `Prototype Flow: Payment simulation for invoice ${invoiceId}.`,
      type: 'info'
    });
  };

  const InvoiceCard = ({ inv, isPending }) => (
    <div className="cf-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)' }}>{inv.id}</span>
          <span className={`badge ${isPending ? 'badge-amber' : 'badge-emerald'}`}>
            {inv.status}
          </span>
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 2 }}>
          {new Date(inv.date).toLocaleDateString('en-IN', { weekday: 'short', month: 'long', day: 'numeric' })}
        </div>
        <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
          Consultation with {inv.doctorName}
        </div>
      </div>
      
      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          ₹{inv.amount.toLocaleString('en-IN')}
        </div>
        {isPending ? (
          <button className="btn btn-primary btn-sm" onClick={() => handleDemoPayment(inv.id)}>
            <CreditCard size={14} /> Pay Now
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-success-text)', fontSize: '0.85rem', fontWeight: 600 }}>
            <CheckCircle2 size={14} /> Paid
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="page-wrapper" style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="page-header">
        <div className="page-title"><Receipt size={20} color="var(--primary)" /> Bills & Payments</div>
        <div className="cf-demo-notice" style={{ marginBottom: 0 }}>Sample Patient Data</div>
      </div>

      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: 16, color: 'var(--text-main)' }}>Pending Payments</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {pending.length > 0 ? pending.map(inv => <InvoiceCard key={inv.id} inv={inv} isPending={true} />) : (
            <div className="cf-empty-state"><div className="cf-empty-title">No pending payments</div></div>
          )}
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: 16, color: 'var(--text-main)' }}>Payment History</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {paid.length > 0 ? paid.map(inv => <InvoiceCard key={inv.id} inv={inv} isPending={false} />) : (
            <div className="cf-empty-state"><div className="cf-empty-title">No payment history</div></div>
          )}
        </div>
      </div>
    </div>
  );
};
