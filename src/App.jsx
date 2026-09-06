import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Layout/Navbar';
import { Sidebar } from './components/Layout/Sidebar';
import { CommandPalette } from './components/Layout/CommandPalette';
import { ToastContainer } from './components/Common/ToastContainer';
import { TelehealthModal } from './components/Common/TelehealthModal';
import { InteractiveDemoModal } from './components/Demo/InteractiveDemoModal';

// Views
import { LandingPage } from './components/Landing/LandingPage';
import { DashboardView } from './components/Dashboard/DashboardView';
import { LeadsView } from './components/Leads/LeadsView';
import { InboxView } from './components/Inbox/InboxView';
import { AppointmentsView } from './components/Appointments/AppointmentsView';
import { PatientsView } from './components/Patients/PatientsView';
import { TriageView } from './components/Triage/TriageView';
import { GrowthView } from './components/Growth/GrowthView';
import { BillingView } from './components/Billing/BillingView';
import { PharmacyView } from './components/Pharmacy/PharmacyView';
import { DiagnosticsView } from './components/Diagnostics/DiagnosticsView';
import { AutomationView } from './components/Automation/AutomationView';
import { AICopilotView } from './components/AICopilot/AICopilotView';
import { TasksView } from './components/Tasks/TasksView';

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
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'leads':
        return <LeadsView />;
      case 'inbox':
        return <InboxView />;
      case 'appointments':
        return <AppointmentsView />;
      case 'patients':
        return <PatientsView />;
      case 'triage':
        return <TriageView />;
      case 'growth':
        return <GrowthView />;
      case 'billing':
        return <BillingView />;
      case 'pharmacy':
        return <PharmacyView />;
      case 'diagnostics':
        return <DiagnosticsView />;
      case 'automation':
        return <AutomationView />;
      case 'ai-copilot':
        return <AICopilotView />;
      case 'tasks':
        return <TasksView />;
      default:
        return <DashboardView />;
    }
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
