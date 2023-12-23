import fiveMinutesUk from "@/realizations/DebateConfigurations/fiveMinutesUk";
import debateState from "./debate";
import sixMinutesUk from "@/realizations/DebateConfigurations/sixMinutesUk";
import sevenMinutes from "@/realizations/DebateConfigurations/sevenMinutes";
import { i18n } from "@/main";
import configuration from "./configurations";

class BritishDebateFactory {
    static fromMinutes(minutes:number):debateState {
        let configurations: (configuration | undefined)[] = []
        if (minutes == 5) {
            console.log("five")
            configurations = [new fiveMinutesUk(), new fiveMinutesUk(), new fiveMinutesUk(),
            new fiveMinutesUk(), new fiveMinutesUk(), new fiveMinutesUk(), new fiveMinutesUk().setIsMiddle(false), 
            new fiveMinutesUk().setIsMiddle(false)]
        }
        if (minutes == 6) {
            configurations = [new sixMinutesUk(), new sixMinutesUk(), new sixMinutesUk(),
            new sixMinutesUk(), new sixMinutesUk(), new sixMinutesUk(), new sixMinutesUk().setIsMiddle(false),
            new sixMinutesUk().setIsMiddle(false)]
        }

        if (minutes == 7) {
            configurations = [new sevenMinutes(), new sevenMinutes(), new sevenMinutes(), new sevenMinutes(), new sevenMinutes(), new sevenMinutes(), new sevenMinutes().setIsMiddle(false), new sevenMinutes().setIsMiddle(false)]
        }

        const roles = [i18n.global.t("roles.bp.pm"), i18n.global.t("roles.bp.co"), i18n.global.t("roles.bp.vpm"), i18n.global.t("roles.bp.cao"), i18n.global.t("roles.bp.mg"), i18n.global.t("roles.bp.mo"), i18n.global.t("roles.bp.wg"), i18n.global.t("roles.bp.wo")]

        const brittishDebate = new debateState(configurations,roles)

        return brittishDebate
    }


}


export default BritishDebateFactory;