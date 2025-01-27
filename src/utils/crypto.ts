"use client";
import CryptoJS from "crypto-js";

const SECRET = process.env.NEXT_PUBLIC_SHARED_SECRET;
const FIXED_SALT = process.env.NEXT_PUBLIC_FIXED_SALT;

let key: CryptoJS.lib.WordArray | undefined;;

if (typeof window !== "undefined") {
  if (!SECRET) throw new Error("SECRET is not set");
  if (!FIXED_SALT) throw new Error("FIXED_SALT is not set");

  key = CryptoJS.PBKDF2(SECRET, FIXED_SALT, {
    keySize: 256/32,
    iterations: 1000
  });
}

export function encrypt(text: string) {
  if (!text || !key) return "";
  return CryptoJS.AES.encrypt(text, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString();
};

export function decrypt(text: string) {
  if (!text || !key) return "";
  return CryptoJS.AES.decrypt(text, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8);
};
