//This is a controller file from where auth will be controlled and the services will be called from here.
const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");

class AuthController {
  async sendOtp(req, res) {
    //logic for getting the phone number from the request body and validation if the user has filled it.
    const { phone } = req.body;
    if (!phone) {
      res.status(400).json({ message: "Phone field is required" });
    }

    //Generating an otp
    const otp = await otpService.generateOtp();

    //Hashing the the genrated otp
    const ttl = 1000 * 60 * 2; // 2 minutes expire time for otp...ttl means time to leave
    const expires = Date.now() + ttl; // expire time from current time, i.e, current time + ttl
    const data = `${phone}.${otp}.${expires}`;
    const hash = hashService.hashOtp(data); // finally a hash will be generated that would consist of data to be hashed --> phone_number.otp.expire_time...and this data will the be sent to hashOtp(data) function to get hashed

    //Send otp
    try {
      await otpService.sendBySms(phone, otp);
      res.json({
        hash: `${hash}.${expires}`,
        // here we will be sending the hash and the expires time as well so that when next time there is a request to verify the otp then will just check the expire time from here that the otp has expired or not by using split('.').
        phone,
      });
    } catch (err) {
      console.log(err);
      res.sendStatus(500).json({ message: `Message sending failed` });
    }

    //res.json({ hash: hash }); //Sending hash to mobile number using a 3rd party service..here we will be using twilio
  }

  async verifyOtp(req, res) {
    //logic
    const { otp, hash, phone } = req.body;
    if (!otp || !hash || !phone) {
      res.sendStatus(400).json({ message: "All fields required!!" });
    }

    const [hasedOtp, expires] = hash.split(".");
    if (Date.now() > +expires) {
      res.sendStatus(400).json({ message: "OTP expired!" });
    }

    const data = `${phone}.${otp}.${expires}`;

    const isValid = otpService.verifyOtp(hasedOtp, data);
    if (!isValid) {
      res.status(400).json({ message: "Invalid OTP" });
    }

    let user;

    try {
      user = await userService.findUser({ phone: phone }); //find if the user trying to register is already registered by findUser method which has a filter passed in which is an object that ha phone type phone number that we get above
      if (!user) {
        // if we donot find any user with the same number then will just create one
        user = await userService.createUser({ phone: phone });
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500).json({ message: "DB error..." });
    }

    //token
    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      activated: false,
    });

    res.cookie("refreshtoken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true, // by keeping this true javascript on client wont be able to read the cookie only the server can read it
    });

    res.json({ accessToken });
  }
}

module.exports = new AuthController(); //Singleton way of doing....i.e...it wont create new object everytime it is called, it will return the same object
