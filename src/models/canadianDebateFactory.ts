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
        roles.push("Premier ministre")
        configuration.push(new fifteenSeconds());
        if (this.oppMode == "split") {
            configuration.push(new sevenMinutes())
            configuration.push(new fifteenSeconds())
            roles.push("Chef de l'opposition")
            roles.push("Ministre de la couronne")
            roles.push("Membre de l'opposition")
        }
        else {
            roles.push("Membre de l'opposition")
            roles.push("Ministre de la couronne")
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
        roles.push("Chef de l'opposition")
        configuration.push(new fifteenSeconds())
        if (this.govMode == "sevenThree"){
            configuration.push(new threeMinutes())
        }
        else {
            configuration.push(new fourMinutes())
        }
        roles.push('Premier Ministre')
        configuration.push(new fifteenSeconds())

        return [configuration,roles]
    }

}

export default CanadianDebateFactory