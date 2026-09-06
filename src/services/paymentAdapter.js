export const paymentAdapter = {
  activeGateway: 'RAZORPAY_INDIA', // 'RAZORPAY_INDIA' | 'PAYTM' | 'PHONEPE' | 'MOCK'

  generateUpiPaymentLink: ({ invoiceNumber, amount, patientName }) => {
    const vpa = 'apexhealth@icici';
    const payeeName = 'Apex Multispeciality Healthcare';
    const note = `CareFlow Bill ${invoiceNumber} for ${patientName}`;
    const uri = `upi://pay?pa=${vpa}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
    return {
      uri,
      qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(uri)}`,
      formattedAmount: `₹${amount.toLocaleString('en-IN')}`,
      vpa
    };
  },

  createPaymentLinkWhatsAppText: ({ invoiceNumber, amount, patientName, patientPhone }) => {
    return `Namaste ${patientName}! Your invoice #${invoiceNumber} for ₹${amount.toLocaleString('en-IN')} is ready.\n\n💳 Pay securely via UPI / Card / NetBanking:\nhttps://pay.apexhealth.in/inv/${invoiceNumber}\n\nThank you for choosing Apex Healthcare.`;
  }
};
