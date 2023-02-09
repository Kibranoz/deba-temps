import sixMinutes from "@/realizations/DebateConfigurations/sixMinutes";
import tenMinutes from "@/realizations/DebateConfigurations/tenMinutes";
import thirtySeconds from "@/realizations/DebateConfigurations/thirtySeconds";
import configuration from "./configurations";
import timer from "./timer";

class debate {
//caN Be any amount 
configurations: any;
configurationIndex = 0;
time = 0
debateTimer:timer
roles: any;
constructor(configurations:any,roles:any){
    this.configurations = configurations
    this.roles = roles;
    this.debateTimer = new timer(this.configurations[this.configurationIndex].getConfigurationTotalRunTime())
}

getCurrentConfiguration():configuration {
    return this.configurations[this.configurationIndex];
}
getTimer():timer {
    return this.debateTimer;
}

getWhoIsTalking() {
    return this.roles[Math.floor(this.configurationIndex/2)];
}

getIfGrace():boolean {
    return this.configurations[this.configurationIndex].isGrace;
}

getIfPOIAllowed():boolean {
    if (this.debateTimer.currentTime <= this.getCurrentConfiguration().getTimeWhenQuestionStartsToBeAllowed()*1000 && this.debateTimer.currentTime > this.getCurrentConfiguration().getTimeWhenQuestionStopBeingAllowed()*1000) {
        return true;
    }
    return false;
}

nextConfiguration() {
    const clapping = new Audio("../../../assets/sounds/clapping.wav")
    const moon = new Audio("../../../assets/sounds/moon.wav")
    let userLeftDuringDebate = false; 
    let debateOverflow = 0;
    if (this.configurationIndex >= this.configurations.length -1) {
        this.configurationIndex = 0;
    }
    else {
        this.configurationIndex += 1;
        if (this.getCurrentConfiguration().isGrace){
        if (-1*this.debateTimer.currentTime/1000 > this.getCurrentConfiguration().getConfigurationTotalRunTime()) {
            console.log("currentTime when leav"+this.debateTimer.currentTime)
            this.configurationIndex +=1;
        }
        else {
            console.log("user left debate")
            debateOverflow = -1*this.debateTimer.currentTime/1000;
            userLeftDuringDebate = true;
        }
    }
    }
        console.log("resetTimer")
    this.debateTimer.resetTimer()  
    this.debateTimer.setUpperLimit(this.getCurrentConfiguration().getConfigurationTotalRunTime());
    if (userLeftDuringDebate) {
        this.debateTimer.removeSecondsElapsedSinceLastTimeOut(debateOverflow);
    }

    if (!this.getCurrentConfiguration().isGrace){
        clapping.play();
        this.debateTimer.tick();
        this.debateTimer.pause();
    }
    else {
        moon.play();
    }
}

previousConfiguration() {
    if (this.configurationIndex <= 0) {
        this.configurationIndex = this.configurations.length - 1;
    }
    else {
        this.configurationIndex -= 1;
    }
    this.debateTimer.resetTimer();
    this.debateTimer.setUpperLimit(this.getCurrentConfiguration().getConfigurationTotalRunTime());
    if (!this.getCurrentConfiguration().isGrace){
        this.debateTimer.tick()
        this.debateTimer.pause();
    }
}
fastBackward() {
    if (this.configurationIndex <= 0) {
        this.configurationIndex = this.configurations.length - 1;
    }
    else {
        this.configurationIndex -= 1;
    }

    this.debateTimer.setUpperLimit(this.getCurrentConfiguration().getConfigurationTotalRunTime());

    if (this.getCurrentConfiguration().isGrace) {
        this.fastBackward();
    } 
    else {
        this.debateTimer.pause();
        this.debateTimer.resetTimer()
    }
}

fastForward() {
    if (this.configurationIndex >= this.configurations.length -1) {
        this.configurationIndex = 0;
    }
    else {
        this.configurationIndex += 1;
    }
    this.debateTimer.setUpperLimit(this.getCurrentConfiguration().getConfigurationTotalRunTime());

    if (this.getCurrentConfiguration().isGrace) {
        this.fastForward();
    } 
    else {
        this.debateTimer.resetTimer();
        this.debateTimer.tick();
        this.debateTimer.pause();
    }
}
setConfigurations(configurations:[configuration]) {
    this.configurations = configurations;
}
restartTimer(){
    this.debateTimer.setUpperLimit(this.getCurrentConfiguration().getConfigurationTotalRunTime());
}
setRoles(roles:[string]) {
    this.roles = roles;
}
}

//export const Debate = new debate([new sixMinutes(), new tenMinutes()], ["role 1", "role b"])

export default debate