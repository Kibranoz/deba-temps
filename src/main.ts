import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
import { createI18n } from 'vue-i18n'
import enFile from "../public/assets/strings/en.json"
import frFile from "../public/assets/strings/fr.json"
import deFile from "../public/assets/strings/de.json"
import esFile from "../public/assets/strings/es.json"
import idFile from "../public/assets/strings/id.json"
import itFile from "../public/assets/strings/it.json"
import jaFile from "../public/assets/strings/ja.json"
import koFile from "../public/assets/strings/ko.json"
import ptFile from "../public/assets/strings/pt.json"
import ruFile from "../public/assets/strings/ru.json"
import svFile from "../public/assets/strings/sv.json"
import trFile from "../public/assets/strings/tr.json"
import zhFile from "../public/assets/strings/zh.json"



 

const messages =  {
    en:enFile, fr: frFile, de:deFile, es:esFile, id:idFile, it: itFile, ja: jaFile, ko: koFile, 
    pt:ptFile, ru:ruFile, sv:svFile, tr: trFile, zh:zhFile
}

let lang = navigator.language.substring(0,2) 
const supportedLanguages = Object.keys(messages)
if (!supportedLanguages.includes(lang)){
  lang = "en"
}
export const i18n = createI18n({
  legacy: false,
  useScope:'global',
  locale: lang,
  messages
})



/* Theme variables */
import './theme/variables.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(i18n);
  
router.isReady().then(() => {
  app.mount('#app');
})