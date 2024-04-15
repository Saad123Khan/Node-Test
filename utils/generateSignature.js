import crypto from "crypto";

export const generateSignature = (secretKey) => {
    const timestamp = new Date() / 1000;
    const prehash = timestamp + "GET" + "/users/self/verify";
    const hmac = crypto.createHmac("sha256",secretKey);
    const signature = hmac.update(prehash).digest("base64");
    return signature;
  };