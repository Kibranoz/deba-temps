<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title> {{ getTitle(format) }}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <div id="debatePlay">
                <div>
                    <div class="currentTime">
                        {{ time }}
                    </div>
                    <div class="controlArea">
                        <ion-icon tabindex="0" :aria-label="$t('accessibility.back')" role="button" class="button"
                            :icon="playSkipBackSharp" @click="backward"></ion-icon>
                        <ion-icon tabindex="1" role="button" :aria-label="$t('accessibility.start')" class="button"
                            v-if="!isPlaying" @click="play" :icon="caretForwardSharp"></ion-icon>
                        <ion-icon tabindex="2" role="button" :aria-label="$t('accessibility.pause')" class="button"
                            v-if="isPlaying" @click="pause" :icon="pauseSharp"></ion-icon>
                        <ion-icon tabindex="3" role="button" :aria-label="$t('accessibility.skip')" class="button"
                            :icon="playSkipForwardSharp" @click="forward"></ion-icon>
                    </div>
                </div>

                <ion-modal class="specialDebateModal" :is-open="shouldOpenModal">
                    <CPSelect :format="format" v-model:debateProp="currentDebate" @confirm="confirm"></CPSelect>
                </ion-modal>

                <div class="informationArea">
                    <div class="infoDescription tallIconContainer">
                        <div class="infoIcon tallIcon">
                            <ion-icon class="lowered" :icon="personSharp"></ion-icon>
                            <ion-icon :icon="chatbubbleSharp"></ion-icon>
                        </div>
                        {{ $t("debateView.whoIsTalking") }}
                    </div>
                    <div class="middle">:</div>
                    {{ role }}
                </div>

                <div class="informationArea">
                    <div class="infoDescription tallIconContainer">
                        <div class="infoIcon">
                            <ion-icon :icon="handLeftSharp"></ion-icon>
                        </div>
                        {{ $t("debateView.poi") }}
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
import debate from "@/models/debate";
import timer from "@/models/timer";
import eightMinutes from "@/realizations/DebateConfigurations/eightMinutes";
import fiveMinutes from "@/realizations/DebateConfigurations/fiveMinutes";
import fiveMinutesUk from "@/realizations/DebateConfigurations/fiveMinutesUk";
import fourMinutes from "@/realizations/DebateConfigurations/fourMinutes";
import sevenMinutes from "@/realizations/DebateConfigurations/sevenMinutes";
import sixMinutes from "@/realizations/DebateConfigurations/sixMinutes";
import sixMinutesUk from "@/realizations/DebateConfigurations/sixMinutesUk";
import tenMinutes from "@/realizations/DebateConfigurations/tenMinutes";
import threeMinutes from "@/realizations/DebateConfigurations/threeMinutes";
import oneMinute from "@/realizations/DebateConfigurations/oneMinute"
import CPSelect from "@/views/selection/CPSelect.vue"
import BPSelect from "@/views/selection/BPSelect.vue"
import { debuggerStatement } from "@babel/types";
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/vue";
import { HtmlAttributes } from "csstype";
import { getName } from "ionicons/dist/types/components/icon/utils";
import { caretForwardSharp, pauseSharp, playSkipBackSharp, playSkipForwardSharp, chatbubbleSharp, handLeftSharp, personSharp, pause, play, time } from "ionicons/icons"
import { computed, defineComponent } from "vue";
import { LocalNotifications } from "@capacitor/local-notifications";
import { App } from '@capacitor/app';
import { Device } from '@capacitor/device';
import { highlightTrailingWhitespace } from "jest-matcher-utils";
import { I18nInjectionKey } from "vue-i18n";
import debateSoundManager from "@/models/DebateSoundManager";

