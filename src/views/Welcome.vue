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
                Bienvenue dans l'application Débatemps

                Vous pouvez choisir un type de débat dans le menu de droite. 
            </div>
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
</style>