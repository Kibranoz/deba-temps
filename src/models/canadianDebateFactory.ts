import fifteenSeconds from "@/realizations/DebateConfigurations/fifteenSeconds";
import fourMinutes from "@/realizations/DebateConfigurations/fourMinutes";
import sevenMinutes from "@/realizations/DebateConfigurations/sevenMinutes";
import sixMinutes from "@/realizations/DebateConfigurations/sixMinutes";
import tenMinutes from "@/realizations/DebateConfigurations/tenMinutes";
import thirtySeconds from "@/realizations/DebateConfigurations/thirtySeconds";
import threeMinutes from "@/realizations/DebateConfigurations/threeMinutes";
import { configFromURL } from "@ionic/core";
import configuration from "./configurations";
import {i18n} from "@/main"
class CanadianDebateFactory {
    govMode = "sevenThree";
    oppMode = "split";

    setGovMode(govMode:string){
        this.govMode = govMode
    }
    setOppMode(oppMode:string){
        this.oppMode = oppMode
    }

    makeConfigList():any[]{
        const configuration = [];
        const roles = []
        if (this.govMode == "sevenThree"){
            configuration.push(new sevenMinutes())
        }
        else {
            configuration.push(new sixMinutes())
        }
        roles.push(i18n.global.t("roles.cp.pm"))
        configuration.push(new fifteenSeconds());
        if (this.oppMode == "split") {
            configuration.push(new sevenMinutes())
            configuration.push(new fifteenSeconds())
            roles.push(i18n.global.t("roles.cp.co"))
            roles.push(i18n.global.t("roles.cp.mc"))
            roles.push(i18n.global.t("roles.cp.mo"))
        }
        else {
            roles.push(i18n.global.t("roles.cp.mo"))
            roles.push(i18n.global.t("roles.cp.mc"))
        }
        configuration.push(new sevenMinutes());
        configuration.push(new fifteenSeconds());
        configuration.push(new sevenMinutes());
        configuration.push(new fifteenSeconds());

        if (this.oppMode == "trad"){
            configuration.push(new tenMinutes());
        }
        else {
            configuration.push(new threeMinutes())
        }
        roles.push(i18n.global.t("roles.cp.co"))
        configuration.push(new fifteenSeconds())
        if (this.govMode == "sevenThree"){
            configuration.push(new threeMinutes())
        }
        else {
            configuration.push(new fourMinutes())
        }
        roles.push(i18n.global.t("roles.cp.pm"))
        configuration.push(new fifteenSeconds())

        return [configuration,roles]
    }

}

export default CanadianDebateFactory