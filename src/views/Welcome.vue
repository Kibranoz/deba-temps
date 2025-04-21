<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>{{ $t("welcome.header") }}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <div class="welcomeText">
                {{ $t("welcome.title") }}
                <br>
                {{ $t("welcome.desc") }}
            </div>
            <div class="credits">
                <b>{{ $t("welcome.soundCreditTitle") }}</b>
            </div>
            <ul>
                <li>
                    {{ $t("welcome.alshred") }}
                </li>
                <li>
                    {{ $t("welcome.MoonCube") }}
                </li>
                <li>
                    {{ $t("welcome.tubbers") }}
                </li>
                <li>
                    {{ $t("welcome.cabled_mess") }}
                </li>
            </ul>
            <a class="link"
                href='https://sites.google.com/view/louis-couture/politique-de-confidentialit%C3%A9?authuser=0'> {{
                    $t("welcome.privacy_policy") }}</a>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/vue"

export default defineComponent({
    name: 'WelcomePage',
    components: {
        IonPage,
        IonButtons,
        IonMenuButton,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonContent,
    }
}

)
</script>
<style>
.welcomeText {
    display: flex;
    justify-self: center;
    align-self: center;
    font-size: 20px;
    height: auto;
    padding-left: 10px;
    padding-right: 10px;
}

.credits {
    display: flex;
    justify-self: center;
    align-self: center;
    height: auto;
    padding-left: 10px;
    padding-right: 10px;
}

.link {
    padding-left: 10px;
}
</style>