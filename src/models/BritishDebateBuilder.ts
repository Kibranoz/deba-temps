import debate from "./debate"
import { i18n } from "@/main"
import Round from "./round"
import RoundBuilder from "./roundBuilder"
import Settings from "./configuration/Settings"

class BritishDebateBuilder {
    static fromMinutes(minutes: number): debate {
        const configurations: (Round | undefined)[] = []
        configurations.push(this.makeMiddleDebateRoundFromMinutes(minutes, i18n.global.t("roles.bp.pm")))
        configurations.push(this.makeMiddleDebateRoundFromMinutes(minutes, i18n.global.t("roles.bp.co")))
        configurations.push(this.makeMiddleDebateRoundFromMinutes(minutes, i18n.global.t("roles.bp.vpm")))
        configurations.push(this.makeMiddleDebateRoundFromMinutes(minutes, i18n.global.t("roles.bp.cao")))
        configurations.push(this.makeMiddleDebateRoundFromMinutes(minutes, i18n.global.t("roles.bp.mg")))
        configurations.push(this.makeMiddleDebateRoundFromMinutes(minutes, i18n.global.t("roles.bp.mo")))
        configurations.push(this.makeEndDebateRoundFromMinutes(minutes, i18n.global.t("roles.bp.wg")))
        configurations.push(this.makeEndDebateRoundFromMinutes(minutes, i18n.global.t("roles.bp.wo")))

        const brittishDebate = new debate(configurations, Settings)

        return brittishDebate
    }

    private static makeMiddleDebateRoundFromMinutes(minutes: number, role: string): Round {
        let roundBuilder: RoundBuilder = new RoundBuilder()
        roundBuilder = roundBuilder.setProtectedAmount(60)
        roundBuilder = roundBuilder.setMinutes(minutes)
        roundBuilder = roundBuilder.setRoles(role)

        return roundBuilder.getResult()
    }

    private static makeEndDebateRoundFromMinutes(minutes: number, role: string): Round {
        let roundBuilder: RoundBuilder = new RoundBuilder()
        roundBuilder = roundBuilder.setMinutes(minutes)
        roundBuilder = roundBuilder.setToBeClosingRound()
        roundBuilder = roundBuilder.setRoles(role)

        return roundBuilder.getResult()
    }


}


export default BritishDebateBuilder