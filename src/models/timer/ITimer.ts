export interface ITimer {
    timeStartedAt: number
    currentTime: number
    paused: boolean
    playing: boolean
    pauseStartedAt: number
    currentPauseTime: number
    upperLimit: number
    minutes: number
    seconds: number

    setUpperLimit(newUpperLimit: number): void
    isDone(): boolean
    tick(): void
    play(): Promise<void>
    sendNotification(whenToSend: Date): void
    resetTimer(): void
    pause(): Promise<void>
    hasExactlyNMinutesRemaining(n: number): boolean
    formatNumber(num: number): string
    getTimeString(): string
}
