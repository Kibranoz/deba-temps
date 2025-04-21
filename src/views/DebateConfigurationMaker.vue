import ConfigurationView from './ConfigurationView.vue';
<template>
    <ion-page>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-menu-button color="primary"></ion-menu-button>
            </ion-buttons>
            <ion-title> Round maker</ion-title>
        </ion-toolbar>
    </ion-page>
    <ion-content>
        <ConfigurationView :configOrder="1"></ConfigurationView>
    </ion-content>
</template>
<script setup lang="ts">
import { defineComponent } from 'vue'
import ConfigurationView from './ConfigurationView.vue'
</script>