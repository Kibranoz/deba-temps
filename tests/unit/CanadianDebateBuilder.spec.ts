import GovMode from "@/enum/GovMode";
import OppMode from "@/enum/OppMode";
import { i18n } from "@/main";
import CanadianDebateBuilder from "@/models/CanadianDebateBuilder"
describe("canadian builder", ()=>{
    let canadianBuilder:CanadianDebateBuilder;
    const SEVEN_MINUTES =  7*60;
    const SIX_MINUTES = 6*60
    const FOUR_MINUTES = 4*60;
    const THREE_MINUTES = 3*60;
    const CO_BEGIN_SPLIT = 1;
    const SECOND_SPEAKER_POSITION = 1;
    const CO_END_SPLIT = 4;
    const CO_END_TRADITIONNAL = 3;
    const TEN_MINUTES = 10*60
    const PM_BEGIN_SPLIT = 0;
    const PM_END_SPLIT = 5;
    const MO_SPLIT = 3
    const MC_SPLIT = 2

    beforeEach(()=>{
        canadianBuilder = new CanadianDebateBuilder();
    })
    it("has default values",()=>{
        expect(canadianBuilder.govMode).toBe(GovMode.SEVEN_THREE)
        expect(canadianBuilder.oppMode).toBe(OppMode.SPLIT)
    }
    )
    it("will set the correct time for split", ()=>{
        canadianBuilder.setGovMode(GovMode.SEVEN_THREE);
        canadianBuilder.setOppMode(OppMode.SPLIT)
        let roundList = canadianBuilder.makeConfigList();
        expect(roundList[CO_BEGIN_SPLIT].getConfigurationTotalRunTime()).toBe(SEVEN_MINUTES)
        expect(roundList[CO_END_SPLIT].getConfigurationTotalRunTime()).toBe(THREE_MINUTES)
    })

    it("will set the correct time for traditionnal", ()=>{
        canadianBuilder.setGovMode(GovMode.SEVEN_THREE);
        canadianBuilder.setOppMode(OppMode.TRAD)
        let roundList = canadianBuilder.makeConfigList();
        expect(roundList[CO_END_TRADITIONNAL].getConfigurationTotalRunTime()).toBe(TEN_MINUTES)
    })

    it("will set the correct time for 6-4", ()=>{
        canadianBuilder.setGovMode(GovMode.SIX_FOUR);
        canadianBuilder.setOppMode(OppMode.SPLIT)
        let roundList = canadianBuilder.makeConfigList();
        expect(roundList[PM_BEGIN_SPLIT].getConfigurationTotalRunTime()).toBe(SIX_MINUTES)
        expect(roundList[PM_END_SPLIT].getConfigurationTotalRunTime()).toBe(FOUR_MINUTES)

    })

    it("will set the correct time for 7-3", ()=>{
        canadianBuilder.setGovMode(GovMode.SEVEN_THREE);
        canadianBuilder.setOppMode(OppMode.SPLIT)
        let roundList = canadianBuilder.makeConfigList();
        expect(roundList[PM_BEGIN_SPLIT].getConfigurationTotalRunTime()).toBe(SEVEN_MINUTES)
        expect(roundList[PM_END_SPLIT].getConfigurationTotalRunTime()).toBe(THREE_MINUTES)
    })

    it("in trad mode, second speaker will be opposition member", ()=>{
        canadianBuilder.setGovMode(GovMode.SEVEN_THREE);
        canadianBuilder.setOppMode(OppMode.TRAD);
        let roundList = canadianBuilder.makeConfigList();
        expect(roundList[SECOND_SPEAKER_POSITION].getRole()).toBe(i18n.global.t("roles.cp.mo"));
    })
    it("in trad mode, opposition leader gets 4 minutes of protected time", ()=>{
        canadianBuilder.setGovMode(GovMode.SEVEN_THREE);
        canadianBuilder.setOppMode(OppMode.TRAD);
        let roundList = canadianBuilder.makeConfigList();
        expect(roundList[CO_END_TRADITIONNAL].getAmountOfSecondsProtectedInTheEnd()).toBe(FOUR_MINUTES);
    })

    it("PM first speech should be a round with POI", ()=>{
        let roundList = canadianBuilder.makeConfigList();
        expect(roundList[PM_BEGIN_SPLIT].isMiddleRound()).toBe(true)
    })

    it("CO first speech in split should be a round with POI", ()=>{
        let roundList = canadianBuilder.makeConfigList();
        expect(roundList[CO_BEGIN_SPLIT].isMiddleRound()).toBe(true)
    })
    it("MO speech should be a round with POI", ()=>{
        let roundList = canadianBuilder.makeConfigList();
        expect(roundList[MO_SPLIT].isMiddleRound()).toBe(true)
    })
    it("MC speech should be a round with POI", ()=>{
        let roundList = canadianBuilder.makeConfigList();
        expect(roundList[MC_SPLIT].isMiddleRound()).toBe(true)
    })

    it("PM last speech should not be a round with POI", ()=>{
        let roundList = canadianBuilder.makeConfigList();
        expect(roundList[PM_END_SPLIT].isMiddleRound()).toBe(false)
    })

    it("CO last speech in split should not be a round with POI", ()=>{
        let roundList = canadianBuilder.makeConfigList();
        expect(roundList[CO_END_SPLIT].isMiddleRound()).toBe(false)
    })

    it("CO round in trad should be a round with POI", ()=>{
        let roundList = canadianBuilder.makeConfigList();
        expect(roundList[CO_END_TRADITIONNAL].isMiddleRound()).toBe(true)
    })

})