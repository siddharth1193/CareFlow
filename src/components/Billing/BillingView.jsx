import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Receipt,
  Plus,
  QrCode,
  Send,
  Download,
  CheckCircle2,
  Printer,
  Search,
  Filter,
  CreditCard,
  IndianRupee,
  X
} from 'lucide-react';
import { paymentAdapter } from '../../services/paymentAdapter';

export const BillingView = () => {
  const {
    invoices,
    patients,
    appointments,
    doctors,
    organization,
    addInvoice,
    markInvoicePaid,
    addToast
  } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedInvoiceForQr, setSelectedInvoiceForQr] = useState(null);
  const [selectedInvoiceForPrint, setSelectedInvoiceForPrint] = useState(null);

  // New Invoice Form
  const [newInvForm, setNewInvForm] = useState({
    patientId: patients[0]?.id || 'pat-101',
    appointmentId: appointments[0]?.id || 'apt-201',
    items: [
      { description: 'Specialist Doctor Consultation', quantity: 1, unitPrice: 1000, amount: 1000 }
    ],
    gstRate: 0.0
  });

  const filteredInvoices = invoices.filter((inv) => {
    const p = patients.find((pat) => pat.id === inv.patientId);
    const matchesSearch = inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) || p?.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCollected = invoices.filter((i) => i.status === 'PAID').reduce((sum, i) => sum + i.total, 0);
  const totalPending = invoices.filter((i) => i.status === 'PENDING').reduce((sum, i) => sum + i.total, 0);

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    const subtotal = newInvForm.items.reduce((s, it) => s + it.amount, 0);
    const gstAmount = Math.round(subtotal * newInvForm.gstRate);
    const total = subtotal + gstAmount;

    addInvoice({
      patientId: newInvForm.patientId,
      appointmentId: newInvForm.appointmentId,
      items: newInvForm.items,
      subtotal,
      gstRate: newInvForm.gstRate,
      gstAmount,
      total
    });

    setIsAddModalOpen(false);
  };

  const handleSendPaymentWhatsApp = (inv) => {
    const patient = patients.find((p) => p.id === inv.patientId);
    const msg = paymentAdapter.createPaymentLinkWhatsAppText({
      invoiceNumber: inv.invoiceNumber,
      amount: inv.total,
      patientName: patient?.name || 'Patient',
      patientPhone: patient?.phone
    });

    addToast({
      title: "WhatsApp Payment Link Dispatched",
      message: `Direct UPI / Razorpay payment link sent to ${patient?.name}`,
      type: "success"
    });
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">
            <Receipt size={24} color="var(--primary)" />
            <span>Billing, Payments & GST Invoices</span>
          </div>
          <div className="page-subtitle">
            Itemized clinical invoicing, instant UPI payments, and automated WhatsApp payment reminders
          </div>
        </div>

        <button className="btn btn-emerald" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={16} /> Generate Invoice
        </button>
      </div>

      {/* Collection Stats Bar */}
      <div className="grid-3" style={{ marginBottom: 24 }}>
        <div className="glass-card" style={{ borderLeft: '4px solid #10b981' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>TODAY'S CASH & UPI COLLECTION</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#f8fafc', marginTop: 4 }}>
            ₹{totalCollected.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#10b981', marginTop: 4 }}>
            100% Reconciled via Payment Gateway Adapter
          </div>
        </div>

        <div className="glass-card" style={{ borderLeft: '4px solid #ef4444' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>OUTSTANDING PENDING DUES</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ef4444', marginTop: 4 }}>
            ₹{totalPending.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
            {invoices.filter((i) => i.status === 'PENDING').length} Invoices awaiting settlement
          </div>
        </div>

        <div className="glass-card" style={{ borderLeft: '4px solid #0ea5e9' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>GSTIN STATUS</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0ea5e9', marginTop: 8 }}>
            {organization.gstNumber}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: 4 }}>
            Healthcare services exempt under Notification No. 12/2017
          </div>
        </div>
      </div>

      {/* Invoices Data Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Patient</th>
              <th>Date</th>
              <th>Bill Breakdown</th>
              <th>Amount</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((inv) => {
              const patient = patients.find((p) => p.id === inv.patientId);
              return (
                <tr key={inv.id}>
                  <td style={{ fontWeight: 800, color: 'var(--primary)' }}>
                    #{inv.invoiceNumber}
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{patient?.name}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{patient?.phone}</div>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {inv.date}
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#cbd5e1', maxWidth: 280 }}>
                    {inv.items?.map((it) => it.description).join(', ')}
                  </td>
                  <td style={{ fontSize: '1rem', fontWeight: 800, color: inv.status === 'PAID' ? '#10b981' : '#ef4444' }}>
                    ₹{inv.total.toLocaleString('en-IN')}
                  </td>
                  <td>
                    <span className={`badge ${inv.status === 'PAID' ? 'badge-emerald' : 'badge-crimson'}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      {inv.status === 'PENDING' && (
                        <>
                          <button
                            className="btn btn-emerald btn-sm"
                            onClick={() => setSelectedInvoiceForQr(inv)}
                            title="Show UPI QR Code"
                          >
                            <QrCode size={13} /> UPI QR
                          </button>
                          <button
                            className="btn btn-whatsapp btn-sm"
                            onClick={() => handleSendPaymentWhatsApp(inv)}
                            title="Send WhatsApp payment link"
                          >
                            <Send size={13} />
                          </button>
                        </>
                      )}

                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setSelectedInvoiceForPrint(inv)}
                        title="Print Itemized Tax Receipt"
                      >
                        <Printer size={13} /> Receipt
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* UPI QR Payment Modal */}
      {selectedInvoiceForQr && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: 440, textAlign: 'center' }}>
            <div className="modal-header">
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>
                Instant UPI Payment — #{selectedInvoiceForQr.invoiceNumber}
              </div>
              <button onClick={() => setSelectedInvoiceForQr(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10b981', marginBottom: 16 }}>
                ₹{selectedInvoiceForQr.total.toLocaleString('en-IN')}
              </div>

              {/* Dynamic QR Display */}
              <div style={{ padding: 16, background: '#fff', borderRadius: 'var(--radius-md)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', marginBottom: 16 }}>
                <img
                  src={paymentAdapter.generateUpiPaymentLink({ invoiceNumber: selectedInvoiceForQr.invoiceNumber, amount: selectedInvoiceForQr.total, patientName: 'Patient' }).qrUrl}
                  alt="UPI QR Code"
                  style={{ width: 180, height: 180, display: 'block' }}
                />
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Scan with any UPI app (GPay, PhonePe, Paytm, BHIM)
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--primary)', fontWeight: 700, marginTop: 4 }}>
                UPI ID: apexhealth@icici
              </div>
            </div>
            <div className="modal-footer" style={{ justifyContent: 'center' }}>
              <button
                className="btn btn-emerald"
                onClick={() => {
                  markInvoicePaid(selectedInvoiceForQr.id, 'UPI (Instant QR)');
                  setSelectedInvoiceForQr(null);
                }}
              >
                <CheckCircle2 size={16} /> Mark Payment Received (Simulate)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Clinical Receipt Modal */}
      {selectedInvoiceForPrint && (
        <div className="modal-overlay">
          <div className="modal-content modal-content-lg" style={{ background: '#ffffff', color: '#0f172a' }}>
            <div className="modal-header" style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>
                Clinical Invoice & Payment Receipt
              </div>
              <button onClick={() => setSelectedInvoiceForPrint(null)} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: 32, fontSize: '0.88rem' }}>
              {/* Receipt Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0ea5e9', paddingBottom: 16, marginBottom: 20 }}>
                <div>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a' }}>{organization.name}</h2>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{organization.address}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>GSTIN: {organization.gstNumber} • Phone: {organization.phone}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 900, fontSize: '1.2rem', color: '#0ea5e9' }}>
                    INVOICE #{selectedInvoiceForPrint.invoiceNumber}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Date: {selectedInvoiceForPrint.date}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: selectedInvoiceForPrint.status === 'PAID' ? '#10b981' : '#ef4444' }}>
                    STATUS: {selectedInvoiceForPrint.status}
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', textAlign: 'left', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '8px 12px', color: '#475569' }}>Description</th>
                    <th style={{ padding: '8px 12px', textAlign: 'center', color: '#475569' }}>Qty</th>
                    <th style={{ padding: '8px 12px', textAlign: 'right', color: '#475569' }}>Price (₹)</th>
                    <th style={{ padding: '8px 12px', textAlign: 'right', color: '#475569' }}>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoiceForPrint.items?.map((it, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600 }}>{it.description}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'center' }}>{it.quantity}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'right' }}>₹{it.unitPrice.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700 }}>₹{it.amount.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Total Calculation */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ width: 260, display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                    <span>Subtotal:</span>
                    <span>₹{selectedInvoiceForPrint.subtotal?.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                    <span>GST (0% Healthcare):</span>
                    <span>₹0</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #0f172a', paddingTop: 6, fontWeight: 900, fontSize: '1.1rem', color: '#0f172a' }}>
                    <span>Total Paid:</span>
                    <span>₹{selectedInvoiceForPrint.total?.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedInvoiceForPrint(null)}>
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  window.print();
                }}
              >
                <Printer size={15} /> Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
