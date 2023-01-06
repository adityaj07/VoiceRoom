//This is a service file which consists of all the logic that goes behind a service, here it is, Otp Service. The class here will be exported and the methods inside the class will be called inside the auth-controller as needed, thus, keeping our code clean and modular
const crypto = require("crypto");
const hashService = require("./hash-service");
const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require("twilio")(smsSid, smsAuthToken, { lazyLoading: true });

class OtpService {
  async generateOtp() {
    // Generating OTP -> 4-digit random otp number though we can use javascript's math.random function..but we will use node's built-in crypto module which has this => crypto.randomInt(1000,9999)
    const otp = crypto.randomInt(1000, 9999);
    return otp;
  }

  async sendBySms(phone, otp) {
    return await twilio.messages.create({
      to: phone, //whom to send
      from: process.env.SMS_FROM_NUMBER, //from where to send
      body: `Hey there !! \nHere's your VoiceRoom OTP: ${otp} \nHave a great conversation.`, // what to send
    });
  }

  verifyOtp(hasedOtp, data) {
    let computedHash = hashService.hashOtp(data);

    return computedHash === hasedOtp;
  }
}

module.exports = new OtpService();
