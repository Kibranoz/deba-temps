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

const messages =  {
    fr:{
      titles:{
      bp : "Parlementaire Britanique",
      cp: "Parlementaire Canadien",
      usp:"Parlementaire Américain"
    },
    options: {
    cp: {
      title:"Parlementaire Canadien",
      pmOption: "Premier ministre : Rondes de 7-3 ou 6-4 minutes",
      coOption: "Chef de l'opposition : Une longue ronde (Traditionnel) ou divisée (Split)",
      split: "Split",
      trad: "Traditionnel",
      confirm: "Confirmer"
    },
    bp: {
      title: "Parlementaire Britannique",
      nbMinutes: "Nombre de minutes"
    }
  },
  debateView: {
    whoIsTalking: "Qui parle?",
    poi: "Questions autorisées ? (POI)",
    yes: "Oui",
    no: "Non"
  },
    roles :{
      cp:{
        pm:"Première ministre",
        co:"Chef de l'opposition",
        mc: "Ministre de la couronne",
        mo: "Membre de l'opposition"
      },
      ap: {
        pm:"Président de la chambre",
        co:"Cheffe de la minorité",
        mg:"Membre de la majorité",
        mo: "Membre de la minorité"
      },
      bp: {
        pm: "Premier ministre",
        co:"Cheffe de l'opposition",
        vpm: "Vice Premier ministre",
        cao: "Chef adjoint de l'opposition",
        mg: "Membre du gouvernement",
        mo: "Membre de l'opposition",
        wg: "Whip du gouvernement",
        wo: "Whip de l'opposition"
      }
    }
  },
  en:{
    titles:{
    bp : "British Parliamentary",
    cp: "Canadian Parliamentary",
    usp:"American parliamentary"
    },
    options: {
      cp: {
        title:"Canadian Parliamentary",
        pmOption: "Prime minister 6-4  or 7-3 minutes rounds",
        coOption: "Chief of the opposition : One long round (Traditionnal) or Split",
        split: "Split",
        trad: "Traditionnal",
        confirm: "Confirm"
      },
      bp: {
        title: "British Parliamentary",
        nbMinutes: "Number of minutes"
      }
    },
    debateView: {
      whoIsTalking: "Who is talking?",
      poi: "Questions allowed ? (POI)",
      yes: "Yes",
      no: "No"
    },
    roles :{
      cp:{
        pm:"Prime Minister",
        co:"Opposition leader",
        mc: "Crown Minister",
        mo: "Opposition member"
      },
      ap: {
        pm:"Speaker of the House",
        co:"Minority Leader",
        mg:"Member of the majority",
        mo: "Member of the minority"
      },
      bp: {
        pm: "Prime minister",
        co:"Chief of the opposition",
        vpm: "Deputy prime minister",
        cao: "Deputy leader of the opposition",
        mg: "Member of the governement",
        mo: "Membre of the opposition",
        wg: "Government whip",
        wo: "Opposition whip"
      }
    }
  },
}

const lang = navigator.language == "fr"?"fr":"en";


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
});