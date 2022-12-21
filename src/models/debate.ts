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
    if (this.debateTimer.currentTime <= this.getCurrentConfiguration().getTimeWhenQuestionStartsToBeAllowed() && this.debateTimer.currentTime > this.getCurrentConfiguration().getTimeWhenQuestionStopBeingAllowed()) {
        return true;
    }
    return false;
}

nextConfiguration() {
    if (this.configurationIndex >= this.configurations.length -1) {
        this.configurationIndex = 0;
    }
    else {
        this.configurationIndex += 1;
    }
    this.debateTimer.setUpperLimit(this.getCurrentConfiguration().getConfigurationTotalRunTime());
    this.debateTimer.resetTimer()
}

previousConfiguration() {
    if (this.configurationIndex <= 0) {
        this.configurationIndex = this.configurations.length - 1;
    }
    else {
        this.configurationIndex -= 1;
    }

    this.debateTimer.setUpperLimit(this.getCurrentConfiguration().getConfigurationTotalRunTime());
    this.debateTimer.resetTimer();
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