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

    <ion-modal class="canadianDebate" :is-open="shouldOpenModal">
    <p>Canadien parlementaire</p>
    <p>Premier ministre : 6-4 ou 7-3</p>
    <span>
        <ion-button forArea="primeMinisterSelect" id="sixFour" @click="selectOption('sixFour', 'gov')">6-4</ion-button>
        <ion-button forArea="primeMinisterSelect" id="sevenThree" @click="selectOption('sevenThree', 'gov')">7-3</ion-button>
    </span>

    <p>Membre de l'opposition : Split ou traditionnel</p>
    <span>
        <ion-button forArea="oppositionMemberSelect" id="split" @click="selectOption('split', 'opp')">Split</ion-button>
        <ion-button forArea="oppositionMemberSelect" id="trad" @click="selectOption('trad', 'opp')">Traditionnel</ion-button>
    </span>

    <span><ion-button @click="confirmSelection">Confirmer</ion-button></span>
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

import canadianDebateFactory from "@/models/canadianDebateFactory";
import CanadianDebateFactory from "@/models/canadianDebateFactory";
import configuration from "@/models/configurations";
import  debate from "@/models/debate";
import timer from "@/models/timer";
import eightMinutes from "@/realizations/DebateConfigurations/eightMinutes";
import fifteenSeconds from "@/realizations/DebateConfigurations/fifteenSeconds";
import fiveMinutes from "@/realizations/DebateConfigurations/fiveMinutes";
import fourMinutes from "@/realizations/DebateConfigurations/fourMinutes";
import sevenMinutes from "@/realizations/DebateConfigurations/sevenMinutes";
import sixMinutes from "@/realizations/DebateConfigurations/sixMinutes";
import tenMinutes from "@/realizations/DebateConfigurations/tenMinutes";
import thirtySeconds from "@/realizations/DebateConfigurations/thirtySeconds";
import threeMinutes from "@/realizations/DebateConfigurations/threeMinutes";
import oneMinute from "@/realizations/DebateConfigurations/oneMinute"
import { debuggerStatement } from "@babel/types";
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/vue";
import { HtmlAttributes } from "csstype";
import { getName } from "ionicons/dist/types/components/icon/utils";
import {caretForwardSharp, pauseSharp, playSkipBackSharp, playSkipForwardSharp, chatbubbleSharp, handLeftSharp, personSharp, pause, play, time} from "ionicons/icons"
import { computed, defineComponent } from "vue";

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
            currentDebate: this.getNewDebate(this.$route.params.id),
            canadianDebateFactory: new CanadianDebateFactory(),
            shouldOpenModal:false,
            role : "",
            canTalk : "",
            time: "0:0:0"
         }
    },
    computed: {
        currentConfigurationIndex() {
            return this.currentDebate.configurationIndex;
        },
        currentDebatePlaying() {
            return this.currentDebate.debateTimer.playing;
        }

    },

    created() {
        console.log('I am created')
        if (this.$route.params.id == 'ca'){
            this.shouldOpenModal = true;
        }
        setInterval(()=>{
            this.currentDebate.getTimer().tick()
            this.canTalk = (this.currentDebate.getIfPOIAllowed() ? "Oui" : "Non") ;
            if (this.currentDebate.debateTimer.currentTime <= 0 && this.currentDebate.getTimer().playing) {
                console.log("next configuration")
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
        this.time = this.currentDebate.getTimer().getTimeString();
            }
            ,100)
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
            this.time = this.currentDebate.getTimer().getTimeString()
            this.role = this.currentDebate.getWhoIsTalking()
        },
        backward() {
            this.currentDebate.fastBackward();
            this.currentDebate.getTimer().tick();
            this.time = this.currentDebate.getTimer().getTimeString()
            this.role = this.currentDebate.getWhoIsTalking()
        },

        selectOption(targetId:string, forTeam:string){
            let button = document.getElementById(targetId) as HTMLElement;
            button.setAttribute("color", "success")
            this.redify(button.getAttribute("forArea") as string, targetId)
            if (forTeam == "gov") {
                this.canadianDebateFactory.setGovMode(targetId)
            }
            else {
                this.canadianDebateFactory.setOppMode(targetId)
            }
        
        },

        confirmSelection(){
            const configurationResults = this.canadianDebateFactory.makeConfigList()
            this.currentDebate.setConfigurations(configurationResults[0])
            this.currentDebate.setRoles(configurationResults[1])
            this.shouldOpenModal = false
            this.currentDebate.restartTimer()
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
        },

        getNewDebate(symbol:string){
            switch(symbol){
                case "uk":
                    console.log("uk")
                    return new debate([new sevenMinutes(),new thirtySeconds(),new sevenMinutes(),new thirtySeconds(),new sevenMinutes(),new thirtySeconds(),new sevenMinutes(),new thirtySeconds(),new sevenMinutes(),new thirtySeconds(),new sevenMinutes(),new thirtySeconds(),new sevenMinutes(),new thirtySeconds(),new sevenMinutes(),new thirtySeconds()], ["Le ou la Première ministre", "Le ou la Cheffe de l'opposition", "Le ou la vice première ministre", "Le ou la cheffe adjointe de l'opposition","Le Membre du gouvernement","Le membre de l'opposition", "Le whip du gouvernement", "Le whip de l'opposition"])
                case "ca":
                    return new debate([new sevenMinutes(), new fifteenSeconds(), new sevenMinutes(),new fifteenSeconds(), new sevenMinutes(),new fifteenSeconds(),new sevenMinutes(),new fifteenSeconds(),new threeMinutes(),new fifteenSeconds(), new threeMinutes(), new fifteenSeconds()], ["Le ou la Première ministre", "Le ou la Cheffe de l'opposition", "Le ou la Ministre de la couronne", "Le Membre de l'opposition","Le ou la Cheffe de l'oppositon","Le ou la Première ministre"])
                case 'us':
                    console.log("us")
                    return new debate([new sevenMinutes(),new thirtySeconds(), new eightMinutes(), new thirtySeconds(), new eightMinutes(), new thirtySeconds(), new eightMinutes(), new thirtySeconds(), new fourMinutes(), new thirtySeconds(),new fiveMinutes(), new thirtySeconds()],["Premier ministre", "Chef de l'opposition", "Membre du gouvernement", "Membre de l'opposition", "Chef de l'opposition", "Premier ministre"])
                case 'test':
                    return new debate([new oneMinute(), new thirtySeconds()], ['role1', 'role2'])
            }

            return new debate([new sevenMinutes(),new thirtySeconds(), new eightMinutes(), new thirtySeconds(), new eightMinutes(), new thirtySeconds(), new eightMinutes(), new thirtySeconds(), new fourMinutes(), new thirtySeconds(),new fiveMinutes(), new thirtySeconds()],["Premier ministre", "Chef de l'opposition", "Membre du gouvernement", "Membre de l'opposition", "Chef de l'opposition", "Premier ministre"])

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