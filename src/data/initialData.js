export const INITIAL_DATA = {
  organization: {
    id: "org-1",
    name: "Apex Multispeciality Healthcare",
    tagline: "AI-Powered Clinical Excellence & Patient Growth",
    currency: "INR",
    currencySymbol: "₹",
    gstNumber: "29AAAAA0000A1Z5",
    phone: "+91 80 4968 2000",
    email: "care@apexhealth.in",
    address: "100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038",
  },

  branches: [
    {
      id: "branch-1",
      name: "Indiranagar Flagship Hub",
      city: "Bengaluru",
      phone: "+91 80 4968 2001",
      address: "Plot 42, 100 Feet Rd, Indiranagar",
      totalBeds: 24,
      occupiedBeds: 19,
    },
    {
      id: "branch-2",
      name: "Koramangala Care Center",
      city: "Bengaluru",
      phone: "+91 80 4968 2002",
      address: "80 Feet Rd, 4th Block, Koramangala",
      totalBeds: 16,
      occupiedBeds: 11,
    }
  ],

  currentUser: {
    id: "user-1",
    name: "Dr. Arvind Swaminathan",
    role: "CLINIC_OWNER", // CLINIC_OWNER | DOCTOR | RECEPTIONIST | BILLING_STAFF
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
    email: "arvind@apexhealth.in",
    branchId: "branch-1"
  },

  doctors: [
    {
      id: "doc-1",
      name: "Dr. Arvind Swaminathan",
      specialty: "Cardiology",
      qualification: "MD, DM (Cardiology), FACC",
      experience: "16 years",
      fee: 1200,
      room: "OPD 101",
      availability: "Mon-Sat: 09:00 AM - 01:00 PM",
      rating: 4.9,
      reviewsCount: 342,
      activeToday: true,
      avatarColor: "#0ea5e9"
    },
    {
      id: "doc-2",
      name: "Dr. Priya Nair",
      specialty: "Dermatology & Cosmetology",
      qualification: "MBBS, MD (DVL)",
      experience: "11 years",
      fee: 1000,
      room: "OPD 104",
      availability: "Mon-Fri: 11:00 AM - 06:00 PM",
      rating: 4.85,
      reviewsCount: 420,
      activeToday: true,
      avatarColor: "#a855f7"
    },
    {
      id: "doc-3",
      name: "Dr. Rahul Sharma",
      specialty: "Orthopedics & Joint Replacement",
      qualification: "MS (Ortho), MCh (UK)",
      experience: "14 years",
      fee: 1100,
      room: "OPD 202",
      availability: "Tue-Sun: 10:00 AM - 04:00 PM",
      rating: 4.9,
      reviewsCount: 289,
      activeToday: true,
      avatarColor: "#10b981"
    },
    {
      id: "doc-4",
      name: "Dr. Meera Iyer",
      specialty: "Pediatrics & Neonatology",
      qualification: "MBBS, DCH, DNB",
      experience: "9 years",
      fee: 800,
      room: "OPD 108",
      availability: "Mon-Sat: 09:30 AM - 02:30 PM",
      rating: 4.95,
      reviewsCount: 512,
      activeToday: true,
      avatarColor: "#f59e0b"
    },
    {
      id: "doc-5",
      name: "Dr. Vikramaditya Rao",
      specialty: "General Medicine & Diabetology",
      qualification: "MD (Gen Med), Dip. Diabetes",
      experience: "18 years",
      fee: 900,
      room: "OPD 102",
      availability: "Mon-Sat: 08:30 AM - 03:00 PM",
      rating: 4.8,
      reviewsCount: 610,
      activeToday: true,
      avatarColor: "#6366f1"
    }
  ],

  leads: [
    {
      id: "lead-101",
      organizationId: "org-1",
      branchId: "branch-1",
      name: "Rohan Kapoor",
      phone: "+91 98450 12345",
      email: "rohan.k@gmail.com",
      source: "WHATSAPP",
      serviceInterested: "Dermatology (Acne Treatment)",
      assignedStaffId: "user-rec-1",
      status: "APPOINTMENT_BOOKED",
      notes: "AI receptionist booked consult with Dr. Priya Nair after answering fee queries.",
      lastContactedAt: "2026-09-06T10:15:00",
      nextFollowUpAt: "2026-09-07T11:00:00",
      convertedPatientId: "pat-105",
      createdAt: "2026-09-06T09:40:00"
    },
    {
      id: "lead-102",
      organizationId: "org-1",
      branchId: "branch-1",
      name: "Sneha Mukherjee",
      phone: "+91 97421 98765",
      email: "sneha.m@outlook.com",
      source: "INSTAGRAM",
      serviceInterested: "Cosmetic Skin Glow & Peels",
      assignedStaffId: "user-rec-1",
      status: "QUALIFIED",
      notes: "Asked about package pricing. Prefers weekend slots.",
      lastContactedAt: "2026-09-06T11:30:00",
      nextFollowUpAt: "2026-09-06T17:00:00",
      convertedPatientId: null,
      createdAt: "2026-09-06T11:20:00"
    },
    {
      id: "lead-103",
      organizationId: "org-1",
      branchId: "branch-1",
      name: "Col. Rajesh Verma (Retd.)",
      phone: "+91 94480 34567",
      email: "col.verma@yahoo.com",
      source: "GOOGLE",
      serviceInterested: "Cardiology Annual Health Checkup",
      assignedStaffId: "user-rec-2",
      status: "CONTACTED",
      notes: "Left enquiry on Google My Business page about TMT and ECHO package.",
      lastContactedAt: "2026-09-06T12:00:00",
      nextFollowUpAt: "2026-09-06T15:30:00",
      convertedPatientId: null,
      createdAt: "2026-09-06T08:50:00"
    },
    {
      id: "lead-104",
      organizationId: "org-1",
      branchId: "branch-1",
      name: "Divya Balasubramanian",
      phone: "+91 99002 67890",
      email: "divya.b@techcorp.com",
      source: "WEBSITE",
      serviceInterested: "Pediatric Vaccination Schedule",
      assignedStaffId: "user-rec-1",
      status: "NEW",
      notes: "Submitted website form for 6-month MMR and booster vaccines.",
      lastContactedAt: null,
      nextFollowUpAt: "2026-09-06T14:00:00",
      convertedPatientId: null,
      createdAt: "2026-09-06T12:45:00"
    },
    {
      id: "lead-105",
      organizationId: "org-1",
      branchId: "branch-2",
      name: "Karthik Sundaram",
      phone: "+91 98860 77112",
      email: "karthik.s@gmail.com",
      source: "QR_CODE",
      serviceInterested: "Knee Pain & Sports Injury Consult",
      assignedStaffId: "user-rec-1",
      status: "CONVERTED",
      notes: "Scanned clinic counter QR code, booked Dr. Rahul Sharma, consult completed.",
      lastContactedAt: "2026-09-05T16:00:00",
      nextFollowUpAt: null,
      convertedPatientId: "pat-103",
      createdAt: "2026-09-04T14:10:00"
    },
    {
      id: "lead-106",
      organizationId: "org-1",
      branchId: "branch-1",
      name: "Pooja Hegde",
      phone: "+91 97312 44556",
      email: "pooja.h@gmail.com",
      source: "FACEBOOK",
      serviceInterested: "Diabetes Management Program",
      assignedStaffId: "user-rec-2",
      status: "APPOINTMENT_OFFERED",
      notes: "Offered Tuesday 10:30 AM slot with Dr. Vikramaditya Rao. Awaiting confirmation.",
      lastContactedAt: "2026-09-06T09:10:00",
      nextFollowUpAt: "2026-09-06T16:00:00",
      convertedPatientId: null,
      createdAt: "2026-09-05T18:20:00"
    },
    {
      id: "lead-107",
      organizationId: "org-1",
      branchId: "branch-1",
      name: "Manish Agarwal",
      phone: "+91 99450 88221",
      email: "manish.a@gmail.com",
      source: "PHONE",
      serviceInterested: "General Health Screening",
      assignedStaffId: "user-rec-1",
      status: "LOST",
      notes: "Moved out of Bangalore to Pune.",
      lastContactedAt: "2026-09-04T11:00:00",
      nextFollowUpAt: null,
      convertedPatientId: null,
      createdAt: "2026-09-03T10:00:00"
    }
  ],

  patients: [
    {
      id: "pat-101",
      uhid: "CF-2026-00891",
      name: "Suresh Narayanan",
      age: 58,
      gender: "Male",
      phone: "+91 98451 22334",
      email: "suresh.narayanan@gmail.com",
      bloodGroup: "O+",
      address: "B-402, Prestige Palms, Indiranagar, Bengaluru",
      emergencyContact: { name: "Radha Narayanan (Wife)", phone: "+91 98451 22335" },
      allergies: ["Penicillin", "Ciprofloxacin"],
      chronicConditions: ["Hypertension", "Type 2 Diabetes"],
      registeredAt: "2024-03-15",
      lastVisitAt: "2026-09-01",
      status: "ACTIVE",
      totalVisits: 8,
      totalSpent: 28400,
      consent: {
        whatsapp: true,
        sms: true,
        marketing: true,
        lastUpdated: "2026-01-10"
      }
    },
    {
      id: "pat-102",
      uhid: "CF-2026-00892",
      name: "Ananya Deshmukh",
      age: 29,
      gender: "Female",
      phone: "+91 99012 33445",
      email: "ananya.d@fintech.co",
      bloodGroup: "B+",
      address: "12, 5th Cross, Koramangala 3rd Block, Bengaluru",
      emergencyContact: { name: "Rohan Deshmukh (Brother)", phone: "+91 99012 33446" },
      allergies: ["Sulfa Drugs"],
      chronicConditions: ["Mild Asthma"],
      registeredAt: "2025-07-20",
      lastVisitAt: "2026-09-05",
      status: "ACTIVE",
      totalVisits: 4,
      totalSpent: 9200,
      consent: {
        whatsapp: true,
        sms: true,
        marketing: true,
        lastUpdated: "2026-02-15"
      }
    },
    {
      id: "pat-103",
      uhid: "CF-2026-00893",
      name: "Karthik Sundaram",
      age: 34,
      gender: "Male",
      phone: "+91 98860 77112",
      email: "karthik.s@gmail.com",
      bloodGroup: "A+",
      address: "74, Defense Colony, Indiranagar, Bengaluru",
      emergencyContact: { name: "Deepa Sundaram (Spouse)", phone: "+91 98860 77113" },
      allergies: [],
      chronicConditions: ["Meniscus Tear (Right Knee)"],
      registeredAt: "2026-09-04",
      lastVisitAt: "2026-09-05",
      status: "ACTIVE",
      totalVisits: 1,
      totalSpent: 4500,
      consent: {
        whatsapp: true,
        sms: true,
        marketing: true,
        lastUpdated: "2026-09-04"
      }
    },
    {
      id: "pat-104",
      uhid: "CF-2026-00894",
      name: "Vikram Seth",
      age: 46,
      gender: "Male",
      phone: "+91 97411 66778",
      email: "vikram.seth@corporate.in",
      bloodGroup: "AB+",
      address: "Flat 103, Sobha Rose, Whitefield, Bengaluru",
      emergencyContact: { name: "Suman Seth (Wife)", phone: "+91 97411 66779" },
      allergies: ["NSAIDs (Ibuprofen)"],
      chronicConditions: ["Lumbar Spondylosis"],
      registeredAt: "2025-11-12",
      lastVisitAt: "2026-08-10",
      status: "NO_SHOW_PENDING",
      totalVisits: 3,
      totalSpent: 7800,
      consent: {
        whatsapp: true,
        sms: true,
        marketing: true,
        lastUpdated: "2025-11-12"
      }
    },
    {
      id: "pat-105",
      uhid: "CF-2026-00895",
      name: "Rohan Kapoor",
      age: 26,
      gender: "Male",
      phone: "+91 98450 12345",
      email: "rohan.k@gmail.com",
      bloodGroup: "O-",
      address: "22, 14th Main, HSR Layout, Bengaluru",
      emergencyContact: { name: "Sanjay Kapoor (Father)", phone: "+91 98450 12346" },
      allergies: [],
      chronicConditions: ["Cystic Acne"],
      registeredAt: "2026-09-06",
      lastVisitAt: "2026-09-06",
      status: "NEW",
      totalVisits: 0,
      totalSpent: 0,
      consent: {
        whatsapp: true,
        sms: true,
        marketing: true,
        lastUpdated: "2026-09-06"
      }
    },
    {
      id: "pat-106",
      uhid: "CF-2025-00612",
      name: "Sunita Rao",
      age: 63,
      gender: "Female",
      phone: "+91 99452 88990",
      email: "sunita.rao63@gmail.com",
      bloodGroup: "A-",
      address: "45, RMV 2nd Stage, Bengaluru",
      emergencyContact: { name: "Arun Rao (Son)", phone: "+91 99452 88991" },
      allergies: ["Aspirin"],
      chronicConditions: ["Post-Angioplasty", "Hyperlipidemia"],
      registeredAt: "2024-01-10",
      lastVisitAt: "2026-06-02", // > 90 days inactive
      status: "INACTIVE_90D",
      totalVisits: 12,
      totalSpent: 48500,
      consent: {
        whatsapp: true,
        sms: true,
        marketing: true,
        lastUpdated: "2025-12-01"
      }
    }
  ],

  appointments: [
    {
      id: "apt-201",
      appointmentNumber: "APT-2026-0906-01",
      patientId: "pat-101",
      doctorId: "doc-1",
      date: "2026-09-06",
      time: "09:30 AM",
      type: "IN_PERSON", // IN_PERSON | TELEHEALTH
      status: "COMPLETED", // SCHEDULED | CONFIRMED | COMPLETED | CANCELLED | NO_SHOW | RECOVERED
      reason: "Post-CABG 6-Month Review & ECG",
      fee: 1200,
      paid: true,
      triageScore: 2, // ESI 1-5
      channel: "WHATSAPP",
      isRecovered: false,
      notes: "ECG normal, BP 130/84 mmHg, continue Statins & Beta-blocker."
    },
    {
      id: "apt-202",
      appointmentNumber: "APT-2026-0906-02",
      patientId: "pat-102",
      doctorId: "doc-2",
      date: "2026-09-06",
      time: "11:30 AM",
      type: "IN_PERSON",
      status: "COMPLETED",
      reason: "Eczema flare-up on forearms",
      fee: 1000,
      paid: true,
      triageScore: 4,
      channel: "WEBSITE",
      isRecovered: false,
      notes: "Prescribed Tacrolimus ointment and oral antihistamine."
    },
    {
      id: "apt-203",
      appointmentNumber: "APT-2026-0906-03",
      patientId: "pat-104",
      doctorId: "doc-3",
      date: "2026-09-06",
      time: "10:30 AM",
      type: "IN_PERSON",
      status: "NO_SHOW",
      reason: "Knee stiffness follow-up",
      fee: 1100,
      paid: false,
      triageScore: 4,
      channel: "PHONE",
      isRecovered: false,
      recoveryStatus: "AUTO_MESSAGE_SENT", // NOT_CONTACTED | AUTO_MESSAGE_SENT | RESCHEDULED | FAILED
      recoveredRevenue: 0,
      notes: "Did not attend scheduled slot. CareFlow No-Show Recovery WhatsApp dispatched."
    },
    {
      id: "apt-204",
      appointmentNumber: "APT-2026-0906-04",
      patientId: "pat-105",
      doctorId: "doc-2",
      date: "2026-09-06",
      time: "05:30 PM",
      type: "IN_PERSON",
      status: "CONFIRMED",
      reason: "Acne consultation (Converted Lead)",
      fee: 1000,
      paid: false,
      triageScore: 5,
      channel: "WHATSAPP_AI",
      isRecovered: false,
      notes: "Lead captured and converted automatically by CareFlow AI Receptionist."
    },
    {
      id: "apt-205",
      appointmentNumber: "APT-2026-0906-05",
      patientId: "pat-103",
      doctorId: "doc-3",
      date: "2026-09-07",
      time: "11:00 AM",
      type: "TELEHEALTH",
      telehealthUrl: "https://careflow.meet/apex-doc3-apt205",
      status: "CONFIRMED",
      reason: "MRI Knee Report Review Teleconsult",
      fee: 1100,
      paid: true,
      triageScore: 4,
      channel: "WHATSAPP",
      isRecovered: true,
      recoveredFromAptId: "apt-198",
      recoveredRevenue: 1100,
      notes: "Successfully recovered after previous week missed appointment via WhatsApp link."
    }
  ],

  conversations: [
    {
      id: "conv-1",
      patientId: "pat-105",
      leadId: "lead-101",
      channel: "WHATSAPP",
      contactName: "Rohan Kapoor",
      contactPhone: "+91 98450 12345",
      status: "AI_ACTIVE", // AI_ACTIVE | WAITING_FOR_HUMAN | HUMAN_ACTIVE | RESOLVED
      lastMessage: "Your appointment is confirmed with Dr. Priya Nair for today at 5:30 PM.",
      lastMessageAt: "2026-09-06T10:15:00",
      unreadCount: 0,
      messages: [
        {
          id: "msg-101",
          sender: "PATIENT",
          text: "Hi, I have severe acne breakouts on my face and need a good dermatologist consultation.",
          timestamp: "2026-09-06T10:12:00",
          channel: "WHATSAPP"
        },
        {
          id: "msg-102",
          sender: "AI_RECEPTIONIST",
          text: "Hello Rohan! Welcome to Apex Multispeciality Healthcare. Our Senior Dermatologist Dr. Priya Nair (MD, DVL) specializes in acne management. The consultation fee is ₹1,000.\n\nDr. Priya has the following slots available today:\n1️⃣ Today at 5:30 PM\n2️⃣ Tomorrow at 11:00 AM\n\nWhich time works best for you?",
          timestamp: "2026-09-06T10:12:15",
          channel: "WHATSAPP"
        },
        {
          id: "msg-103",
          sender: "PATIENT",
          text: "Today at 5:30 PM works great for me.",
          timestamp: "2026-09-06T10:14:20",
          channel: "WHATSAPP"
        },
        {
          id: "msg-104",
          sender: "AI_RECEPTIONIST",
          text: "✅ Perfect! Your appointment (APT-2026-0906-04) is booked with Dr. Priya Nair for Today at 5:30 PM at our Indiranagar Flagship clinic (OPD 104).\n\n📍 Location: 100 Feet Rd, Indiranagar (https://maps.app/apex-indiranagar)\n\nWe look forward to seeing you!",
          timestamp: "2026-09-06T10:15:00",
          channel: "WHATSAPP"
        }
      ]
    },
    {
      id: "conv-2",
      patientId: "pat-104",
      leadId: null,
      channel: "WHATSAPP",
      contactName: "Vikram Seth",
      contactPhone: "+91 97411 66778",
      status: "WAITING_FOR_HUMAN",
      lastMessage: "I could not make it because I had an emergency meeting. Can I get a slot tomorrow morning?",
      lastMessageAt: "2026-09-06T11:05:00",
      unreadCount: 1,
      messages: [
        {
          id: "msg-201",
          sender: "AI_RECEPTIONIST",
          text: "Namaste Vikram ji, we noticed you couldn't make it for your 10:30 AM appointment with Dr. Rahul Sharma today. We hope everything is alright! Would you like us to reschedule your appointment?",
          timestamp: "2026-09-06T10:45:00",
          channel: "WHATSAPP",
          interactiveButtons: ["Reschedule Slot", "Contact Clinic", "Not Now"]
        },
        {
          id: "msg-202",
          sender: "PATIENT",
          text: "I could not make it because I had an emergency meeting. Can I get a slot tomorrow morning?",
          timestamp: "2026-09-06T11:05:00",
          channel: "WHATSAPP"
        },
        {
          id: "msg-203",
          sender: "AI_RECEPTIONIST",
          text: "I'll connect you with our clinic receptionist right away to arrange tomorrow morning's slot with Dr. Sharma.",
          timestamp: "2026-09-06T11:05:05",
          channel: "WHATSAPP",
          isHandoffMessage: true
        }
      ]
    },
    {
      id: "conv-3",
      patientId: "pat-102",
      leadId: null,
      channel: "WHATSAPP",
      contactName: "Ananya Deshmukh",
      contactPhone: "+91 99012 33445",
      status: "HUMAN_ACTIVE",
      lastMessage: "Ananya Sharma (Receptionist): Your prescription is ready on your portal. You can also pick it up at counter 2.",
      lastMessageAt: "2026-09-06T12:15:00",
      unreadCount: 0,
      messages: [
        {
          id: "msg-301",
          sender: "PATIENT",
          text: "Hi, Dr. Priya just consulted me. Has the prescription been uploaded to the pharmacy?",
          timestamp: "2026-09-06T12:10:00",
          channel: "WHATSAPP"
        },
        {
          id: "msg-302",
          sender: "STAFF",
          senderName: "Ananya Sharma (Reception)",
          text: "Hello Ananya ji, yes! Dr. Priya has sent the digital prescription to the ground floor pharmacy counter. You can pick it up or download it from your CareFlow link: https://cf.link/rx-892",
          timestamp: "2026-09-06T12:15:00",
          channel: "WHATSAPP"
        }
      ]
    }
  ],

  invoices: [
    {
      id: "inv-301",
      invoiceNumber: "INV-2026-0412",
      patientId: "pat-101",
      appointmentId: "apt-201",
      date: "2026-09-06",
      items: [
        { description: "Cardiology Specialist Consultation (Dr. Swaminathan)", quantity: 1, unitPrice: 1200, amount: 1200 },
        { description: "12-Lead Electrocardiogram (ECG)", quantity: 1, unitPrice: 600, amount: 600 },
        { description: "Serum Electrolytes & Lipid Profile", quantity: 1, unitPrice: 1400, amount: 1400 }
      ],
      subtotal: 3200,
      gstRate: 0.0, // Healthcare exempt on clinical consults in India
      gstAmount: 0,
      total: 3200,
      paidAmount: 3200,
      status: "PAID",
      paymentMethod: "UPI (Google Pay)",
      transactionRef: "UPI-491823901823",
      paidAt: "2026-09-06T10:45:00"
    },
    {
      id: "inv-302",
      invoiceNumber: "INV-2026-0413",
      patientId: "pat-102",
      appointmentId: "apt-202",
      date: "2026-09-06",
      items: [
        { description: "Dermatology Consultation (Dr. Priya Nair)", quantity: 1, unitPrice: 1000, amount: 1000 },
        { description: "Dermoscopy Examination", quantity: 1, unitPrice: 800, amount: 800 }
      ],
      subtotal: 1800,
      gstRate: 0.0,
      gstAmount: 0,
      total: 1800,
      paidAmount: 1800,
      status: "PAID",
      paymentMethod: "Card (Razorpay POS)",
      transactionRef: "RZP-TXN-8812903",
      paidAt: "2026-09-06T12:20:00"
    },
    {
      id: "inv-303",
      invoiceNumber: "INV-2026-0414",
      patientId: "pat-104",
      appointmentId: "apt-203",
      date: "2026-09-06",
      items: [
        { description: "Orthopedic Specialist Consultation", quantity: 1, unitPrice: 1100, amount: 1100 }
      ],
      subtotal: 1100,
      gstRate: 0.0,
      gstAmount: 0,
      total: 1100,
      paidAmount: 0,
      status: "PENDING",
      paymentMethod: null,
      transactionRef: null,
      paidAt: null
    }
  ],

  tasks: [
    {
      id: "task-1",
      title: "Contact Vikram Seth (Missed 10:30 AM appointment with Dr. Sharma)",
      category: "NO_SHOW_RECOVERY",
      priority: "HIGH",
      status: "TODO", // TODO | IN_PROGRESS | COMPLETED | CANCELLED
      assignedTo: "Ananya Sharma (Reception)",
      dueDate: "2026-09-06T13:00:00",
      relatedPatientId: "pat-104",
      relatedAppointmentId: "apt-203",
      actionType: "WHATSAPP_CALL"
    },
    {
      id: "task-2",
      title: "Follow up with Sneha Mukherjee (Instagram Lead - Cosmetic Peels package)",
      category: "LEAD_FOLLOWUP",
      priority: "MEDIUM",
      status: "TODO",
      assignedTo: "Rohan Mehta (Growth Desk)",
      dueDate: "2026-09-06T17:00:00",
      relatedLeadId: "lead-102",
      actionType: "WHATSAPP"
    },
    {
      id: "task-3",
      title: "Send Lipid Panel report interpretation link to Suresh Narayanan",
      category: "REPORT_DELIVERY",
      priority: "MEDIUM",
      status: "COMPLETED",
      assignedTo: "Ananya Sharma (Reception)",
      dueDate: "2026-09-06T11:00:00",
      relatedPatientId: "pat-101",
      actionType: "SMS_WHATSAPP"
    },
    {
      id: "task-4",
      title: "Reactivation Outreach: 14 Cardiac review patients inactive > 90 days",
      category: "PATIENT_REACTIVATION",
      priority: "HIGH",
      status: "IN_PROGRESS",
      assignedTo: "Rohan Mehta (Growth Desk)",
      dueDate: "2026-09-07T18:00:00",
      actionType: "CAMPAIGN"
    }
  ],

  prescriptions: [
    {
      id: "rx-501",
      rxNumber: "RX-2026-0906-01",
      patientId: "pat-101",
      doctorId: "doc-1",
      date: "2026-09-06",
      diagnosis: "Essential Hypertension & Dyslipidemia (ICD-10 I10, E78.5)",
      medicines: [
        { name: "Telmisartan 40mg", dosage: "1 tab", frequency: "Once daily (Morning after breakfast)", duration: "30 days", instructions: "Do not stop abruptly" },
        { name: "Rosuvastatin 10mg", dosage: "1 tab", frequency: "Once daily (Night after dinner)", duration: "30 days", instructions: "Avoid grapefruit juice" },
        { name: "Metoprolol Succinate 25mg", dosage: "1 tab", frequency: "Once daily (Morning)", duration: "30 days", instructions: "Check pulse weekly" }
      ],
      warnings: ["Allergy Warning: Patient allergic to Penicillin. Verified safe."],
      dispenseStatus: "DISPENSED"
    },
    {
      id: "rx-502",
      rxNumber: "RX-2026-0906-02",
      patientId: "pat-102",
      doctorId: "doc-2",
      date: "2026-09-06",
      diagnosis: "Atopic Dermatitis / Eczema (ICD-10 L20.9)",
      medicines: [
        { name: "Tacrolimus Ointment 0.1%", dosage: "Thin layer", frequency: "Twice daily", duration: "14 days", instructions: "Apply to affected lesions only" },
        { name: "Levocetirizine 5mg", dosage: "1 tab", frequency: "Night at bedtime", duration: "10 days", instructions: "May cause drowsiness" },
        { name: "Ceramide Moisturizing Cream", dosage: "Liberal amount", frequency: "Thrice daily", duration: "Ongoing", instructions: "Apply within 3 mins after bath" }
      ],
      warnings: [],
      dispenseStatus: "READY_FOR_PICKUP"
    }
  ],

  diagnostics: [
    {
      id: "diag-601",
      reportNumber: "RPT-2026-0906-01",
      patientId: "pat-101",
      testName: "Comprehensive Lipid Profile",
      orderedBy: "Dr. Arvind Swaminathan",
      date: "2026-09-06",
      status: "COMPLETED",
      abnormalFlag: true,
      results: [
        { parameter: "Total Cholesterol", value: "218 mg/dL", normalRange: "< 200 mg/dL", isAbnormal: true },
        { parameter: "Triglycerides", value: "172 mg/dL", normalRange: "< 150 mg/dL", isAbnormal: true },
        { parameter: "HDL (Good) Cholesterol", value: "42 mg/dL", normalRange: "> 40 mg/dL", isAbnormal: false },
        { parameter: "LDL (Bad) Cholesterol", value: "141 mg/dL", normalRange: "< 100 mg/dL", isAbnormal: true }
      ]
    },
    {
      id: "diag-602",
      reportNumber: "RPT-2026-0905-02",
      patientId: "pat-103",
      testName: "MRI Right Knee Joint (Non-Contrast)",
      orderedBy: "Dr. Rahul Sharma",
      date: "2026-09-05",
      status: "COMPLETED",
      abnormalFlag: true,
      findings: "Grade II posterior horn tear of the medial meniscus. Mild joint effusion.",
      scanImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80"
    }
  ],

  growthMetrics: {
    monthlyTarget: 500000,
    revenueGenerated: 342600,
    revenuePending: 38400,
    revenueRecovered: 64200, // Actual database-calculated from recovered no-shows/rebookings
    followUpRevenue: 98400,
    reactivationRevenue: 48500,
    totalAppointmentsThisMonth: 348,
    completedAppointments: 304,
    cancelledAppointments: 22,
    noShowAppointments: 22,
    recoveredAppointments: 16,
    noShowRecoveryRate: 72.7, // %
    leadConversionRate: 41.2, // %
    avgResponseTimeMinutes: 1.4,
    aiHandledConversationsCount: 890,
    humanHandoffCount: 42
  },

  automationTemplates: [
    {
      id: "tmpl-1",
      name: "Smart 24-Hour WhatsApp Appointment Reminder",
      trigger: "APPOINTMENT_SCHEDULED_24H_BEFORE",
      channel: "WHATSAPP",
      isActive: true,
      hindiAvailable: true,
      bodyEn: "Namaste {{patient_name}}! Reminder for your appointment with {{doctor_name}} tomorrow at {{appointment_time}} at Apex Clinic. Reply 1 to Confirm or 2 to Reschedule.",
      bodyHi: "नमस्ते {{patient_name}}! कल {{appointment_time}} पर एपेक्स क्लिनिक में {{doctor_name}} के साथ आपकी अपॉइंटमेंट है। कन्फर्म करने के लिए 1 या रीशेड्यूल करने के लिए 2 रिप्लाई करें।",
      sentCount: 312,
      confirmRate: 88.4
    },
    {
      id: "tmpl-2",
      name: "Intelligent No-Show Reschedule Recovery",
      trigger: "APPOINTMENT_NO_SHOW_30M",
      channel: "WHATSAPP",
      isActive: true,
      hindiAvailable: true,
      bodyEn: "Namaste {{patient_name}}, we noticed you couldn't attend your {{appointment_time}} appointment with {{doctor_name}}. Would you like to reschedule for tomorrow?",
      bodyHi: "नमस्ते {{patient_name}}, हमने देखा कि आप {{doctor_name}} के साथ अपनी अपॉइंटमेंट में उपस्थित नहीं हो सके। क्या आप कल के लिए नया समय चुनना चाहेंगे?",
      sentCount: 22,
      confirmRate: 72.7
    },
    {
      id: "tmpl-3",
      name: "Inactive 90-Day Patient Care Check-in",
      trigger: "PATIENT_INACTIVE_90_DAYS",
      channel: "WHATSAPP",
      isActive: true,
      hindiAvailable: true,
      bodyEn: "Namaste {{patient_name}}, it's been 3 months since your last health consultation at Apex Clinic. Keeping regular checkups helps prevent chronic complications. Would you like to book a routine review with {{doctor_name}}?",
      bodyHi: "नमस्ते {{patient_name}}, एपेक्स क्लिनिक में आपके अंतिम चेकअप को 3 महीने हो गए हैं। क्या आप अपने डॉक्टर के साथ रूटीन रिव्यू बुक करना चाहेंगे?",
      sentCount: 68,
      confirmRate: 26.5
    },
    {
      id: "tmpl-4",
      name: "Post-Consultation Experience & Google Review",
      trigger: "APPOINTMENT_COMPLETED_2H",
      channel: "WHATSAPP",
      isActive: true,
      hindiAvailable: false,
      bodyEn: "Hi {{patient_name}}, thank you for visiting Apex Clinic today! How was your consultation with {{doctor_name}}? Rate us on Google: https://g.page/r/apex-review",
      bodyHi: "",
      sentCount: 290,
      confirmRate: 34.2
    }
  ],

  aiInsights: [
    {
      id: "ins-1",
      title: "No-Show Recovery Engine Generated ₹64,200 This Month",
      evidence: "16 out of 22 missed appointments were automatically recovered via WhatsApp instant re-booking links with an average recovery time of 42 minutes.",
      suggestedAction: "Enable the 2-hour pre-appointment confirmation SMS prompt to push recovery rate beyond 80%.",
      category: "REVENUE",
      impact: "HIGH",
      badgeColor: "#10b981"
    },
    {
      id: "ins-2",
      title: "High Unmet Demand for Saturday Evening Dermatology Slots",
      evidence: "Dr. Priya Nair's Saturday slots are 100% booked with 14 prospective leads placed on waitlists over the last 3 weeks.",
      suggestedAction: "Open a 3-hour extension slot on Saturday from 06:00 PM to 09:00 PM or add an associate dermatologist.",
      category: "CAPACITY",
      impact: "HIGH",
      badgeColor: "#0ea5e9"
    },
    {
      id: "ins-3",
      title: "Instagram Leads Convert at 46% vs 24% on Google Search",
      evidence: "Patients inquiring about cosmetic skin treatments via Instagram direct integration have an average booking conversion time of under 3 hours when greeted by CareFlow AI.",
      suggestedAction: "Allocate 25% more budget to Instagram cosmetic campaigns and enable automated slot reservation prompts.",
      category: "ACQUISITION",
      impact: "MEDIUM",
      badgeColor: "#a855f7"
    }
  ]
};
