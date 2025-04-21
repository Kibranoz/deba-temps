import { ITimer } from "./ITimer"
import timer from "./timer"

export default class CountUpTimer extends timer implements ITimer {
    tick(): void {
        if (this.paused) {
            this.currentPauseTime = Date.now()
        }
        if (this.playing) {
            this.currentDisplayTime = Date.now() - this.timeStartedAt
            this.currentTime = (this.timeStartedAt + this.upperLimit * 1000) - Date.now()
        }
    }
}