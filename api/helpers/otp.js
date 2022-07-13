const otpGenerator = require("otp-generator");

function generate_otp() {
  return otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
}

module.exports = {
  generate_otp,
};
