import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './helper.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJson = async function (url) {
  try {
    const fetchProm = fetch(url);
    const res = await Promise.race([fetchProm,timeout(0.5)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} 😞 ${res.status}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};