export default defineComponent({
    name: "DebatePlay",
    components: {
        IonPage,
        IonHeader,
        IonTitle,
        IonContent,
        IonIcon,
        IonModal,
        CPSelect,
        IonMenuButton,
        IonToolbar

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
            isPlaying: false,
            currentDebate: this.getNewDebate("uk"),
            canadianDebateFactory: new CanadianDebateFactory(),
            shouldOpenModal: false,
            role: "",
            canTalk: "",
            time: "0:0:0",
            format: ""
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

    beforeUnmount() {
        this.shouldOpenModal = false;
    },

    async created() {
        this.format = this.$route.params.id.toString();
        if (this.format == 'ca') {
            this.shouldOpenModal = true;
        }
        if (this.format == 'uk') {
            this.shouldOpenModal = true;
        }
        else {
            this.currentDebate = this.getNewDebate(this.format)
        }
        App.addListener('appStateChange', ({ isActive }) => {
            console.log('App state changed. Is active?', isActive);
        });
        if (await (await LocalNotifications.checkPermissions()).display == "prompt") {
            await LocalNotifications.requestPermissions()
        }
        if (await (await Device.getInfo()).platform == "android") {
            await LocalNotifications.createChannel({
                id: 'roundOver',
                name: 'Round is over notification',
                importance: 5,
                description: "Be notified when the debatter turn is over",
                sound: "android.resource://com.debatemps.app/raw/moon.wav",
                visibility: 1,
                vibration: true
            }

            )
        }

        setInterval(() => {
            this.currentDebate.getTimer().tick()
            this.canTalk = (this.currentDebate.getIfPOIAllowed() ? this.$t("debateView.yes") : this.$t("debateView.no"));
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
            debateSoundManager.playAnyNecessarySound(this.currentDebate)
        }
            , 100)
    },


    methods: {
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

        confirm() {
            console.log("confirmCa")
            this.shouldOpenModal = false
            this.currentDebate.restartTimer()
            this.time = this.currentDebate.getTimer().getTimeString();
        },


        newRoleDetected() {
            this.role = this.currentDebate.getWhoIsTalking()
        },

        getTitle(routeId: string | string[]) {
            switch (routeId) {
                case "ca":
                    return this.$t("titles.cp")
                case "uk":
                    return this.$t("titles.bp")
                case "us":
                    return this.$t("titles.usp")
                default:
                    return "Débat de type inconnu"
            }
        },

        getNewDebate(symbol: string): debate {
            switch (symbol) {
                case "uk":
                    console.log("uk")
                    return new debate([new sevenMinutes(), new sevenMinutes(), new sevenMinutes(), new sevenMinutes(), new sevenMinutes(), new sevenMinutes(),  new sevenMinutes(), new sevenMinutes(), ], [this.$t("roles.bp.pm"), this.$t("roles.bp.co"), this.$t("roles.bp.vpm"), this.$t("roles.bp.cao"), this.$t("roles.bp.mg"), this.$t("roles.bp.mo"), this.$t("roles.bp.wg"), this.$t("roles.bp.wo")])
                case "ca": //fallback value
                    return new debate([new sevenMinutes(),  new sevenMinutes(),  new sevenMinutes(),  new sevenMinutes(),  new threeMinutes(),  new threeMinutes()], [this.$t("roles.cp.pm"),
                    this.$t("roles.cp.co"), this.$t("roles.cp.mc"), this.$t("roles.cp.mo"), this.$t("roles.cp.co"), this.$t("roles.cp.pm")])
                case 'us':
                    console.log("us")
                    return new debate([new sevenMinutes(), new eightMinutes(), new eightMinutes(), new eightMinutes(), new fourMinutes(), new fiveMinutes() ], [this.$t("roles.cp.pm"), this.$t("roles.cp.pm"), this.$t("roles.ap.mg"), this.$t("roles.cp.mo"), this.$t("roles.cp.co"), this.$t("roles.cp.pm")])
                case 'test':
                    return new debate([new oneMinute() ], ['role1', 'role2'])
            }

            return new debate([new sevenMinutes(), new eightMinutes(), new eightMinutes(), new eightMinutes(), new fourMinutes(), new fiveMinutes(), ], [this.$t("roles.ap.pm"), this.$t("roles.ap.co"), this.$t("roles.ap.mg"), this.$t("roles.ap.mo"), this.$t("roles.ap.co"), this.$t("roles.ap.pm")])

        }


    }

})
</script>
<style lang="css">
.ios ion-modal {
    padding-top: 50px;
}

.specialDebateModal .modal-wrapper {
    padding: 10px;

}

.modalTitle {
    font-weight: bold;
    margin-left: 20px;
    font-size: 20px;
}

.modalChoice {
    margin-left: 20px;
    font-size: 15px;
}

.hidden {
    display: none;
}

#debatePlay {
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

.middle {
    font-weight: 600;
    font-size: 40px;
}

.controlArea,
.informationArea {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: 50px;


}

.modalButton {
    background-color: deepskyblue;
    color: black;
    font-size: 20px;
    padding: 10px;
    margin: 10px;
    border-width: medium;
}


.currentTime {
    display: flex;
    align-self: center;
    font-size: 40px;
    justify-content: center;

}
</style>