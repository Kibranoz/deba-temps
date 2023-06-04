<template>
    <template v-if="isCa">
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
        <span><button type="button" class="modalButton" @click="confirmSelection">{{ $t("options.cp.confirm")
        }}</button></span>
    </template>
    <template v-if="isUk">
        <p class="modalTitle">{{ $t("options.bp.title") }}</p>
        <p class="modalChoice">{{ $t("options.bp.nbMinutes") }}</p>
        <button type="button" class="modalButton" @click="selectOptionUk(5)">5 min</button>
        <button type="button" class="modalButton" @click="selectOptionUk(6)">6 min</button>
        <button type="button" class="modalButton" @click="selectOptionUk(7)">7 min</button>
    </template>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CanadianDebateFactory from '@/models/canadianDebateFactory';
import debate from '@/models/debate';
import fiveMinutesUk from '@/realizations/DebateConfigurations/fiveMinutesUk';
import sevenMinutes from '@/realizations/DebateConfigurations/sevenMinutes';
import sixMinutesUk from '@/realizations/DebateConfigurations/sixMinutesUk';
import thirtySeconds from '@/realizations/DebateConfigurations/thirtySeconds';


export default defineComponent({
    name: "CPSelect",
    props: {
        debateProp: debate,
        format: String
    },
    data() {
        return {
            dataDebate: this.debateProp,
            canadianDebateFactory: new CanadianDebateFactory()

        };
    },
    computed: {
        isCa(): boolean {
            return this.format == "ca"
        },
        isUk(): boolean {
            return this.format == "uk"
        }
    },
    emits: ["confirm", "update:debateProp"],
    methods: {
        confirmSelection() {
            const configurationResults = this.canadianDebateFactory.makeConfigList();
            this.dataDebate!.setConfigurations(configurationResults[0])
            this.dataDebate!.setRoles(configurationResults[1]);
            this.$emit("update:debateProp", this.dataDebate);
            this.$emit("confirm")
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

        selectOptionUk(minutes: number) {
            if (minutes == 5) {
                console.log("five")
                this.dataDebate!.setConfigurations([new fiveMinutesUk(), new thirtySeconds(), new fiveMinutesUk(), new thirtySeconds(), new fiveMinutesUk(), new thirtySeconds(),
                new fiveMinutesUk(), new thirtySeconds(), new fiveMinutesUk(), new thirtySeconds(), new fiveMinutesUk(), new thirtySeconds(), new fiveMinutesUk().setIsMiddle(false), new thirtySeconds(),
                new fiveMinutesUk().setIsMiddle(false), new thirtySeconds()])
            }
            if (minutes == 6) {
                this.dataDebate!.setConfigurations([new sixMinutesUk(), new thirtySeconds(), new sixMinutesUk(), new thirtySeconds(), new sixMinutesUk(), new thirtySeconds(),
                new sixMinutesUk(), new thirtySeconds(), new sixMinutesUk(), new thirtySeconds(), new sixMinutesUk(), new thirtySeconds(), new sixMinutesUk().setIsMiddle(false), new thirtySeconds(),
                new sixMinutesUk().setIsMiddle(false), new thirtySeconds()])
            }

            if (minutes == 7) {
                console.log("seven")
                this.dataDebate!.setConfigurations([new sevenMinutes(), new thirtySeconds(), new sevenMinutes(), new thirtySeconds(), new sevenMinutes(), new thirtySeconds(), new sevenMinutes(), new thirtySeconds(), new sevenMinutes(), new thirtySeconds(), new sevenMinutes(), new thirtySeconds(), new sevenMinutes().setIsMiddle(false), new thirtySeconds(), new sevenMinutes().setIsMiddle(false), new thirtySeconds()])
            }

            this.dataDebate!.setRoles([this.$t("roles.bp.pm"), this.$t("roles.bp.co"), this.$t("roles.bp.vpm"), this.$t("roles.bp.cao"), this.$t("roles.bp.mg"), this.$t("roles.bp.mo"), this.$t("roles.bp.wg"), this.$t("roles.bp.wo")])

            this.$emit("update:debateProp", this.dataDebate);
            this.$emit("confirm");
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