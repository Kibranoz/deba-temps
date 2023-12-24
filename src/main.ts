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
    notifications: {
      title: "Le temps est écoulé",
      subtitle: "Terminez votre ronde"
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
  accessibility: {
    back: "Retourner à une ronde précédente",
    start: "Commencer le décompte",
    pause: "Mettre sur pause", 
    skip: "Passer cette ronde"
  },
  debateView: {
    whoIsTalking: "Qui parle?",
    poi: "Questions autorisées ?",
    yes: "Oui",
    no: "Non"
  },
    roles :{
      cp:{
        pm:"Premier(ère) ministre",
        co:"Chef(fe) de l'opposition",
        mc: "Ministre de la couronne",
        mo: "Membre de l'opposition"
      },
      ap: {
        pm:"Président(e) de la chambre",
        co:"Chef(fe) de la minorité",
        mg:"Membre de la majorité",
        mo: "Membre de la minorité"
      },
      bp: {
        pm: "Premier(ère) ministre",
        co:"Chef(fe) de l'opposition",
        vpm: "Vice Premier(ère) ministre",
        cao: "Chef(fe) adjoint(e) de l'opposition",
        mg: "Membre du gouvernement",
        mo: "Membre de l'opposition",
        wg: "Whip du gouvernement",
        wo: "Whip de l'opposition"
      }
    },
    welcome: {
      header: "Accueil",
      title: "Bienvenue dans l'application DébaTemps",
      desc: "Vous pouvez choisir un type de débat dans le menu de droite",
      soundCreditTitle: "Crédit son (Retrouvés sur FreeSound)",
      Joe: "Joe DeShon : Son de tappe pour le début et la fin du temps protégé",
      MoonCube: "MoonCubeDesign: Sound du début du temps de grâce, son des notifications",
      Anagar: "Anagar: Son d'applaudissement de fin du temps de grâce"   
    }
  },
  en:{
    titles:{
    bp : "British Parliamentary",
    cp: "Canadian Parliamentary",
    usp:"American parliamentary"
    },
    notifications: {
      title: "Time is over",
      subtitle: "Finish your round"
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
    accessibility: {
      back: "Go back to a previous round",
      start: "Start countdown",
      pause: "Pause", 
      skip: "Skip this round"
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
    },
    welcome: {
      header: "Welcome",
      title: "Welcome in the DébaTemps Application",
      desc: "You can choose a debate type in the right side menu",
      soundCreditTitle: "Sound credits (Found on FreeSound)",
      Joe: "Joe DeShon : Tap sound for the beginning and end of protected time",
      MoonCube: "MoonCubeDesign: Sound of the beginning of the last seconds of grace and sound of the notification",
      Anagar: "Anagar: Clapping sound when round is over"   
    }
  },
}

const lang = navigator.language.substring(0,2) == "fr"?"fr":"en";


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