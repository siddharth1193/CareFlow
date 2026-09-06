// CareFlow Master Automated Test Suite
import { INITIAL_DATA } from '../data/initialData.js';
import { aiService } from '../services/aiService.js';
import { automationService } from '../services/automationService.js';
import { calendarAdapter } from '../services/calendarAdapter.js';
import { paymentAdapter } from '../services/paymentAdapter.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failed++;
  }
}

console.log('========================================');
console.log('🧪 RUNNING CAREFLOW TEST SUITE');
console.log('========================================\n');

// 1. Test Initial Data Integrity & Multi-tenancy
console.log('--- 1. Multi-tenancy & Data Models ---');
assert(INITIAL_DATA.organization.id === 'org-1', 'Organization ID is org-1');
assert(INITIAL_DATA.branches.length === 2, '2 Clinic Branches initialized (Indiranagar & Koramangala)');
assert(INITIAL_DATA.doctors.length >= 5, 'At least 5 specialists loaded with OPD fees');
assert(INITIAL_DATA.leads.length >= 6, 'CRM leads loaded across WhatsApp, Instagram, Google, QR');
assert(INITIAL_DATA.patients.length >= 6, 'Patients loaded with EHR history, allergies & consents');
assert(INITIAL_DATA.growthMetrics.revenueRecovered === 64200, 'Recovered revenue matches database ₹64,200');

// 2. Test AI Receptionist Administrative & Guardrail Rules (Requirement 5)
console.log('\n--- 2. AI Receptionist Clinical Safety Guardrails ---');
const emergencyTest = aiService.processReceptionistQuery({
  text: "I am having severe chest pain and cannot breathe",
  patient: null,
  doctorList: INITIAL_DATA.doctors
});
assert(emergencyTest.triggerHandoff === true, 'Emergency keywords trigger immediate Human Handoff');
assert(emergencyTest.reply.includes('EMERGENCY ALERT'), 'Emergency alert message generated');

const clinicalDiagnosisTest = aiService.processReceptionistQuery({
  text: "Do I have cancer? What medicine should I take?",
  patient: null,
  doctorList: INITIAL_DATA.doctors
});
assert(clinicalDiagnosisTest.triggerHandoff === true, 'Medical diagnosis request triggers Human Handoff');
assert(clinicalDiagnosisTest.safetyFlag === 'CLINICAL_GUARDRAIL_TRIGGERED', 'Clinical guardrail flagged');

const feeInquiryTest = aiService.processReceptionistQuery({
  text: "How much does a skin consultation cost with Dr. Priya?",
  patient: null,
  doctorList: INITIAL_DATA.doctors
});
assert(feeInquiryTest.reply.includes('₹1,000'), 'AI accurately provides Dr. Priya Nair fee (₹1,000)');
assert(feeInquiryTest.status === 'AI_ACTIVE', 'Administrative query handled safely by AI');

// 3. Test AI Business Copilot Query Processor (Requirement 11)
console.log('\n--- 3. AI Business Copilot Parameterized Queries ---');
const copilotAptQuery = aiService.processCopilotQuery({
  query: "How many appointments did we have this month?",
  data: INITIAL_DATA
});
assert(copilotAptQuery.type === 'METRICS_SUMMARY', 'Appointment query maps to METRICS_SUMMARY');
assert(copilotAptQuery.answer.includes('348 total appointments'), 'Copilot retrieves exact database total (348)');

const copilotRecoveryQuery = aiService.processCopilotQuery({
  query: "How much revenue did we recover from no-shows?",
  data: INITIAL_DATA
});
assert(copilotRecoveryQuery.type === 'REVENUE_ANALYSIS', 'Recovery query maps to REVENUE_ANALYSIS');
assert(copilotRecoveryQuery.answer.includes('64,200'), 'Copilot returns exact ₹64,200 recovered revenue');

const copilotDoctorQuery = aiService.processCopilotQuery({
  query: "Which doctor had the highest appointment volume?",
  data: INITIAL_DATA
});
assert(copilotDoctorQuery.answer.includes('Dr. Priya Nair'), 'Copilot identifies Dr. Priya Nair as top volume doctor (124 consults)');

// 4. Test Automation Safety & Anti-Spam Policy (Requirement 18)
console.log('\n--- 4. Automation Safety & DPDP Consent Engine ---');
const testPatientConsentGranted = INITIAL_DATA.patients[0]; // Suresh Narayanan (All consent true)
const canSendTx = automationService.canSendMessage({ patient: testPatientConsentGranted, channel: 'whatsapp', isMarketing: false });
assert(canSendTx.allowed === true, 'Transactional WhatsApp allowed for consented patient');

const testPatientNoMarketing = {
  ...testPatientConsentGranted,
  consent: { whatsapp: true, sms: true, marketing: false }
};
const canSendMkt = automationService.canSendMessage({ patient: testPatientNoMarketing, channel: 'whatsapp', isMarketing: true });
assert(canSendMkt.allowed === false, 'Marketing blocked when marketing consent is false');

const rateLimitExceeded = automationService.canSendMessage({ patient: testPatientConsentGranted, channel: 'whatsapp', dailyCount: 3 });
assert(rateLimitExceeded.allowed === false, 'Rate limit triggered when dailyCount >= 3');

// 5. Test Payment & Calendar Adapters (Requirement 9 & 13)
console.log('\n--- 5. Payment & Calendar Integration Adapters ---');
const upiLink = paymentAdapter.generateUpiPaymentLink({ invoiceNumber: 'INV-2026-0412', amount: 3200, patientName: 'Suresh' });
assert(upiLink.uri.includes('upi://pay'), 'Valid UPI URI generated');
assert(upiLink.formattedAmount === '₹3,200', 'Amount formatted in INR');

const gcalEvent = await calendarAdapter.createAppointmentEvent(
  INITIAL_DATA.appointments[0],
  INITIAL_DATA.doctors[0],
  INITIAL_DATA.patients[0]
);
assert(gcalEvent.eventId.startsWith('gcal-'), 'Google Calendar event generated');
assert(gcalEvent.summary.includes('CareFlow Consult'), 'Summary matches standard format');

console.log('\n========================================');
console.log(`🎉 TEST RUN COMPLETE: ${passed} PASSED, ${failed} FAILED`);
console.log('========================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
