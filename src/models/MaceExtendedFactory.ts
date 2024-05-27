import { i18n } from "@/main";
import Round from "./round";
import RoundBuilder from "./roundBuilder";

class MaceExtendedDebateOrchestrator {
    private configurations:Round[] = []
    public mainSpeakerMinutes = 5

    public setMainSpeakerMinutes(mainSpeakerSeconds: number): void {
        this.mainSpeakerMinutes = mainSpeakerSeconds;
    }
    public summarySpeakerMinutes = 5


    public setSummarySpeakerMinutes(summarySpeakerSeconds: number): void {
        this.summarySpeakerMinutes = summarySpeakerSeconds;
    }

    public makeConfigList(): Round[] {
        this.makeFirstPropositionSpeaker()
        this.makeFirstOppositionSpeaker()
        this.makeSecondPropositionSpeaker()
        this.makeSecondOppositionSpeaker()
        this.makeSummaryPropositionSpeaker()
        this.makeSummaryOppositionSpeaker()
        return this.configurations 
    }

    private getBaseMaceExtendedBuilder(){
        return new RoundBuilder().setProtectedAmount(60)
    }
    
    private makeFirstPropositionSpeaker(){
        let roundBuilder = this.getBaseMaceExtendedBuilder();
        roundBuilder = roundBuilder.setMinutes(this.mainSpeakerMinutes)
        roundBuilder.setRoles(i18n.global.t("roles.me.fp"))
        this.configurations.push(roundBuilder.getResult())
    }

    private makeFirstOppositionSpeaker(){
        let roundBuilder = this.getBaseMaceExtendedBuilder();
        roundBuilder = roundBuilder.setMinutes(this.mainSpeakerMinutes)
        roundBuilder.setRoles(i18n.global.t("roles.me.fo"))
        this.configurations.push(roundBuilder.getResult())
    }

    private makeSecondPropositionSpeaker(){
        let roundBuilder = this.getBaseMaceExtendedBuilder();
        roundBuilder = roundBuilder.setMinutes(this.mainSpeakerMinutes)
        roundBuilder.setRoles(i18n.global.t("roles.me.sp"))
        this.configurations.push(roundBuilder.getResult())
    }

    private makeSecondOppositionSpeaker(){
        let roundBuilder = this.getBaseMaceExtendedBuilder();
        roundBuilder = roundBuilder.setMinutes(this.mainSpeakerMinutes)
        roundBuilder.setRoles(i18n.global.t("roles.me.so"))
        this.configurations.push(roundBuilder.getResult())
    }

    private makeSummaryPropositionSpeaker(){
        let roundBuilder = this.getBaseMaceExtendedBuilder();
        roundBuilder = roundBuilder.setMinutes(this.summarySpeakerMinutes)
        roundBuilder.setRoles(i18n.global.t("roles.me.sup"))
        this.configurations.push(roundBuilder.getResult())
    }

    private makeSummaryOppositionSpeaker(){
        let roundBuilder = this.getBaseMaceExtendedBuilder();
        roundBuilder = roundBuilder.setMinutes(this.summarySpeakerMinutes)
        roundBuilder.setRoles(i18n.global.t("roles.me.suo"))
        this.configurations.push(roundBuilder.getResult())
    }

}

export default MaceExtendedDebateOrchestrator