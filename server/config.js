var config = {
  port: process.env.PORT || 3000,
  
  twilioAccountSID: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,

  notify_cooldown: process.env.NOTIFY_COOLDOWN || 1  // Minute
};

config.notify_cooldown *= 60 * 1000;  // Convert to milliseconds;

module.exports = config;