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
    <div>
    <div class="currentTime">
        {{time}}
    </div>
    <div class="controlArea">
        <ion-icon class="button" :icon="playSkipBackSharp" @click="backward"></ion-icon>
        <ion-icon class="button" v-if="!isPlaying" @click="play" :icon="caretForwardSharp"></ion-icon>
        <ion-icon class="button" v-if="isPlaying" @click="pause" :icon="pauseSharp"></ion-icon>
        <ion-icon class="button" :icon="playSkipForwardSharp" @click="forward"></ion-icon>
    </div>
    </div>

    <ion-modal class="canadianDebate" :is-open="true">
    <p>Canadien parlementaire</p>
    <p>Premier ministre : 6-4 ou 7-3</p>
    <span>
        <ion-button forArea="primeMinisterSelect" id="sixFour" @click="greenify('sixFour')">6-4</ion-button>
        <ion-button forArea="primeMinisterSelect" id="sevenThree" @click="greenify('sevenThree')">7-3</ion-button>
    </span>

    <p>Membre de l'opposition : Split ou traditionnel</p>
    <span>
        <ion-button forArea="oppositionMemberSelect" id="splitElement" @click="greenify('splitElement')">Split</ion-button>
        <ion-button forArea="oppositionMemberSelect" id="tradElement" @click="greenify('tradElement')">Traditionnel</ion-button>
    </span>
    </ion-modal>

    <div class="informationArea">
    <div class="infoDescription tallIconContainer">
    <div class="infoIcon tallIcon">
    <ion-icon class="lowered" :icon="personSharp"></ion-icon>
    <ion-icon :icon="chatbubbleSharp"></ion-icon>
    </div>
    Qui Parle ?
    </div>
    <div class="middle">:</div>
    {{ role }}
</div>

<div class="informationArea">
    <div class="infoDescription tallIconContainer">
        <div class="infoIcon">
    <ion-icon :icon="handLeftSharp"></ion-icon>
        </div>
        Questions autorisés (POI)
    </div> 
    <div class="middle">:</div>
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
import { IonContent, IonHeader, IonIcon, IonModal, IonPage, IonTitle } from "@ionic/vue";
import { HtmlAttributes } from "csstype";
import {caretForwardSharp, pauseSharp, playSkipBackSharp, playSkipForwardSharp, chatbubbleSharp, handLeftSharp, personSharp} from "ionicons/icons"
import { defineComponent } from "vue";


export default defineComponent({
    name:"DebatePlay",
    components: {
        IonPage,
        IonHeader,
        IonTitle,
        IonContent, 
        IonIcon,
        IonModal
    },
    setup() {
        return {
            caretForwardSharp,
            playSkipBackSharp,
            playSkipForwardSharp,
            pauseSharp,
            chatbubbleSharp,
            personSharp,
            handLeftSharp
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
            this.canTalk = (this.currentDebate.getIfPOIAllowed() ? "Oui" : "Non") ;
            if (this.currentDebate.debateTimer.currentTime <= 0 && this.currentDebate.getTimer().playing) {
            this.currentDebate.nextConfiguration();
            this.currentDebate.getTimer().tick();
            this.role = this.currentDebate.getWhoIsTalking()
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
            this.role = this.currentDebate.getWhoIsTalking()
            console.log("playing")
        },

        pause() {
            this.isPlaying = false;
            this.currentDebate.debateTimer.pause();
        },
        forward() {
            this.currentDebate.fastForward();
            this.currentDebate.getTimer().tick();
            this.role = this.currentDebate.getWhoIsTalking()
        },
        backward() {
            this.currentDebate.fastBackward();
            this.currentDebate.getTimer().tick();
            this.role = this.currentDebate.getWhoIsTalking()
        },

        greenify(targetId:string){
            let button = document.getElementById(targetId) as HTMLElement;
            button.setAttribute("color", "success")
            this.redify(button.getAttribute("forArea") as string, targetId)

        },
        redify(debateConfigCategory: string, targetId: string){
            console.log(debateConfigCategory)
            let elementsInDebateCategory = document.querySelectorAll("[forArea='"+debateConfigCategory+"']")
            console.log('element in devate category')
            console.log(Array.from(elementsInDebateCategory))
                Array.from(elementsInDebateCategory).forEach((element)=>{
                    console.log(element.id)
                    if (element.id != targetId) {
                        console.log("Not target id")
                        element.setAttribute("color", "danger")
                    }
                })
                    

        },

        newRoleDetected(){
            this.role = this.currentDebate.getWhoIsTalking()
        }

    }

    

})
</script>
<style lang="css">
.canadianDebate .modal-wrapper{
    padding: 10px;
}
.hidden {
    display: none;
}
#debatePlay{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
}

.tallIconContainer {
    height: 110px;
}

.infoDescription {
    display: flex;
    flex-direction: column;
}
.lowered {
    position: relative;
    top: 40px;
    height: 50px;
}
.infoIcon {
    display: flex;
    flex-direction: row;
}
.tallIcon {
    height: 110px;
}
ion-icon {
    font-size: 40px;
}
.middle{
    font-weight: 600;
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