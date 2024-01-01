import debateState from "./debate";
import { i18n } from "@/main";
import Round from "./round";
import RoundBuilder from "./roundBuilder";

class BritishDebateFactory {
    static fromMinutes(minutes:number):debateState {
        const configurations: (Round | undefined)[] = []
        configurations.push(this.makeMiddleDebateRoundFromMinutes(minutes,i18n.global.t("roles.bp.pm")))
        configurations.push(this.makeMiddleDebateRoundFromMinutes(minutes,i18n.global.t("roles.bp.co")))
        configurations.push(this.makeMiddleDebateRoundFromMinutes(minutes,i18n.global.t("roles.bp.vpm")))
        configurations.push(this.makeMiddleDebateRoundFromMinutes(minutes,i18n.global.t("roles.bp.cao")))
        configurations.push(this.makeMiddleDebateRoundFromMinutes(minutes,i18n.global.t("roles.bp.mg")))
        configurations.push(this.makeMiddleDebateRoundFromMinutes(minutes,i18n.global.t("roles.bp.pm")))
        configurations.push(this.makeMiddleDebateRoundFromMinutes(minutes,i18n.global.t("roles.bp.pm")))
        configurations.push(this.makeEndDebateRoundFromMinutes(minutes,i18n.global.t("roles.bp.wg")))
        configurations.push(this.makeEndDebateRoundFromMinutes(minutes,i18n.global.t("roles.bp.wo")))

        const brittishDebate = new debateState(configurations)

        return brittishDebate
    }

    private static makeMiddleDebateRoundFromMinutes(minutes:number, role:string):Round{
        let roundBuilder:RoundBuilder = new RoundBuilder();
        roundBuilder = roundBuilder.setMinutes(minutes);
        roundBuilder = roundBuilder.setRoles(role)

        return roundBuilder.getResult()
    }

    private static makeEndDebateRoundFromMinutes(minutes:number, role:string):Round{
        let roundBuilder:RoundBuilder = new RoundBuilder();
        roundBuilder = roundBuilder.setMinutes(minutes);
        roundBuilder = roundBuilder.setToBeClosingRound()
        roundBuilder = roundBuilder.setRoles(role)

        return roundBuilder.getResult()
    }


}


export default BritishDebateFactory;