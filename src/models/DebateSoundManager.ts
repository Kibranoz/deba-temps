import debate from "./debate";

class DebateSoundManager  {
    minutesReminderFor = [3,2,1];
    clockSoundsJustPlayed:any = {"3":false, "2":false, "1":false};
    roundIsOver(){
        const moon = new Audio("../../../assets/sounds/moon.wav");
        moon.play();
    }
    roundIsReallyOver(){
        const clapping = new Audio("../../../assets/sounds/clap.wav");
        clapping.play()
    }
    changePOIAllowed(){
        const thud = new Audio("../../../assets/sounds/thud.wav")
        thud.play()
    }
    minutesRemaining(minutesRemaining:number){
        const clock = new Audio("../../../assets/sounds/clock.wav")
        for (let i=0;i<minutesRemaining;i++) {
            setTimeout(()=>{clock.play()},500*i)
        }
    }

    playAnyNecessarySound(debateState:debate) {
        if (debateState.POIAllowedJustChanged) {
            this.changePOIAllowed();
            debateState.POIAllowedJustChanged = false;
            return;
        }
        if (debateState.roundJustEnded){
            this.roundIsReallyOver();
            debateState.roundJustEnded = false;
            return
        }

        this.minutesReminderFor.forEach(minute => {
            if (debateState.debateTimer.hasExactlyNMinutesRemaining(minute)) {
                if (!this.clockSoundsJustPlayed[minute.toString()]){
                this.minutesRemaining(minute)
                }
                this.clockSoundsJustPlayed[minute] = true
                return
            }
            else {
                this.clockSoundsJustPlayed[minute] = false
            }
        });



    }
}

const debateSoundManager = new DebateSoundManager();
export default debateSoundManager;