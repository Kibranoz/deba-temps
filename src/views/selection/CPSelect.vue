<template>
    <p class="modalTitle">{{ $t("titles.cp") }}</p>
    <p class="modalChoice">{{ $t("options.cp.pmOption") }}</p>
    <span>
        <button type="button" class="modalButton" forArea="primeMinisterSelect" id="sixFour"
            @click="selectOptionCa('sixFour', 'gov')">6-4</button>
        <button type="button" class="modalButton" forArea="primeMinisterSelect" id="sevenThree"
            @click="selectOptionCa('sevenThree', 'gov')">7-3</button>
    </span>
    <p class="modalChoice">{{ $t("options.cp.coOption") }}</p>
    <span>
        <button type="button" class="modalButton" forArea="oppositionMemberSelect" id="split"
            @click="selectOptionCa('split', 'opp')">{{ $t("options.cp.split") }}</button>
        <button type="button" class="modalButton" forArea="oppositionMemberSelect" id="trad"
            @click="selectOptionCa('trad', 'opp')">{{ $t("options.cp.trad") }}</button>
    </span>

    <span><button type="button" class="modalButton" @click="confirmSelection">{{ $t("options.cp.confirm") }}</button></span>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import canadianDebateFactory from "@/models/canadianDebateFactory";
import CanadianDebateFactory from '@/models/canadianDebateFactory';
import debate from '@/models/debate';


export default defineComponent({
    name: "CPSelect",
    props: {
        debateProp: debate,
    },
    data() {
        return {
            dataDebate: this.debateProp,
            canadianDebateFactory: new CanadianDebateFactory()

        };
    },
    emits: ["confirmCa", "update:debateProp"],
    methods: {
        confirmSelection() {
            const configurationResults = this.canadianDebateFactory.makeConfigList();
            this.dataDebate!.setConfigurations(configurationResults[0])
            this.dataDebate!.setRoles(configurationResults[1]);
            this.$emit("update:debateProp", this.dataDebate);
            this.$emit("confirmCa")
        },

        selectOptionCa(targetId: string, forTeam: string) {
            let button = document.getElementById(targetId) as HTMLElement;
            button.style.backgroundColor = "mediumseagreen"
            button.style.borderStyle = "dotted"
            this.redify(button.getAttribute("forArea") as string, targetId)
            if (forTeam == "gov") {
                this.canadianDebateFactory.setGovMode(targetId)
            }
            else {
                this.canadianDebateFactory.setOppMode(targetId)
            }
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

.modalButton {
    background-color: deepskyblue;
    color: black;
    font-size: 20px;
    padding: 10px;
    margin: 10px;
    border-width: medium;
}

</style>