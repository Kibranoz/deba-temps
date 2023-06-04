import sixMinutes from "@/realizations/DebateConfigurations/sixMinutes";
import tenMinutes from "@/realizations/DebateConfigurations/tenMinutes";
import thirtySeconds from "@/realizations/DebateConfigurations/thirtySeconds";
import configuration from "./configurations";
import debateSoundManager from "./DebateSoundManager";
import timer from "./timer";

class debate {
    //caN Be any amount 
    configurations: any;
    configurationIndex = 0;
    time = 0
    POIAllowed = false;
    debateTimer: timer
    roles: any;
    constructor(configurations: any, roles: any) {
        this.configurations = configurations
        this.roles = roles;
        this.debateTimer = new timer(this.configurations[this.configurationIndex].getConfigurationTotalRunTime())
    }

    getCurrentConfiguration(): configuration {
        return this.configurations[this.configurationIndex]
    }
    getTimer(): timer {
        return this.debateTimer
    }

    getWhoIsTalking() {
        return this.roles[Math.floor(this.configurationIndex / 2)]
    }

    getIfGrace(): boolean {
        return this.configurations[this.configurationIndex].isGrace
    }

    getIfPOIAllowed(): boolean {
        if (this.debateTimer.currentTime <= this.getCurrentConfiguration().getTimeWhenQuestionStartsToBeAllowed() * 1000
            && this.debateTimer.currentTime > this.getCurrentConfiguration().getTimeWhenQuestionStopBeingAllowed() * 1000) {
            //was not allowed, now is
            if (!this.POIAllowed) {
                debateSoundManager.changePOIAllowed()
                this.POIAllowed = true
            }
        }
        else {
            // was allowed, now isn't 
            if (this.POIAllowed) {
                debateSoundManager.changePOIAllowed()
                this.POIAllowed = false
            }
        }
        return this.POIAllowed
    }
    nextConfiguration() {

        if (this.configurationIndex >= this.configurations.length - 1) {
            this.configurationIndex = 0
        }
        else {
            this.configurationIndex += 1
        }
        console.log("resetTimer")
        this.debateTimer.resetTimer()
        this.debateTimer.setUpperLimit(this.getCurrentConfiguration().getConfigurationTotalRunTime())
        if (!this.getCurrentConfiguration().isGrace) {
            debateSoundManager.roundIsReallyOver();
            this.debateTimer.tick();
            this.debateTimer.pause();
        }
        else {
            debateSoundManager.roundIsOver()
        }
    }

    previousConfiguration() {
        if (this.configurationIndex <= 0) {
            this.configurationIndex = this.configurations.length - 1
        }
        else {
            this.configurationIndex -= 1
        }
        this.debateTimer.resetTimer()
        this.debateTimer.setUpperLimit(this.getCurrentConfiguration().getConfigurationTotalRunTime());
        if (!this.getCurrentConfiguration().isGrace) {
            this.debateTimer.tick()
            this.debateTimer.pause()
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
        if (this.configurationIndex >= this.configurations.length - 1) {
            this.configurationIndex = 0;
        }
        else {
            this.configurationIndex += 1;
        }
        this.debateTimer.setUpperLimit(this.getCurrentConfiguration().getConfigurationTotalRunTime());

        if (this.getCurrentConfiguration().isGrace) {
            this.fastForward()
        }
        else {
            this.debateTimer.resetTimer()
            this.debateTimer.tick()
            this.debateTimer.pause()
        }
    }
    setConfigurations(configurations: configuration[]) {
        this.configurations = configurations;
    }
    restartTimer() {
        this.debateTimer.setUpperLimit(this.getCurrentConfiguration().getConfigurationTotalRunTime());
    }
    setRoles(roles: string[]) {
        this.roles = roles
    }
}

//export const Debate = new debate([new sixMinutes(), new tenMinutes()], ["role 1", "role b"])

export default debate