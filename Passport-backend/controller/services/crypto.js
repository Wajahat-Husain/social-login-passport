import cryptoJs from "crypto-js";

const encryptData = (data, encryptionKey) => {
  return cryptoJs.AES.encrypt(data, encryptionKey).toString();
};

export { encryptData };
