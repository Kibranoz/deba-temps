<template>
    <template v-if="isCa">
        <p class="modalTitle">{{ $t("titles.cp") }}</p>
        <p class="modalChoice">{{ $t("options.cp.pmOption") }}</p>
        <span>
            <button type="button" class="modalButton" forArea="primeMinisterSelect" id="sixFour"
                @click="selectOptionCa(GovMode.SIX_FOUR, 'sixFour', 'gov')">6-4</button>
            <button type="button" class="modalButton" forArea="primeMinisterSelect" id="sevenThree"
                @click="selectOptionCa(GovMode.SEVEN_THREE,'sevenThree', 'gov')">7-3</button>
        </span>
        <p class="modalChoice">{{ $t("options.cp.coOption") }}</p>
        <span>
            <button type="button" class="modalButton" forArea="oppositionMemberSelect" id="split"
                @click="selectOptionCa(OppMode.SPLIT,'split', 'opp')">{{ $t("options.cp.split") }}</button>
            <button type="button" class="modalButton" forArea="oppositionMemberSelect" id="trad"
                @click="selectOptionCa(OppMode.TRAD,'trad', 'opp')">{{ $t("options.cp.trad") }}</button>
        </span>
        <span><button type="button" class="modalButton" @click="confirmSelectionCa">{{ $t("options.cp.confirm")
        }}</button></span>
    </template>
    <template v-if="isUk">
        <p class="modalTitle">{{ $t("options.bp.title") }}</p>
        <p class="modalChoice">{{ $t("options.bp.nbMinutes") }}</p>
        <button type="button" class="modalButton" @click="selectOptionUk(5)">5 min</button>
        <button type="button" class="modalButton" @click="selectOptionUk(6)">6 min</button>
        <button type="button" class="modalButton" @click="selectOptionUk(7)">7 min</button>
    </template>
    <template v-if="isMace">
        <p class="modalTitle">{{ $t("options.mace.title") }}</p>
        <p class="modalChoice">{{ $t("options.mace.minutesMain") }}</p>
        <input class="choiceInput" type="number" v-model="minutesMain">
        <p class="modalChoice">{{ $t("options.mace.minutesSummary") }}</p>
        <input class="choiceInput" type="number" v-model="minutesSummary">
        <span><button type="button" class="modalButton" @click="confirmSelectionMace">{{ $t("options.cp.confirm") }} </button> </span>

    </template>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CanadianDebateBuilder from '@/models/CanadianDebateBuilder';
import debate from '@/models/debate';
import BritishDebateBuilder from '@/models/BritishDebateBuilder';
import GovMode from '@/enum/GovMode';
import OppMode from '@/enum/OppMode';
import MaceExtendedDebateBuilder from '@/models/MaceExtendedBuilder';


export default defineComponent({
    name: "CPSelect",
    props: {
        debateProp: debate,
        format: String
    },
    data() {
        return {
            GovMode:GovMode,
            OppMode:OppMode,
            minutesMain:5,
            minutesSummary:5,
            dataDebate: this.debateProp,
            canadianDebateFactory: new CanadianDebateBuilder()
        };
    },
    computed: {
        isCa(): boolean {
            return this.format == "ca"
        },
        isUk(): boolean {
            return this.format == "uk"
        },
        isMace(): boolean {
            return this.format == "me"
        }
    },
    emits: ["confirm", "update:debateProp"],
    methods: {
        async sendSelection() {
            await this.dataDebate?.initializeWithPreferences()
            this.$emit("update:debateProp", this.dataDebate);
            this.$emit("confirm")
        },
        confirmSelectionCa() {
            const configurationResults = this.canadianDebateFactory.makeConfigList();
            this.dataDebate!.setConfigurations(configurationResults)
            this.sendSelection();
        },
        confirmSelectionMace() {
            const maceExtendedDebateFactory = new MaceExtendedDebateBuilder();
            maceExtendedDebateFactory.setMainSpeakerMinutes(this.minutesMain)
            maceExtendedDebateFactory.setSummarySpeakerMinutes(this.minutesSummary)
            const configurationResults = maceExtendedDebateFactory.makeConfigList()
            this.dataDebate!.setConfigurations(configurationResults)
            this.sendSelection();
        },

        selectOptionCa(choice:GovMode|OppMode, targetId: string, forTeam: string) {
            let button = document.getElementById(targetId) as HTMLElement;
            button.style.backgroundColor = "mediumseagreen"
            button.style.borderStyle = "dotted"
            this.redify(button.getAttribute("forArea") as string, targetId)
            if (forTeam == "gov") {
                this.canadianDebateFactory.setGovMode(choice as GovMode)
            }
            else {
                this.canadianDebateFactory.setOppMode(choice as OppMode)
            }
        },

        selectOptionUk(minutes: number) {
            this.dataDebate! = BritishDebateBuilder.fromMinutes(minutes)
            this.sendSelection();
        },

        redify(debateConfigCategory: string, targetId: string) {
            console.log(debateConfigCategory)
            let elementsInDebateCategory = document.querySelectorAll("[forArea='" + debateConfigCategory + "']")
            console.log('element in devate category')
            console.log(Array.from(elementsInDebateCategory))
            Array.from(elementsInDebateCategory).forEach((element) => {
                let htmlelement = element as HTMLElement
                console.log(element.id)
                if (element.id != targetId) {
                    console.log("Not target id")
                    htmlelement.style.backgroundColor = "red"
                    htmlelement.style.borderStyle = "none"
                }
            })
        }
    }
}
);
</script>
<style>
.modalTitle {
    font-weight: bold;
    margin-left: 20px;
    font-size: 20px;
}

.modalChoice {
    margin-left: 20px;
    font-size: 15px;
}

.choiceInput {
    margin-left: 20px;
}

.modalButton {
    background-color: deepskyblue;
    color: black;
    font-size: 20px;
    padding: 10px;
    margin: 10px;
    border-width: medium;
}
</style>