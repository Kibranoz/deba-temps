export interface ISettings {
    shouldBeCountingUp(): Promise<boolean>;
    shouldPlayMinuteSounds(): Promise<boolean>;
    }