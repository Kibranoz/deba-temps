import sixMinutes from "@/realizations/DebateConfigurations/sixMinutes";
import tenMinutes from "@/realizations/DebateConfigurations/tenMinutes";
import configuration from "./configurations";
import debateSoundManager from "./DebateSoundManager";
import timer from "./timer";

class debateState {
    //caN Be any amount 
    configurations: any;
    configurationIndex = 0;
    time = 0
    POIAllowed = false;
    private _POIAllowedJustChanged = false;

    private _roundJustEnded = false;
    public get roundJustEnded() {
        return this._roundJustEnded;
    }
    public set roundJustEnded(value) {
        this._roundJustEnded = value;
    }

    public get POIAllowedJustChanged() {
        return this._POIAllowedJustChanged;
    }
    public set POIAllowedJustChanged(value) {
        this._POIAllowedJustChanged = value;
    }
    
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
        return this.roles[this.configurationIndex]
    }

    getIfPOIAllowed(): boolean {
        if (this.debateTimer.currentTime <= this.getCurrentConfiguration().getTimeWhenQuestionStartsToBeAllowed() * 1000
            && this.debateTimer.currentTime > this.getCurrentConfiguration().getTimeWhenQuestionStopBeingAllowed() * 1000) {
            //was not allowed, now is
            if (!this.POIAllowed) {
                this.POIAllowedJustChanged = true;
                this.POIAllowed = true
            }
        }
        else {
            // was allowed, now isn't 
            if (this.POIAllowed) {
                this.POIAllowedJustChanged = true;
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
        this.roundJustEnded = true;
        this.debateTimer.tick();
        this.debateTimer.pause();
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
        this.debateTimer.tick()
        this.debateTimer.pause()
        
    }
    fastBackward() {
        if (this.configurationIndex <= 0) {
            this.configurationIndex = this.configurations.length - 1;
        }
        else {
            this.configurationIndex -= 1;
        }

        this.debateTimer.setUpperLimit(this.getCurrentConfiguration().getConfigurationTotalRunTime());

        this.debateTimer.pause();
        this.debateTimer.resetTimer()
    }

    fastForward() {
        if (this.configurationIndex >= this.configurations.length - 1) {
            this.configurationIndex = 0;
        }
        else {
            this.configurationIndex += 1;
        }
        this.debateTimer.setUpperLimit(this.getCurrentConfiguration().getConfigurationTotalRunTime());

        this.debateTimer.resetTimer()
        this.debateTimer.tick()
        this.debateTimer.pause()
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

export default debateState