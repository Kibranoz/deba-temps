import fourMinutes from "@/realizations/DebateConfigurations/fourMinutes";
import sevenMinutes from "@/realizations/DebateConfigurations/sevenMinutes";
import sixMinutes from "@/realizations/DebateConfigurations/sixMinutes";
import tenMinutes from "@/realizations/DebateConfigurations/tenMinutes";
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
        if (this.oppMode == "split") {
            configuration.push(new sevenMinutes())
            roles.push(i18n.global.t("roles.cp.co"))
            roles.push(i18n.global.t("roles.cp.mc"))
            roles.push(i18n.global.t("roles.cp.mo"))
        }
        else {
            roles.push(i18n.global.t("roles.cp.mo"))
            roles.push(i18n.global.t("roles.cp.mc"))
        }
        configuration.push(new sevenMinutes());
        configuration.push(new sevenMinutes());

        if (this.oppMode == "trad"){
            configuration.push(new tenMinutes());
        }
        else {
            configuration.push(new threeMinutes())
        }
        roles.push(i18n.global.t("roles.cp.co"))
        if (this.govMode == "sevenThree"){
            configuration.push(new threeMinutes())
        }
        else {
            configuration.push(new fourMinutes())
        }
        roles.push(i18n.global.t("roles.cp.pm"))
        return [configuration,roles]
    }

}

export default CanadianDebateFactory