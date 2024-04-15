import crypto from "crypto";

export function generateUniqueApiKeyPassword() {
    const length = 8; // Minimum length for an API key password
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"; // Allowed characters
  
    let password = "";
  
    // Ensure at least one of each character type
    const specialChar = "!@#$%^&*()_+";
    const upperCaseChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChar = "abcdefghijklmnopqrstuvwxyz";
    const numberChar = "0123456789";
  
    password +=
      specialChar[Math.floor(Math.random() * specialChar.length)] +
      upperCaseChar[Math.floor(Math.random() * upperCaseChar.length)] +
      lowerCaseChar[Math.floor(Math.random() * lowerCaseChar.length)] +
      numberChar[Math.floor(Math.random() * numberChar.length)];
  
    // Fill the rest of the password with random characters
    for (let i = 0; i < length - 4; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }
  
    // Shuffle the characters to make the password unique
    password = password.split("").sort(() => 0.5 - Math.random()).join("");
  
    return password;
  }
  

  export function generateUniqueName() {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
    while (true) {
      // Generate a random name of length between 6 and 20 characters
      const nameLength = Math.floor(Math.random() * 15) + 6;
      let subAccountName = '';
  
      for (let i = 0; i < nameLength; i++) {
        const randomChar = charset[Math.floor(Math.random() * charset.length)];
        subAccountName += randomChar;
      }
  
      // Check if the name is unique and not all letters or all numbers
      if (
        !subAccountName.match(/^[0-9]+$/) &&
        !subAccountName.match(/^[a-zA-Z]+$/) // Not all letters
      ) {
        return subAccountName;
      }
    }
  }
  export function calculateApiHash(apiKey, secretKey, subAcct, label, passphrase,ip) {
    const sha256 = crypto.createHash('sha256');
    sha256.update(apiKey + secretKey + subAcct + label + passphrase + ip);
    return sha256.digest('hex');
  }
  

  