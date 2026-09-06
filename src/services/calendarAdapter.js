export const calendarAdapter = {
  activeProvider: 'GOOGLE_CALENDAR', // 'GOOGLE_CALENDAR' | 'OUTLOOK' | 'MOCK'
  syncStatus: 'SYNCED', // 'SYNCED' | 'SYNCING' | 'ERROR'
  lastSyncTime: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),

  syncDoctorAvailability: async (doctorId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          doctorId,
          syncedSlotsCount: 14,
          provider: 'Google Calendar API v3 (OAuth2 Verified)',
          timestamp: new Date().toISOString()
        });
      }, 600);
    });
  },

  createAppointmentEvent: async (appointment, doctor, patient) => {
    return {
      eventId: `gcal-${Date.now()}`,
      calendarId: `dr.${doctor.id}@apexhealth.in`,
      summary: `CareFlow Consult: ${patient.name} with ${doctor.name}`,
      description: `Reason: ${appointment.reason}\nUHID: ${patient.uhid}\nFee: ₹${appointment.fee}\nMode: ${appointment.type}`,
      start: { dateTime: `${appointment.date}T10:00:00+05:30` },
      end: { dateTime: `${appointment.date}T10:30:00+05:30` },
      status: 'confirmed',
      hangoutLink: appointment.type === 'TELEHEALTH' ? `https://careflow.meet/apex-${appointment.id}` : null
    };
  }
};
