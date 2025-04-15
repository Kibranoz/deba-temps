import { i18n } from "@/main";
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
    minutes = 0;
    seconds = 0;

constructor(upperLimit:number) {
    this.upperLimit = upperLimit
}

setUpperLimit(newUpperLimit:number) {
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
    async play(){
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
        const whenToSend = new Date()
        whenToSend.setTime((this.timeStartedAt + this.upperLimit * 1000))
    if (LocalNotifications) {
        this.sendNotification(whenToSend)
        }
    }

    sendNotification(whenToSend:Date) {
        LocalNotifications.schedule({notifications:[{title: i18n.global.t("notifications.title"), body: i18n.global.t("notifications.subtitle"),
        id:0, schedule:{at:whenToSend}, channelId:"roundOver"  }]})
    }

    resetTimer() {
        this.timeStartedAt = Date.now();
        this.currentTime = (this.timeStartedAt + this.upperLimit * 1000) - Date.now();
    }

    async pause(){
        this.playing = false;
        this.paused = true
        this.pauseStartedAt = Date.now();
        const pendingNotifications = (await LocalNotifications.getPending()).notifications
        }

    hasExactlyNMinutesRemaining(n:number) {
        return this.minutes == n && this.seconds == 0 
    }

    formatNumber(num:number) {
        if (num>=10){
            return num.toString()
        }
        else {
            return "0"+num.toString();
        }

    }

    getTimeString() {
            let currentTimeSeconds = this.currentTime / 1000
            this.minutes = Math.floor(currentTimeSeconds/60) % 60
            currentTimeSeconds -= this.minutes*60
            this.seconds = Math.round(currentTimeSeconds) % 60
            if (Math.round(currentTimeSeconds) == 60){
                this.minutes+=1
            }
            return this.formatNumber(this.minutes) + ":" + this.formatNumber(this.seconds)
        
}
}
export default timer