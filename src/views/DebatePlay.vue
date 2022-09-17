<template>
<ion-page>
        <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title> Debate {{ $route.params.id }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
<div id="debatePlay">
    <div class="currentTime">
        {{time}}
    </div>
    <div class="controlArea">
        <ion-icon class="button" :icon="playSkipBackOutline" @click="backward"></ion-icon>
        <ion-icon class="button" v-if="!isPlaying" @click="play" :icon="caretForwardOutline"></ion-icon>
        <ion-icon class="button" v-if="isPlaying" @click="pause" :icon="pauseOutline"></ion-icon>
        <ion-icon class="button" :icon="playSkipForwardOutline" @click="forward"></ion-icon>
    </div>

    <div class="informationArea">
    <ion-icon :icon="chatbubblesOutline"></ion-icon>
    <div>:</div>
    {{ role }}
</div>

<div class="informationArea">
    <ion-icon :icon="chatbubblesOutline"></ion-icon>
    <div>:</div>
    {{ canTalk }}
</div>
    </div>
    </ion-content>
</ion-page>
</template>
<script lang="ts">

import configuration from "@/models/configurations";
import  debate from "@/models/debate";
import timer from "@/models/timer";
import eightMinutes from "@/realizations/DebateConfigurations/eightMinutes";
import fifteenSeconds from "@/realizations/DebateConfigurations/fifteenSeconds";
import sevenMinutes from "@/realizations/DebateConfigurations/sevenMinutes";
import sixMinutes from "@/realizations/DebateConfigurations/sixMinutes";
import tenMinutes from "@/realizations/DebateConfigurations/tenMinutes";
import thirtySeconds from "@/realizations/DebateConfigurations/thirtySeconds";
import { debuggerStatement } from "@babel/types";
import { IonContent, IonHeader, IonIcon, IonPage, IonTitle } from "@ionic/vue";
import {caretForwardOutline, pauseOutline, playSkipBackOutline, playSkipForwardOutline, chatbubblesOutline} from "ionicons/icons"
import { defineComponent } from "vue";


export default defineComponent({
    name:"DebatePlay",
    components: {
        IonPage,
        IonHeader,
        IonTitle,
        IonContent, 
        IonIcon
    },
    setup() {
        return {
            caretForwardOutline,
            playSkipBackOutline,
            playSkipForwardOutline,
            pauseOutline,
            chatbubblesOutline
        }
    },
    data() {
        return {
            isPlaying:false,
            currentDebate: new debate([new sixMinutes(), new fifteenSeconds(),new tenMinutes()], ["role 1", "role b"]),
            role : "",
            canTalk : "",
            time: "0:0:0"
         }
    },
    computed: {
        currentConfigurationIndex() {
            console.log("currentConfigurationINdex")
            return this.currentDebate.configurationIndex;
        },
        currentDebatePlaying() {
            return this.currentDebate.debateTimer.playing;
        }

    },

    created() {
        setInterval(()=>{
            this.currentDebate.getTimer().tick()
            this.time = this.currentDebate.getTimer().getTimeString();
            this.role = this.currentDebate.getWhoIsTalking()
            this.canTalk = (this.currentDebate.getIfPOIAllowed() ? "Oui" : "Non") ;
            if (this.currentDebate.debateTimer.currentTime == 0 && this.currentDebate.getTimer().playing) {
            this.currentDebate.nextConfiguration();
            }
            if (this.currentDebate.getTimer().playing) {
            this.isPlaying = true;
        }
        else {
            this.isPlaying = false;
        }
            }
            ,1000)
    },


    methods : {
        play() {
            this.isPlaying = true;
            this.currentDebate.debateTimer.play()
            console.log("playing")
        },

        pause() {
            this.isPlaying = false;
            this.currentDebate.debateTimer.pause();
        },
        forward() {
            this.currentDebate.fastForward();
        },
        backward() {
            this.currentDebate.fastBackward();
        },

        newRoleDetected(){
            this.role = this.currentDebate.getWhoIsTalking()
        }

    }

    

})
</script>
<style lang="css">
.hidden {
    display: none;
}
#debatePlay{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
}

ion-icon {
    font-size: 40px;
}

.controlArea, .informationArea{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: 50px;


}


.currentTime {
    display: flex;
    align-self: center;
    font-size: 40px;
    justify-content: center;

}
</style>