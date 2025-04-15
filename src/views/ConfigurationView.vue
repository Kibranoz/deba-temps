<template>
    <div class="configuration">
        <p>Configutation {{ configOrder }}</p>
        <IonRange :min="0" :max="20" :tick="true" :pin="true"></IonRange>
    </div>
</template>
<script lang="ts" setup>
import { IonRange } from '@ionic/vue';

const props = defineProps({
  configOrder:Number  
})
</script>