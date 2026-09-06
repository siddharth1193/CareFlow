export const automationService = {
  /**
   * Check if current time falls within Quiet Hours (e.g. 9 PM - 8:30 AM IST)
   */
  isQuietHours: (currentHour = new Date().getHours()) => {
    return currentHour >= 21 || currentHour < 8;
  },

  /**
   * Validate if a message can be dispatched safely to a patient
   */
  canSendMessage: ({ patient, channel = 'whatsapp', isMarketing = false, dailyCount = 1 }) => {
    if (!patient) return { allowed: false, reason: 'Patient record not found' };

    // 1. Channel Consent Check
    if (channel === 'whatsapp' && !patient.consent?.whatsapp) {
      return { allowed: false, reason: 'Patient has opted out of WhatsApp communications' };
    }
    if (channel === 'sms' && !patient.consent?.sms) {
      return { allowed: false, reason: 'Patient has opted out of SMS communications' };
    }

    // 2. Marketing Consent Check
    if (isMarketing && !patient.consent?.marketing) {
      return { allowed: false, reason: 'Patient has not granted marketing / promotional consent' };
    }

    // 3. Quiet Hours Check for Non-Transactional Messages
    if (isMarketing && automationService.isQuietHours()) {
      return { allowed: false, reason: 'Outreach queued: Currently in Quiet Hours (09:00 PM - 08:30 AM IST)' };
    }

    // 4. Rate Limiting (Max 3 automated messages per day)
    if (dailyCount >= 3) {
      return { allowed: false, reason: 'Rate limit exceeded (Max 3 messages/patient/day)' };
    }

    return { allowed: true };
  },

  /**
   * Simulate trigger execution with audit log entry
   */
  executeTrigger: ({ triggerType, patient, appointment, lead, customPayload }) => {
    const timestamp = new Date().toISOString();
    const logId = `log-${Date.now()}`;

    return {
      logId,
      triggerType,
      recipient: patient?.name || lead?.name || 'Unknown',
      phone: patient?.phone || lead?.phone,
      status: 'SUCCESS',
      timestamp,
      channel: 'WHATSAPP',
      summary: `Automated ${triggerType} dispatched via CareFlow WhatsApp Provider Adapter.`
    };
  }
};
