import { Preferences } from "@capacitor/preferences"
import debate from "./debate"
import { ISettings } from "./configuration/ISettings"
import Settings from "./configuration/Settings"

class DebateSoundManager {
    minutesReminderFor = [5, 4, 3, 2, 1];
    clockSoundsJustPlayed: any = { "5": false, "4": false, "3": false, "2": false, "1": false };
    configuration: ISettings
    private shouldPlayMinuteSounds = true

    constructor(configuration: ISettings) {
        this.configuration = configuration
    }


    public isShouldPlayMinuteSounds(): boolean {
        return this.shouldPlayMinuteSounds
    }

    public setShouldPlayMinuteSounds(shouldPlayMinuteSounds: boolean): void {
        this.shouldPlayMinuteSounds = shouldPlayMinuteSounds
    }

    roundIsOver() {
        const moon = new Audio("../../../assets/sounds/moon.wav")
        moon.play()
    }
    roundIsReallyOver() {
        const clapping = new Audio("../../../assets/sounds/clap-meow.wav")
        clapping.play()
    }
    changePOIAllowed() {
        const thud = new Audio("../../../assets/sounds/ring.wav")
        thud.play()
    }
    async fetchPreferences(): Promise<void> {
        this.shouldPlayMinuteSounds = await this.configuration.shouldPlayMinuteSounds()
    }
    minutesRemaining(minutesRemaining: number) {

        const clock = new Audio("../../../assets/sounds/clock.wav")
        if (this.isShouldPlayMinuteSounds())
            for (let i = 0; i < minutesRemaining; i++) {
                setTimeout(() => { clock.play() }, (600 * i))
            }
    }

    blockFirstSoundFromPopping(debateState: debate) {
        this.clockSoundsJustPlayed[debateState.getCurrentConfiguration().getTotalRoundTimeInMinutes().toString()] = true

    }

    playAnyNecessarySound(debateState: debate) {

        this.blockFirstSoundFromPopping(debateState)


        if (debateState.isSwitchingRound()) {
            return
        }

        if (debateState.POIAllowedJustChanged) {
            this.changePOIAllowed()
            debateState.POIAllowedJustChanged = false
            return
        }
        if (debateState.roundJustEnded) {
            this.roundIsReallyOver()
            debateState.roundJustEnded = false
            return
        }

        this.minutesReminderFor.forEach(minute => {
            if (debateState.debateTimer.hasExactlyNMinutesRemaining(minute)) {
                if (!this.clockSoundsJustPlayed[minute.toString()]) {
                    this.minutesRemaining(minute)
                }
                this.clockSoundsJustPlayed[minute.toString()] = true
                return
            }
            else {
                this.clockSoundsJustPlayed[minute.toString()] = false
            }
        })



    }
}

const debateSoundManager = new DebateSoundManager(Settings)
export default debateSoundManager