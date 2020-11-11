/* eslint-disable no-bitwise */
import CryptoJS from 'crypto-js';
import axios from 'axios';

export default async function addPlace({ name, where }) {
  const nameEncoded = encodeURI(name);
  const whereEncoded = encodeURI(where.join('+'));
  const clientId = 'Favoriten.nu';
  const apiKey = '45jjwd16GqLa9Fkq15yOWbOk0driiD85TNSJljY7';
  const time = Math.floor(new Date().getTime() / 1000).toString();

  // eslint-disable-next-line no-unused-vars
  const randomString = [...Array(16)].map((i) => (~~(Math.random() * 36)).toString(36)).join('');

  // eslint-disable-next-line max-len
  const signatureHash = CryptoJS.enc.Hex.stringify(CryptoJS.SHA1(clientId + time + apiKey + randomString));
  return axios.get(`https://api.hitta.se/publicsearch/v1/companies?what=${nameEncoded}&where=${whereEncoded}&page.number=1&page.size=3`, {
    headers: {
      'X-Hitta-CallerId': clientId,
      'X-Hitta-Time': time,
      'X-Hitta-Random': randomString,
      'X-Hitta-Hash': signatureHash,
    },
  }).catch((error) => error).then((response) => response.data);
}
