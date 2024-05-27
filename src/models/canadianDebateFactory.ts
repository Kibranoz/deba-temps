import Round from "./round";
import {i18n} from "@/main"
import RoundBuilder from "./roundBuilder";
import GovMode from "@/enum/GovMode";
import OppMode from "@/enum/OppMode";
class CanadianDebateOrchestrator {
    govMode = GovMode.SEVEN_THREE;
    oppMode = OppMode.SPLIT;

    private configuration:Round[] = []

    setGovMode(govMode:GovMode){
        this.govMode = govMode
    }
    setOppMode(oppMode:OppMode){
        this.oppMode = oppMode
    }

    makeConfigList():Round[]{
        this.makePrimeMinisterBeginning();
        this.makeOppositionLeaderBeginning()
        this.makeSecondSpeakers()
        this.makeOppositionLeaderEnd();
        this.makePrimeMinisterEnd()

        return this.configuration
    }

    private getBaseCanadianBuilder():RoundBuilder{
        return new RoundBuilder().setProtectedAmount(60);
    }

    private makePrimeMinisterBeginning() {
        let roundBuilder = this.getBaseCanadianBuilder()
        if (this.govMode == GovMode.SEVEN_THREE){
            roundBuilder = roundBuilder.setMinutes(7)
        }
        else {
            roundBuilder = roundBuilder.setMinutes(6)
            roundBuilder = roundBuilder.setProtectedAmount(30)
        }
        roundBuilder.setRoles(i18n.global.t("roles.cp.pm"))
        this.configuration.push(roundBuilder.getResult())
    }

    private makeOppositionLeaderBeginning(){
        if (this.oppMode == OppMode.SPLIT){
            let roundBuilder = this.getBaseCanadianBuilder()
            roundBuilder = roundBuilder.setMinutes(7)
            roundBuilder.setRoles(i18n.global.t("roles.cp.co"))
            this.configuration.push(roundBuilder.getResult())
        }
    }

    private makeSecondSpeakers() {
        if (this.oppMode == OppMode.SPLIT) {
            this.makeSecondSpeaker(i18n.global.t("roles.cp.mc"))
            this.makeSecondSpeaker(i18n.global.t("roles.cp.mo"))
        }
        else {
            this.makeSecondSpeaker(i18n.global.t("roles.cp.mo")) 
            this.makeSecondSpeaker(i18n.global.t("roles.cp.mc"))
        }
    }
    private makeSecondSpeaker(role:string){
        let roundBuilder = this.getBaseCanadianBuilder();
        roundBuilder = roundBuilder.setMinutes(7)
        roundBuilder.setRoles(role)
        this.configuration.push(roundBuilder.getResult())
    }

    private makeOppositionLeaderEnd(){
        let roundBuilder = this.getBaseCanadianBuilder();
        if (this.oppMode == OppMode.TRAD){
            roundBuilder = roundBuilder.setMinutes(10);
            roundBuilder.overrideProtectedEndAmount(4*60)
        }

        else{
            roundBuilder = roundBuilder.setMinutes(3)
            roundBuilder = roundBuilder.setToBeClosingRound();
        }
        roundBuilder.setRoles(i18n.global.t("roles.cp.co"))
        this.configuration.push(roundBuilder.getResult())
    }

    private makePrimeMinisterEnd(){
        let roundBuilder = this.getBaseCanadianBuilder()
        if (this.govMode == GovMode.SEVEN_THREE){
            roundBuilder = roundBuilder.setMinutes(3)
        }
        else {
            roundBuilder = roundBuilder.setMinutes(4)
        }
        roundBuilder.setRoles(i18n.global.t("roles.cp.pm"))
        roundBuilder.setToBeClosingRound()
        this.configuration.push(roundBuilder.getResult())
    }

}

export default CanadianDebateOrchestrator