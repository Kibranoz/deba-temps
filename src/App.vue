<template>
  <ion-app :lang="language">
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-list-header>DébatTemps</ion-list-header>
  
            <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :href="p.url" :router-link="p.url" lines="none" :detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <img :src="items[i]">
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
import { createApp, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { archiveOutline, archiveSharp, bookmarkOutline, bookmarkSharp, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import { useI18n } from "vue-i18n";


export default defineComponent({
  name: 'App',
  components: {
    IonApp, 
    IonContent, 
    //IonIcon, 
    IonItem, 
    IonLabel, 
    IonList, 
    IonListHeader, 
    IonMenu, 
    IonMenuToggle,  
    IonRouterOutlet, 
    IonSplitPane,
  },
  data() {
    return {
      items:["/assets/uk.svg", "/assets/canada.svg", "/assets/usa.svg", "assets/mace.svg", "assets/settings.svg"],
      language: 'fr'
    }
  },
  beforeMount() {
    this.language = navigator.language.substring(0,2) == "fr"?"fr":"en";
  }, 
  setup() {
    const { t } = useI18n();

    const selectedIndex = ref(2);
    const appPages = [
      {
        title: t('titles.bp'),
        url: '/debatePlay/uk',
      },
      {
        title: t('titles.cp'),
        url: '/debatePlay/ca',
      },
      {
        title: t('titles.usp'),
        url: '/debatePlay/us',
      },
      {
        title: t("titles.me"),
        url: '/debatePlay/me'
      },
      {
        title: t("settings.title"),
        url: "/settings"
      }

      /** {
        //title: 'Testing',
        url: '/debatePlay/test'
      }
      **/
    ];



  const path = window.location.pathname;
  console.log(path)
    if (path !== undefined) {
      selectedIndex.value = appPages.findIndex(page => page.url.toLowerCase() === path.toLowerCase());
    }

    
    
    const route = useRoute();
    
    return { 
      selectedIndex,
      appPages, 
      archiveOutline, 
      archiveSharp, 
      bookmarkOutline, 
      bookmarkSharp, 
      heartOutline, 
      heartSharp, 
      mailOutline, 
      mailSharp, 
      paperPlaneOutline, 
      paperPlaneSharp, 
      trashOutline, 
      trashSharp, 
      warningOutline, 
      warningSharp,
      isSelected: (url: string) => url === route.path ? 'selected' : ''
    }
  }
});
</script>

<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item img {
  margin: 10px;
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>
