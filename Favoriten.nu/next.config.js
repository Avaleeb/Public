const withPWA = require('next-pwa');
const withSass = require('@zeit/next-sass');


const prodConfig = withSass(withPWA({
  pwa: {
    dest: 'public',
  },
  env: {
    GoogleAPIKey: 'Replace',
    GoogleAnalyticsId: 'Replace',
    HittaApiKey: 'Replace',
    Hitta_id: 'Favoriten.nu',
    AdminId: 'tomoscarjens',
    baseUrl: 'https://favoriten.nu',
  },
}));

const devConfig = withSass(withPWA({
  pwa: {
    dest: 'public',
  },
  env: {
    GoogleAPIKey: 'replace',
    GoogleAnalyticsId: 'replace',
    HittaApiKey: 'replace',
    Hitta_id: 'Favoriten.nu',
    AdminId: 'tomoscarjens',
    baseUrl: 'http://localhost:3000',
  },
}));


module.exports = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
