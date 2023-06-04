<template>
    <p class="modalTitle">{{ $t("options.bp.title") }}</p>
    <p class="modalChoice">{{ $t("options.bp.nbMinutes") }}</p>
    <button type="button" class="modalButton" @click="selectOption(5)">5 min</button>
    <button type="button" class="modalButton" @click="selectOption(6)">6 min</button>
    <button type="button" class="modalButton" @click="selectOption(7)">7 min</button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import debate from '@/models/debate';
import fiveMinutesUk from '@/realizations/DebateConfigurations/fiveMinutesUk';
import sevenMinutes from '@/realizations/DebateConfigurations/sevenMinutes';
import sixMinutesUk from '@/realizations/DebateConfigurations/sixMinutesUk';
import thirtySeconds from '@/realizations/DebateConfigurations/thirtySeconds';
export default defineComponent({
    name: "BPSelect",
    props: {
        bpdebateProp: debate
    },
    data() {
        return {
            dataDebate: this.bpdebateProp,
        };

        
    },
    

    emits: ["confirmUk", "update:debateProp"],

    methods: {
        selectOption(minutes: number) {
            if (minutes == 5) {
                this.dataDebate!.setConfigurations([new fiveMinutesUk(), new thirtySeconds(), new fiveMinutesUk(), new thirtySeconds(), new fiveMinutesUk(), new thirtySeconds(),
                new fiveMinutesUk(), new thirtySeconds(), new fiveMinutesUk(), new thirtySeconds(), new fiveMinutesUk(), new thirtySeconds(), new fiveMinutesUk(), new thirtySeconds(),
                new fiveMinutesUk(), new thirtySeconds()])
            }
            if (minutes == 6) {
                this.dataDebate!.setConfigurations([new sixMinutesUk(), new thirtySeconds(), new sixMinutesUk(), new thirtySeconds(), new sixMinutesUk(), new thirtySeconds(),
                new sixMinutesUk(), new thirtySeconds(), new sixMinutesUk(), new thirtySeconds(), new sixMinutesUk(), new thirtySeconds(), new sixMinutesUk(), new thirtySeconds(),
                new sixMinutesUk(), new thirtySeconds()])
            }

            else {
                this.dataDebate!.setConfigurations([new sevenMinutes(), new thirtySeconds(), new sevenMinutes(), new thirtySeconds(), new sevenMinutes(), new thirtySeconds(), new sevenMinutes(), new thirtySeconds(), new sevenMinutes(), new thirtySeconds(), new sevenMinutes(), new thirtySeconds(), new sevenMinutes(), new thirtySeconds(), new sevenMinutes(), new thirtySeconds()])
            }

            this.$emit("update:debateProp", this.dataDebate);
            this.$emit("confirmUk");
        }
    }


});
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