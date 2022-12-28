import thirtySeconds from "@/realizations/DebateConfigurations/thirtySeconds";
import { LocalNotifications } from "@capacitor/local-notifications";
import { IonThumbnail } from "@ionic/vue";

class timer {
    timeStartedAt = 0;
    currentTime = 0;
    paused = false;
    playing = false;
    pauseStartedAt = 0;
    currentPauseTime = 0;
    upperLimit: number;

constructor(upperLimit:number) {
    this.upperLimit = upperLimit
}

async setUpperLimit(newUpperLimit:number) {
    this.upperLimit = newUpperLimit
}

    tick():void{
        if (this.paused) {
            this.currentPauseTime = Date.now();
        }
        if (this.playing){
        this.currentTime = (this.timeStartedAt + this.upperLimit * 1000) - Date.now();
        // before was just get milliseconds
        }
    }
    play(){

        if (this.paused) {
            const pauseDelta:number = (this.currentPauseTime - this.pauseStartedAt)
            this.timeStartedAt += pauseDelta;
            this.paused = false;
            this.playing = true;
        }
        // have not started yet
        if (!this.paused && !this.playing){
            this.timeStartedAt = Date.now();
            this.playing = true; 
        }
    }

    resetTimer() {
        this.timeStartedAt = Date.now();
        this.currentTime = (this.timeStartedAt + this.upperLimit * 1000) - Date.now();
    }

    pause(){
        this.playing = false;
        this.paused = true
        this.pauseStartedAt = Date.now();
        }
 

    getTimeString() {
            const currentTimeSeconds = this.currentTime / 1000
            const hours = Math.floor(currentTimeSeconds / 3600)
            const minutes = Math.floor(currentTimeSeconds/60) % 60
            const seconds = Math.floor(currentTimeSeconds) % 60
            return hours.toString() + ":" + minutes.toString() + ":" + seconds.toString()
        
}
}
export default timer