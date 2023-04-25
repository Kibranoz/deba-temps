<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title> Accueil</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <div class="welcomeText">
                Bienvenue dans l'application Débatemps.
            <br>
                Vous pouvez choisir un type de débat dans le menu de droite. 
            </div>
            <div class="credits">
                <b>Crédit Son (retrouvés sur FreeSound)</b>
                </div>
                <ul>
                    Joe DeShon : son tappe pour le début et la fin du temps protégé
                </ul>
                <ul>
                    MoonCubeDesign : Son de début du temps de grâce, son des notification
                </ul>
                <ul>
                   Anagar : Son de fin du temps de grâce 
                </ul>
            </ion-content>
    </ion-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/vue";

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
    height:auto;
    padding-left: 10px;
    padding-right: 10px;
}
.credits{
    display: flex;
    justify-self: center;
    align-self: center;
    height:auto;
    padding-left: 10px;
    padding-right: 10px;
}
</style>