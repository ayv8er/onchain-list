import CryptoJS from "crypto-js";

const SECRET = process.env.NEXT_PUBLIC_SHARED_SECRET as string;
const FIXED_SALT = process.env.NEXT_PUBLIC_FIXED_SALT as string;

if (!SECRET) throw new Error("SECRET is not set");
if (!FIXED_SALT) throw new Error("FIXED_SALT is not set");

const key = CryptoJS.PBKDF2(SECRET, FIXED_SALT, {
  keySize: 256/32,
  iterations: 1000
});

export function encrypt(text: string) {
  if (!text) return '';
  return CryptoJS.AES.encrypt(text, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString();
};

export function decrypt(text: string) {
  if (!text) return '';
  return CryptoJS.AES.decrypt(text, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8);
};