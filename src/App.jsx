import React, { Suspense } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Layout/Navbar';
import { Sidebar } from './components/Layout/Sidebar';
import { CommandPalette } from './components/Layout/CommandPalette';
import { ToastContainer } from './components/Common/ToastContainer';
import { TelehealthModal } from './components/Common/TelehealthModal';
import { InteractiveDemoModal } from './components/Demo/InteractiveDemoModal';

// Keep Eager (Initial Payload)
import { LandingPage } from './components/Landing/LandingPage';
import { DashboardView } from './components/Dashboard/DashboardView';
import { PatientDashboard } from './components/Patient/PatientDashboard';

// Lazy Load (Deferred)
const LeadsView = React.lazy(() => import('./components/Leads/LeadsView').then(m => ({ default: m.LeadsView })));
const InboxView = React.lazy(() => import('./components/Inbox/InboxView').then(m => ({ default: m.InboxView })));
const AppointmentsView = React.lazy(() => import('./components/Appointments/AppointmentsView').then(m => ({ default: m.AppointmentsView })));
const PatientsView = React.lazy(() => import('./components/Patients/PatientsView').then(m => ({ default: m.PatientsView })));
const TriageView = React.lazy(() => import('./components/Triage/TriageView').then(m => ({ default: m.TriageView })));
const GrowthView = React.lazy(() => import('./components/Growth/GrowthView').then(m => ({ default: m.GrowthView })));
const BillingView = React.lazy(() => import('./components/Billing/BillingView').then(m => ({ default: m.BillingView })));
const PharmacyView = React.lazy(() => import('./components/Pharmacy/PharmacyView').then(m => ({ default: m.PharmacyView })));
const DiagnosticsView = React.lazy(() => import('./components/Diagnostics/DiagnosticsView').then(m => ({ default: m.DiagnosticsView })));
const AutomationView = React.lazy(() => import('./components/Automation/AutomationView').then(m => ({ default: m.AutomationView })));
const AICopilotView = React.lazy(() => import('./components/AICopilot/AICopilotView').then(m => ({ default: m.AICopilotView })));
const TasksView = React.lazy(() => import('./components/Tasks/TasksView').then(m => ({ default: m.TasksView })));
const ClinicalCommandCenter = React.lazy(() => import('./components/Clinical/ClinicalCommandCenter').then(m => ({ default: m.ClinicalCommandCenter })));

// Lazy Load Patient Views
const PatientAppointments = React.lazy(() => import('./components/Patient/PatientAppointments').then(m => ({ default: m.PatientAppointments })));
const PatientCareFollowups = React.lazy(() => import('./components/Patient/PatientCareFollowups').then(m => ({ default: m.PatientCareFollowups })));
const PatientDiagnostics = React.lazy(() => import('./components/Patient/PatientDiagnostics').then(m => ({ default: m.PatientDiagnostics })));
const PatientPrescriptions = React.lazy(() => import('./components/Patient/PatientPrescriptions').then(m => ({ default: m.PatientPrescriptions })));
const PatientBilling = React.lazy(() => import('./components/Patient/PatientBilling').then(m => ({ default: m.PatientBilling })));
const PatientCareAssistant = React.lazy(() => import('./components/Patient/PatientCareAssistant').then(m => ({ default: m.PatientCareAssistant })));

const ViewFallback = () => (
  <div style={{ padding: '40px', display: 'flex', justifyContent: 'center', color: 'var(--text-muted)' }}>
    <span style={{ fontSize: '0.9rem' }}>Loading view...</span>
  </div>
);

const MainAppLayout = () => {
  const { activeView } = useApp();

  if (activeView === 'landing') {
    return (
      <div style={{ minHeight: '100vh', background: '#070b14' }}>
        <LandingPage />
        <InteractiveDemoModal />
        <ToastContainer />
      </div>
    );
  }

  const renderActiveView = () => {
    return (
      <Suspense fallback={<ViewFallback />}>
        {(() => {
          switch (activeView) {
            case 'dashboard':    return <DashboardView />;
            case 'leads':        return <LeadsView />;
            case 'inbox':        return <InboxView />;
            case 'appointments': return <AppointmentsView />;
            case 'patients':     return <PatientsView />;
            case 'triage':       return <TriageView />;
            case 'clinical':     return <ClinicalCommandCenter />;
            case 'growth':       return <GrowthView />;
            case 'billing':      return <BillingView />;
            case 'pharmacy':     return <PharmacyView />;
            case 'diagnostics':  return <DiagnosticsView />;
            case 'automation':   return <AutomationView />;
            case 'ai-copilot':   return <AICopilotView />;
            case 'tasks':        return <TasksView />;
            
            // Patient Routes
            case 'patient-dashboard':      return <PatientDashboard />;
            case 'patient-appointments':   return <PatientAppointments />;
            case 'patient-followups':      return <PatientCareFollowups />;
            case 'patient-diagnostics':    return <PatientDiagnostics />;
            case 'patient-prescriptions':  return <PatientPrescriptions />;
            case 'patient-billing':        return <PatientBilling />;
            case 'patient-care-assistant': return <PatientCareAssistant />;
            
            default:             return <DashboardView />;
          }
        })()}
      </Suspense>
    );
  };

  return (
    <div className="app-container">
      <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
        <Navbar />
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <Sidebar />
          <main className="main-content">
            {renderActiveView()}
          </main>
        </div>
      </div>

      {/* Global Modals & Notifications */}
      <CommandPalette />
      <TelehealthModal />
      <InteractiveDemoModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppLayout />
    </AppProvider>
  );
}
