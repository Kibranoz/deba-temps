import fifteenSeconds from "@/realizations/DebateConfigurations/fifteenSeconds";
import fourMinutes from "@/realizations/DebateConfigurations/fourMinutes";
import sevenMinutes from "@/realizations/DebateConfigurations/sevenMinutes";
import sixMinutes from "@/realizations/DebateConfigurations/sixMinutes";
import tenMinutes from "@/realizations/DebateConfigurations/tenMinutes";
import thirtySeconds from "@/realizations/DebateConfigurations/thirtySeconds";
import threeMinutes from "@/realizations/DebateConfigurations/threeMinutes";
import { configFromURL } from "@ionic/core";
import configuration from "./configurations";

class CanadianDebateFactory {
    govMode = "7-3";
    oppMode = "split";

    setGovMode(govMode:string){
        this.govMode = govMode
    }
    setOppMode(oppMode:string){
        this.oppMode = oppMode
    }

    makeConfigList():any[]{
        const configuration = [];
        if (this.govMode == "7-3"){
            configuration.push(new sevenMinutes())
        }
        else {
            configuration.push(new sixMinutes())
        }
        configuration.push(new fifteenSeconds());
        if (this.oppMode == "split") {
            configuration.push(new sevenMinutes())
            configuration.push(new fifteenSeconds())
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
        configuration.push(new fifteenSeconds())
        if (this.govMode == "7-3"){
            configuration.push(new threeMinutes())
        }
        else {
            configuration.push(new fourMinutes())
        }
        configuration.push(new fifteenSeconds())

        return configuration
    }

}

export default CanadianDebateFactory