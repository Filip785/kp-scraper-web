import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      rs: {
        translations: {
          'Grafičke Kartice': 'Grafičke Kartice',
          'Izaberite jezik': 'Izaberite jezik:',
          'Srpski': 'Srpski',
          'Engleski': 'Engleski',
          'Procesori': 'Procesori',
          'Maksimalan broj strana koje želite da pokrijete': 'Maksimalan broj strana koje želite da pokrijete',
          'Minimalna cena artikla (u evrima)': 'Minimalna cena artikla (u evrima)',
          'Maksimalna cena artikla (u evrima)': 'Maksimalna cena artikla (u evrima)',
          'Termini za pretragu': 'Termini za pretragu',
          'Obriši podatke': 'Obriši podatke',
          'Pošalji upit': 'Pošalji upit',
          'Ime fajla': 'Ime fajla',
          'Pronađeno oglasa': 'Pronađeno oglasa',
          'Datum kreiranja': 'Datum kreiranja',
          'Vreme kreiranja': 'Vreme kreiranja',
          'Veličina fajla': 'Veličina fajla',
          'Link za preuzimanje': 'Link za preuzimanje',
          'Klikni ovde': 'Klikni ovde',
          'Briše sve podatke iz tabele ispod': 'Briše sve podatke iz tabele ispod',
          'opisTerminaGPU': `Moguće je dodati više termina, na primer ako tražite RX 580 i RX 590 unesite prvo 580 i pritisnite 'Enter' pa unesite 590 i pritisnite 'Enter'`,
          'opisTerminaCPU': `Moguće je dodati više termina, na primer ako tražite Ryzen 3600X i Ryzen 3700X unesite prvo 3600X i pritisnite 'Enter' pa unesite 3700X i pritisnite 'Enter'`,
          'opisTerminaSSD': `Moguće je dodati više termina, na primer ako tražite Samsung 860 i Samsung 970 unesite prvo 860 i pritisnite 'Enter' pa unesite 970 i pritisnite 'Enter'`
        }
      },
      en: {
        translations: {
          'Grafičke Kartice': 'Graphic Cards',
          'Izaberite jezik': 'Choose your language:',
          'Srpski': 'Serbian',
          'Engleski': 'English',
          'Procesori': 'Processors',
          'Maksimalan broj strana koje želite da pokrijete': 'Maximum number of pages that you\'d like to scrape',
          'Minimalna cena artikla (u evrima)': 'Minimum product price (in euros)',
          'Maksimalna cena artikla (u evrima)': 'Maximum product price (in euros)',
          'Termini za pretragu': 'Search terms',
          'Obriši podatke': 'Delete search data',
          'Pošalji upit': 'Search',
          'Ime fajla': 'File name',
          'Pronađeno oglasa': 'Products found',
          'Datum kreiranja': 'Date created',
          'Vreme kreiranja': 'Time created',
          'Veličina fajla': 'File size',
          'Link za preuzimanje': 'Download link',
          'Klikni ovde': 'Click here',
          'Briše sve podatke iz tabele ispod': 'Deletes all the data from table below',
          'opisTerminaGPU': `It's possible to add multiple search terms, for example if you are looking for RX 580 & 590, type '580' and press 'Enter', then type '590' and press 'Enter'`,
          'opisTerminaCPU': `It's possible to add multiple search terms, for example if you are looking for Ryzen 3600X i Ryzen 3700X, type '3600X' and press 'Enter', then type '3700X' and press 'Enter'`,
          'opisTerminaSSD': `It's possible to add multiple search terms, for example if you are looking for Samsung 860 and Samsung 970, type '860' and press 'Enter', then type '970' and press 'Enter'`
        }
      },
    },
    fallbackLng: localStorage.getItem('i18nextLng') || 'rs',
    lng: localStorage.getItem('i18nextLng') || 'rs',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
