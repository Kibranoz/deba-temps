import { Preferences } from "@capacitor/preferences"
import { ISettings } from "./ISettings"

class Settings implements ISettings {
    async shouldBeCountingUp(): Promise<boolean> {
        return (await Preferences.get({ key: "countUpSetting" })).value === "true"
    }

    async shouldPlayMinuteSounds(): Promise<boolean> {
        return (await Preferences.get({ key: "playMinuteSoundSetting" })).value === "true"
    }
}

const settings = new Settings()
export default settings as Settings