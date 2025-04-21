import Round from "./round";
import debateSoundManager from "./DebateSoundManager";
import Coun from "./timer/timer";
import { ITimer } from "./timer/ITimer";
import CountUpTimer from "./timer/CountUpTImer";
import { ISettings } from "./configuration/ISettings";
import CountDownTimer from "./timer/CountDownTimer";

class debate {
    configurations: any;
    configurationIndex = 0;
    settings: ISettings
    time = 0
    POIAllowed = false;
    private switchingRound = false;

    public isSwitchingRound(): boolean {
        return this.switchingRound;
    }

    public dismissIsSwitchingRound() {

    this.switchingRound = false;

    }
    
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
    
    debateTimer: ITimer

    constructor(configurations: any, settings: ISettings) {
        this.configurations = configurations
        this.settings = settings
        this.debateTimer = new CountDownTimer(this.configurations[this.configurationIndex].getConfigurationTotalRunTime())
    }

    async initializeWithPreferences() {
        if (await this.settings.shouldBeCountingUp()) {
            this.debateTimer = new CountUpTimer(this.configurations[this.configurationIndex].getConfigurationTotalRunTime())
        } else {
            this.debateTimer = new CountDownTimer(this.configurations[this.configurationIndex].getConfigurationTotalRunTime())
        }
    }


    getCurrentConfiguration(): Round {
        return this.configurations[this.configurationIndex]
    }
    getTimer(): ITimer {
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

    play() {
        this.dismissIsSwitchingRound()
        this.debateTimer.play()
    }
    fastBackward() {
        this.switchingRound = true;
        if (this.configurationIndex <= 0) {
            this.configurationIndex = this.configurations.length - 1;
        }
        else {
            this.configurationIndex -= 1;
        }

        this.debateTimer.setUpperLimit(this.getCurrentConfiguration().getConfigurationTotalRunTime());

        this.debateTimer.pause();
        this.debateTimer.resetTimer()
        this.getIfPOIAllowed()
        this.POIAllowedJustChanged = false

    }

    fastForward() {
        this.switchingRound = true
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
        this.getIfPOIAllowed()
        this.POIAllowedJustChanged = false
        }
    setConfigurations(configurations: Round[]) {
        this.configurations = configurations;
    }
    restartTimer() {
        this.debateTimer.setUpperLimit(this.getCurrentConfiguration().getConfigurationTotalRunTime());
    }
}

//export const Debate = new debate([new sixMinutes(), new tenMinutes()], ["role 1", "role b"])

export default debate