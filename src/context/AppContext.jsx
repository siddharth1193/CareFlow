import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { INITIAL_DATA } from '../data/initialData';
import { storageService } from '../services/storageService';
import { aiService } from '../services/aiService';
import { automationService } from '../services/automationService';
import confetti from 'canvas-confetti';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Load state from local storage or defaults
  const [data, setData] = useState(() => storageService.loadState());
  const [activeView, setActiveView] = useState('dashboard'); // dashboard | leads | inbox | appointments | patients | triage | growth | billing | pharmacy | diagnostics | automation | ai-copilot | tasks | landing | demo
  const [theme, setTheme] = useState(() => localStorage.getItem('careflow_theme') || 'dark');
  const [activeBranchId, setActiveBranchId] = useState('branch-1');
  const [toasts, setToasts] = useState([]);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [telehealthMeeting, setTelehealthMeeting] = useState(null);
  
  // Interactive 14-Step Sales & Workflow Demo State
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoStep, setDemoStep] = useState(1);

  // Sync theme to DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('careflow_theme', theme);
  }, [theme]);

  // Persist data on modification
  useEffect(() => {
    storageService.saveState(data);
  }, [data]);

  // Keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toast notifications helper
  const addToast = useCallback(({ title, message, type = 'info', duration = 4000 }) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // Role switcher
  const setUserRole = useCallback((role) => {
    const roleProfiles = {
      CLINIC_OWNER: { name: "Dr. Arvind Swaminathan", role: "CLINIC_OWNER", title: "Chief Medical Director & Owner" },
      DOCTOR: { name: "Dr. Priya Nair", role: "DOCTOR", title: "Senior Consultant Dermatologist" },
      RECEPTIONIST: { name: "Ananya Sharma", role: "RECEPTIONIST", title: "Front Desk & Patient Flow Lead" },
      BILLING_STAFF: { name: "Rohan Mehta", role: "BILLING_STAFF", title: "Billing & Growth Manager" }
    };
    const profile = roleProfiles[role] || roleProfiles.CLINIC_OWNER;
    setData((prev) => ({
      ...prev,
      currentUser: { ...prev.currentUser, ...profile }
    }));
    addToast({
      title: "Role Switched",
      message: `Active persona: ${profile.name} (${profile.role})`,
      type: "info"
    });
  }, [addToast]);

  // Lead Actions
  const addLead = useCallback((leadData) => {
    const newLead = {
      id: `lead-${Date.now()}`,
      organizationId: data.organization.id,
      branchId: activeBranchId,
      createdAt: new Date().toISOString(),
      status: 'NEW',
      convertedPatientId: null,
      ...leadData
    };
    setData((prev) => ({
      ...prev,
      leads: [newLead, ...prev.leads]
    }));
    addToast({
      title: "New Lead Captured",
      message: `${newLead.name} via ${newLead.source}`,
      type: "success"
    });
    return newLead;
  }, [data.organization.id, activeBranchId, addToast]);

  const updateLeadStatus = useCallback((leadId, status, notes) => {
    setData((prev) => ({
      ...prev,
      leads: prev.leads.map((l) => (l.id === leadId ? { ...l, status, notes: notes || l.notes, lastContactedAt: new Date().toISOString() } : l))
    }));
    addToast({
      title: "Lead Status Updated",
      message: `Status changed to ${status}`,
      type: "info"
    });
  }, [addToast]);

  const convertLeadToAppointment = useCallback((leadId, appointmentDetails) => {
    const lead = data.leads.find((l) => l.id === leadId);
    if (!lead) return;

    // Create or locate patient record
    let patientId = lead.convertedPatientId;
    if (!patientId) {
      patientId = `pat-${Date.now()}`;
      const newPatient = {
        id: patientId,
        uhid: `CF-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
        name: lead.name,
        phone: lead.phone,
        email: lead.email || '',
        age: appointmentDetails.patientAge || 30,
        gender: appointmentDetails.patientGender || 'Other',
        bloodGroup: 'Unknown',
        address: 'Bengaluru',
        allergies: [],
        chronicConditions: [],
        registeredAt: new Date().toISOString().split('T')[0],
        lastVisitAt: appointmentDetails.date,
        status: 'ACTIVE',
        totalVisits: 1,
        totalSpent: appointmentDetails.fee || 1000,
        consent: { whatsapp: true, sms: true, marketing: true, lastUpdated: new Date().toISOString() }
      };
      setData((prev) => ({
        ...prev,
        patients: [newPatient, ...prev.patients]
      }));
    }

    // Create appointment
    const newAppointment = {
      id: `apt-${Date.now()}`,
      appointmentNumber: `APT-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`,
      patientId,
      doctorId: appointmentDetails.doctorId,
      date: appointmentDetails.date,
      time: appointmentDetails.time,
      type: appointmentDetails.type || 'IN_PERSON',
      status: 'CONFIRMED',
      reason: appointmentDetails.reason || lead.serviceInterested || 'Consultation',
      fee: appointmentDetails.fee || 1000,
      paid: false,
      triageScore: 4,
      channel: lead.source === 'WHATSAPP' ? 'WHATSAPP_AI' : lead.source,
      isRecovered: false,
      notes: `Converted from lead (${lead.source}). ${lead.notes || ''}`
    };

    // Update lead
    setData((prev) => ({
      ...prev,
      appointments: [newAppointment, ...prev.appointments],
      leads: prev.leads.map((l) => (l.id === leadId ? { ...l, status: 'CONVERTED', convertedPatientId: patientId } : l)),
      growthMetrics: {
        ...prev.growthMetrics,
        leadConversionRate: Number(((prev.growthMetrics.leadConversionRate * 1.02)).toFixed(1))
      }
    }));

    // Trigger celebration confetti
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    } catch (_) {}

    addToast({
      title: "Lead Converted to Appointment!",
      message: `${lead.name} booked with doctor on ${appointmentDetails.date} at ${appointmentDetails.time}`,
      type: "success"
    });
  }, [data.leads, addToast]);

  // Appointment Actions
  const addAppointment = useCallback((aptData) => {
    const newApt = {
      id: `apt-${Date.now()}`,
      appointmentNumber: `APT-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`,
      paid: false,
      isRecovered: false,
      status: 'CONFIRMED',
      triageScore: 4,
      ...aptData
    };
    setData((prev) => ({
      ...prev,
      appointments: [newApt, ...prev.appointments],
      growthMetrics: {
        ...prev.growthMetrics,
        totalAppointmentsThisMonth: prev.growthMetrics.totalAppointmentsThisMonth + 1
      }
    }));
    addToast({
      title: "Appointment Scheduled",
      message: `Appointment #${newApt.appointmentNumber} confirmed`,
      type: "success"
    });
    return newApt;
  }, [addToast]);

  const updateAppointmentStatus = useCallback((aptId, newStatus) => {
    setData((prev) => {
      const targetApt = prev.appointments.find((a) => a.id === aptId);
      const isNowNoShow = newStatus === 'NO_SHOW' && targetApt?.status !== 'NO_SHOW';

      let updatedApts = prev.appointments.map((a) => (a.id === aptId ? { ...a, status: newStatus } : a));
      let updatedTasks = prev.tasks;

      // If marked as NO_SHOW, auto-generate high-priority receptionist recovery task
      if (isNowNoShow && targetApt) {
        const patient = prev.patients.find((p) => p.id === targetApt.patientId);
        const doctor = prev.doctors.find((d) => d.id === targetApt.doctorId);
        const newTask = {
          id: `task-${Date.now()}`,
          title: `No-Show Recovery: ${patient?.name || 'Patient'} missed ${targetApt.time} with ${doctor?.name || 'Doctor'}`,
          category: "NO_SHOW_RECOVERY",
          priority: "HIGH",
          status: "TODO",
          assignedTo: "Ananya Sharma (Reception)",
          dueDate: new Date(Date.now() + 2 * 3600 * 1000).toISOString(),
          relatedPatientId: targetApt.patientId,
          relatedAppointmentId: targetApt.id,
          actionType: "WHATSAPP_CALL"
        };
        updatedTasks = [newTask, ...prev.tasks];
      }

      return {
        ...prev,
        appointments: updatedApts,
        tasks: updatedTasks
      };
    });

    addToast({
      title: "Appointment Status Updated",
      message: `Appointment is now ${newStatus}`,
      type: newStatus === 'NO_SHOW' ? 'warning' : 'info'
    });
  }, [addToast]);

  // No-Show Recovery Engine Triggers
  const triggerNoShowRecovery = useCallback((aptId) => {
    const apt = data.appointments.find((a) => a.id === aptId);
    if (!apt) return;
    const patient = data.patients.find((p) => p.id === apt.patientId);
    const doctor = data.doctors.find((d) => d.id === apt.doctorId);

    // Automation safety check
    const safetyCheck = automationService.canSendMessage({ patient, channel: 'whatsapp', isMarketing: false });
    if (!safetyCheck.allowed) {
      addToast({
        title: "Recovery Dispatch Halted",
        message: safetyCheck.reason,
        type: "warning"
      });
      return;
    }

    // Dispatch WhatsApp Recovery Message
    setData((prev) => {
      // Find or create conversation
      let conversation = prev.conversations.find((c) => c.patientId === patient?.id);
      const recoveryMsg = {
        id: `msg-${Date.now()}`,
        sender: "AI_RECEPTIONIST",
        text: `Namaste ${patient?.name || 'Patient'}, we noticed you couldn't make it to your ${apt.time} appointment with ${doctor?.name || 'our doctor'} today.\n\nWould you like to re-book for tomorrow or connect with our front desk?`,
        timestamp: new Date().toISOString(),
        channel: "WHATSAPP",
        interactiveButtons: ["Reschedule for Tomorrow", "Contact Clinic", "Not Now"]
      };

      let updatedConvs;
      if (conversation) {
        updatedConvs = prev.conversations.map((c) => (c.id === conversation.id ? { ...c, messages: [...c.messages, recoveryMsg], lastMessage: recoveryMsg.text, lastMessageAt: recoveryMsg.timestamp } : c));
      } else {
        const newConv = {
          id: `conv-${Date.now()}`,
          patientId: patient?.id,
          channel: "WHATSAPP",
          contactName: patient?.name || 'Patient',
          contactPhone: patient?.phone || '',
          status: "AI_ACTIVE",
          lastMessage: recoveryMsg.text,
          lastMessageAt: recoveryMsg.timestamp,
          unreadCount: 0,
          messages: [recoveryMsg]
        };
        updatedConvs = [newConv, ...prev.conversations];
      }

      return {
        ...prev,
        appointments: prev.appointments.map((a) => (a.id === aptId ? { ...a, recoveryStatus: 'AUTO_MESSAGE_SENT' } : a)),
        conversations: updatedConvs
      };
    });

    addToast({
      title: "No-Show Recovery WhatsApp Dispatched",
      message: `Interactive rescheduling options sent to ${patient?.name}`,
      type: "success"
    });
  }, [data.appointments, data.patients, data.doctors, addToast]);

  const recoverNoShowAppointment = useCallback((aptId, newDateTime) => {
    const apt = data.appointments.find((a) => a.id === aptId);
    if (!apt) return;
    const fee = apt.fee || 1100;

    setData((prev) => ({
      ...prev,
      appointments: prev.appointments.map((a) =>
        a.id === aptId
          ? {
              ...a,
              status: 'RECOVERED',
              date: newDateTime?.date || a.date,
              time: newDateTime?.time || '11:30 AM',
              isRecovered: true,
              recoveredRevenue: fee,
              recoveryStatus: 'RESCHEDULED',
              notes: `${a.notes} [CareFlow Auto-Recovered on ${new Date().toLocaleDateString('en-IN')}]`
            }
          : a
      ),
      growthMetrics: {
        ...prev.growthMetrics,
        revenueRecovered: prev.growthMetrics.revenueRecovered + fee,
        recoveredAppointments: prev.growthMetrics.recoveredAppointments + 1,
        noShowRecoveryRate: Number((((prev.growthMetrics.recoveredAppointments + 1) / prev.growthMetrics.noShowAppointments) * 100).toFixed(1))
      },
      tasks: prev.tasks.map((t) => (t.relatedAppointmentId === aptId ? { ...t, status: 'COMPLETED' } : t))
    }));

    try {
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
    } catch (_) {}

    addToast({
      title: "🎯 No-Show Successfully Recovered!",
      message: `Recovered ₹${fee.toLocaleString('en-IN')} revenue! New appointment confirmed.`,
      type: "success"
    });
  }, [data.appointments, addToast]);

  // Omnichannel Messaging Actions
  const sendMessageToConversation = useCallback((convId, text, sender = 'STAFF', senderName = 'Front Desk') => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender,
      senderName: sender === 'STAFF' ? senderName : undefined,
      text,
      timestamp: new Date().toISOString(),
      channel: 'WHATSAPP'
    };

    setData((prev) => ({
      ...prev,
      conversations: prev.conversations.map((c) =>
        c.id === convId
          ? {
              ...c,
              lastMessage: text,
              lastMessageAt: newMsg.timestamp,
              messages: [...c.messages, newMsg]
            }
          : c
      )
    }));

    // If patient replied, simulate AI processing if conversation is in AI_ACTIVE mode
    if (sender === 'PATIENT') {
      const conv = data.conversations.find((c) => c.id === convId);
      const patient = data.patients.find((p) => p.id === conv?.patientId);
      
      const aiResponse = aiService.processReceptionistQuery({
        text,
        patient,
        doctorList: data.doctors
      });

      setTimeout(() => {
        const aiMsg = {
          id: `msg-ai-${Date.now()}`,
          sender: "AI_RECEPTIONIST",
          text: aiResponse.reply,
          timestamp: new Date().toISOString(),
          channel: "WHATSAPP",
          interactiveButtons: aiResponse.suggestedActions
        };

        setData((latest) => ({
          ...latest,
          conversations: latest.conversations.map((c) =>
            c.id === convId
              ? {
                  ...c,
                  status: aiResponse.triggerHandoff ? "WAITING_FOR_HUMAN" : c.status,
                  lastMessage: aiResponse.reply,
                  lastMessageAt: aiMsg.timestamp,
                  messages: [...c.messages, aiMsg]
                }
              : c
          )
        }));

        if (aiResponse.triggerHandoff) {
          addToast({
            title: "Human Handoff Triggered",
            message: "AI receptionist requested staff takeover for clinical/complex query",
            type: "warning"
          });
        }
      }, 700);
    }
  }, [data.conversations, data.patients, data.doctors, addToast]);

  const triggerHumanHandoff = useCallback((convId) => {
    setData((prev) => ({
      ...prev,
      conversations: prev.conversations.map((c) => (c.id === convId ? { ...c, status: 'HUMAN_ACTIVE' } : c))
    }));
    addToast({
      title: "Staff Takeover Activated",
      message: "AI paused. You have full manual control of this conversation.",
      type: "info"
    });
  }, [addToast]);

  const returnControlToAI = useCallback((convId) => {
    setData((prev) => ({
      ...prev,
      conversations: prev.conversations.map((c) => (c.id === convId ? { ...c, status: 'AI_ACTIVE' } : c))
    }));
    addToast({
      title: "AI Receptionist Resumed",
      message: "CareFlow AI is now automatically responding to incoming patient queries.",
      type: "success"
    });
  }, [addToast]);

  const resolveConversation = useCallback((convId) => {
    setData((prev) => ({
      ...prev,
      conversations: prev.conversations.map((c) => (c.id === convId ? { ...c, status: 'RESOLVED' } : c))
    }));
    addToast({
      title: "Conversation Resolved",
      message: "Thread marked as completed",
      type: "info"
    });
  }, [addToast]);

  // Billing Actions
  const addInvoice = useCallback((invData) => {
    const newInv = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'PENDING',
      paidAmount: 0,
      paymentMethod: null,
      transactionRef: null,
      paidAt: null,
      ...invData
    };
    setData((prev) => ({
      ...prev,
      invoices: [newInv, ...prev.invoices],
      growthMetrics: {
        ...prev.growthMetrics,
        revenuePending: prev.growthMetrics.revenuePending + (newInv.total || 0)
      }
    }));
    addToast({
      title: "Invoice Generated",
      message: `Invoice #${newInv.invoiceNumber} created for ₹${newInv.total?.toLocaleString('en-IN')}`,
      type: "success"
    });
    return newInv;
  }, [addToast]);

  const markInvoicePaid = useCallback((invId, paymentMethod = 'UPI (Instant)', transactionRef = `UPI-${Date.now()}`) => {
    const inv = data.invoices.find((i) => i.id === invId);
    if (!inv) return;
    const amount = inv.total;

    setData((prev) => ({
      ...prev,
      invoices: prev.invoices.map((i) =>
        i.id === invId
          ? {
              ...i,
              status: 'PAID',
              paidAmount: amount,
              paymentMethod,
              transactionRef,
              paidAt: new Date().toISOString()
            }
          : i
      ),
      growthMetrics: {
        ...prev.growthMetrics,
        revenueGenerated: prev.growthMetrics.revenueGenerated + amount,
        revenuePending: Math.max(0, prev.growthMetrics.revenuePending - amount)
      }
    }));

    try {
      confetti({ particleCount: 50, spread: 50 });
    } catch (_) {}

    addToast({
      title: "Payment Recorded",
      message: `₹${amount.toLocaleString('en-IN')} received via ${paymentMethod}`,
      type: "success"
    });
  }, [data.invoices, addToast]);

  // Patient & Task Actions
  const addPatient = useCallback((patientData) => {
    const newPat = {
      id: `pat-${Date.now()}`,
      uhid: `CF-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      registeredAt: new Date().toISOString().split('T')[0],
      status: 'ACTIVE',
      totalVisits: 0,
      totalSpent: 0,
      allergies: [],
      chronicConditions: [],
      consent: { whatsapp: true, sms: true, marketing: true, lastUpdated: new Date().toISOString() },
      ...patientData
    };
    setData((prev) => ({
      ...prev,
      patients: [newPat, ...prev.patients]
    }));
    addToast({
      title: "Patient Registered",
      message: `${newPat.name} (UHID: ${newPat.uhid})`,
      type: "success"
    });
    return newPat;
  }, [addToast]);

  const addTask = useCallback((taskData) => {
    const newTask = {
      id: `task-${Date.now()}`,
      status: 'TODO',
      ...taskData
    };
    setData((prev) => ({
      ...prev,
      tasks: [newTask, ...prev.tasks]
    }));
    addToast({
      title: "Task Added",
      message: newTask.title,
      type: "info"
    });
  }, [addToast]);

  const updateTaskStatus = useCallback((taskId, status) => {
    setData((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => (t.id === taskId ? { ...t, status } : t))
    }));
    if (status === 'COMPLETED') {
      addToast({
        title: "Task Completed",
        message: "Action logged successfully",
        type: "success"
      });
    }
  }, [addToast]);

  // Patient Reactivation Campaign Runner
  const runReactivationCampaign = useCallback((daysInactive = 90) => {
    const inactivePatients = data.patients.filter((p) => p.status.includes('INACTIVE') || p.status === 'INACTIVE_90D');
    
    // Check consent for each
    const eligibleCount = inactivePatients.filter((p) => p.consent?.whatsapp && p.consent?.marketing).length;
    
    setData((prev) => ({
      ...prev,
      growthMetrics: {
        ...prev.growthMetrics,
        reactivationRevenue: prev.growthMetrics.reactivationRevenue + eligibleCount * 1200
      }
    }));

    addToast({
      title: "Reactivation Campaign Dispatched",
      message: `WhatsApp care check-ins sent to ${eligibleCount} inactive patients (> ${daysInactive} days)`,
      type: "success"
    });
  }, [data.patients, addToast]);

  const resetAllData = useCallback(() => {
    const fresh = storageService.resetToDefault();
    setData(fresh);
    addToast({
      title: "Database Reset",
      message: "Reset all records to fresh CareFlow demo state",
      type: "info"
    });
  }, [addToast]);

  // Demo Walkthrough Controllers
  const startDemoMode = useCallback(() => {
    setIsDemoModalOpen(true);
    setDemoStep(1);
  }, []);

  const closeDemoMode = useCallback(() => {
    setIsDemoModalOpen(false);
  }, []);

  const nextDemoStep = useCallback(() => {
    setDemoStep((prev) => Math.min(14, prev + 1));
  }, []);

  const prevDemoStep = useCallback(() => {
    setDemoStep((prev) => Math.max(1, prev - 1));
  }, []);

  const value = {
    data,
    organization: data.organization,
    branches: data.branches,
    activeBranchId,
    setActiveBranchId,
    currentUser: data.currentUser,
    setUserRole,
    doctors: data.doctors,
    leads: data.leads,
    patients: data.patients,
    appointments: data.appointments,
    conversations: data.conversations,
    invoices: data.invoices,
    tasks: data.tasks,
    prescriptions: data.prescriptions,
    diagnostics: data.diagnostics,
    growthMetrics: data.growthMetrics,
    automationTemplates: data.automationTemplates,
    aiInsights: data.aiInsights,
    activeView,
    setActiveView,
    theme,
    toggleTheme,
    toasts,
    addToast,
    removeToast,
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    selectedPatient,
    setSelectedPatient,
    selectedAppointment,
    setSelectedAppointment,
    selectedLead,
    setSelectedLead,
    telehealthMeeting,
    setTelehealthMeeting,
    isDemoModalOpen,
    demoStep,
    setDemoStep,
    startDemoMode,
    closeDemoMode,
    nextDemoStep,
    prevDemoStep,
    addLead,
    updateLeadStatus,
    convertLeadToAppointment,
    addAppointment,
    updateAppointmentStatus,
    triggerNoShowRecovery,
    recoverNoShowAppointment,
    sendMessageToConversation,
    triggerHumanHandoff,
    returnControlToAI,
    resolveConversation,
    addInvoice,
    markInvoicePaid,
    addPatient,
    addTask,
    updateTaskStatus,
    runReactivationCampaign,
    resetAllData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
