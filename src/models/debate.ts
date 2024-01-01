import Round from "./round";
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

    constructor(configurations: any) {
        this.configurations = configurations
        this.debateTimer = new timer(this.configurations[this.configurationIndex].getConfigurationTotalRunTime())
    }

    getCurrentConfiguration(): Round {
        return this.configurations[this.configurationIndex]
    }
    getTimer(): timer {
        return this.debateTimer
    }

    getWhoIsTalking() {
        return this.configurations[this.configurationIndex].getRole();
    }

    getIfPOIAllowed(): boolean {
        if (this.getCurrentConfiguration().timeIsAboveLowerBound(this.debateTimer.currentTime)
            && this.getCurrentConfiguration().timeIsBelowUpperBound(this.debateTimer.currentTime)) {
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
    setConfigurations(configurations: Round[]) {
        this.configurations = configurations;
    }
    restartTimer() {
        this.debateTimer.setUpperLimit(this.getCurrentConfiguration().getConfigurationTotalRunTime());
    }
}

//export const Debate = new debate([new sixMinutes(), new tenMinutes()], ["role 1", "role b"])

export default debateState