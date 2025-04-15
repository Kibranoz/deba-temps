import { i18n } from "@/main";
import Round from "./round";
import RoundBuilder from "./roundBuilder";

class USDebateBuilder {
    configurations:Round[] = []
    public createDefaultDebate():Round[] {
        this.addRound(7,i18n.global.t("roles.cp.pm"))
        this.addRound(8,i18n.global.t("roles.cp.co"))
        this.addRound(8,i18n.global.t("roles.ap.mg"))
        this.addRound(8,i18n.global.t("roles.cp.mo"))
        this.addRound(4,i18n.global.t("roles.cp.co"))
        this.addRound(5,i18n.global.t("roles.cp.pm"))
        return this.configurations;



    }

    private addRound(minute:number,role:string) {
        const roundBuilder = new RoundBuilder();
        roundBuilder.setProtectedAmount(60)
        roundBuilder.setMinutes(minute);
        roundBuilder.setRoles(role);
        this.configurations.push(roundBuilder.getResult());
        
    }
}

export default USDebateBuilder;