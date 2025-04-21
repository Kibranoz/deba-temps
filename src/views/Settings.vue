<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title> {{ $t("settings.title") }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-item>
                <ion-label>{{ $t("settings.playMinutesRemainingSound") }}</ion-label>
                <ion-toggle @ion-change="updatePlayMinuteSoundSettings" slot="end" v-model="shouldPlayMinuteSounds"
                    :checked="shouldPlayMinuteSounds"></ion-toggle>
            </ion-item>
            <ion-item>
                <ion-label>{{ $t("settings.countUp") }}</ion-label>
                <ion-toggle @ion-change="updateCountUpSettings" slot="end" v-model="shouldCountUp"
                    :checked="shouldCountUp"></ion-toggle>
            </ion-item>
        </ion-content>
    </ion-page>
</template>
<style></style>
<script lang="ts">
import { IonPage, IonHeader, IonTitle, IonContent, IonItem, IonLabel, IonMenuButton, IonToggle, IonToolbar, IonButtons } from '@ionic/vue'
import { Preferences } from '@capacitor/preferences'
import { defineComponent } from 'vue'
import { toHandlerKey } from 'vue'

export default defineComponent({
    name: "SettingsView",
    components: {
        IonPage,
        IonHeader,
        IonTitle,
        IonButtons,
        IonContent,
        IonMenuButton,
        IonToolbar,
        IonItem,
        IonLabel,
        IonToggle

    },
    data() {
        return {
            shouldPlayMinuteSounds: false,
            shouldCountUp: false
        }
    },
    async mounted() {
        await Preferences.get({ key: "playMinuteSoundSetting" }).then((value) => {
            this.shouldPlayMinuteSounds = value.value == "true" ? true : false
        })
        await Preferences.get({ key: "countUpSetting" }).then((value) => {
            this.shouldCountUp = value.value == "true" ? true : false
        })
        console.log("sounnd setting", this.shouldPlayMinuteSounds)
    },
    methods: {
        async updatePlayMinuteSoundSettings() {
            console.log("this.setting", this.shouldPlayMinuteSounds)
            await Preferences.set({
                key: "playMinuteSoundSetting",
                value: this.shouldPlayMinuteSounds.toString()
            })
        },
        async updateCountUpSettings() {

            await Preferences.set({
                key: "countUpSetting",
                value: this.shouldCountUp.toString()
            })

        }
    }
})
</script>