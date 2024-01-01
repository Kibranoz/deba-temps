import GovMode from "@/enum/GovMode";
import OppMode from "@/enum/OppMode";
import CanadianDebateOrchestrator from "@/models/canadianDebateFactory"
describe("canadianFactory", ()=>{
    let canadianFactory:CanadianDebateOrchestrator;
    const SEVEN_MINUTES =  7*60;
    const SIX_MINUTES = 6*60
    const FOUR_MINUTES = 4*60;
    const THREE_MINUTES = 3*60;
    const CO_BEGIN_SPLIT = 1;
    const CO_END_SPLIT = 4;
    const CO_END_TRADITIONNAL = 3;
    const TEN_MINUTES = 10*60
    const PM_BEGIN_SPLIT = 0;
    const PM_END_SPLIT = 5;
    const MO_SPLIT = 3
    const MC_SPLIT = 2

    beforeEach(()=>{
        canadianFactory = new CanadianDebateOrchestrator();
    })
    it("has default values",()=>{
        expect(canadianFactory.govMode).toBe(GovMode.SEVEN_THREE)
        expect(canadianFactory.oppMode).toBe(OppMode.SPLIT)
    }
    )
    it("will set the correct time for split", ()=>{
        canadianFactory.setGovMode(GovMode.SEVEN_THREE);
        canadianFactory.setOppMode(OppMode.SPLIT)
        let roundList = canadianFactory.makeConfigList();
        expect(roundList[CO_BEGIN_SPLIT].getConfigurationTotalRunTime()).toBe(SEVEN_MINUTES)
        expect(roundList[CO_END_SPLIT].getConfigurationTotalRunTime()).toBe(THREE_MINUTES)
    })

    it("will set the correct time for traditionnal", ()=>{
        canadianFactory.setGovMode(GovMode.SEVEN_THREE);
        canadianFactory.setOppMode(OppMode.TRAD)
        let roundList = canadianFactory.makeConfigList();
        expect(roundList[CO_END_TRADITIONNAL].getConfigurationTotalRunTime()).toBe(TEN_MINUTES)
    })

    it("will set the correct time for 6-4", ()=>{
        canadianFactory.setGovMode(GovMode.SIX_FOUR);
        canadianFactory.setOppMode(OppMode.SPLIT)
        let roundList = canadianFactory.makeConfigList();
        expect(roundList[PM_BEGIN_SPLIT].getConfigurationTotalRunTime()).toBe(SIX_MINUTES)
        expect(roundList[PM_END_SPLIT].getConfigurationTotalRunTime()).toBe(FOUR_MINUTES)

    })

    it("will set the correct time for 7-3", ()=>{
        canadianFactory.setGovMode(GovMode.SEVEN_THREE);
        canadianFactory.setOppMode(OppMode.SPLIT)
        let roundList = canadianFactory.makeConfigList();
        expect(roundList[PM_BEGIN_SPLIT].getConfigurationTotalRunTime()).toBe(SEVEN_MINUTES)
        expect(roundList[PM_END_SPLIT].getConfigurationTotalRunTime()).toBe(THREE_MINUTES)
    })

    it("PM first speech should be a round with POI", ()=>{
        let roundList = canadianFactory.makeConfigList();
        expect(roundList[PM_BEGIN_SPLIT].isMiddleRound()).toBe(true)
    })

    it("CO first speech in split should be a round with POI", ()=>{
        let roundList = canadianFactory.makeConfigList();
        expect(roundList[CO_BEGIN_SPLIT].isMiddleRound()).toBe(true)
    })
    it("MO speech should be a round with POI", ()=>{
        let roundList = canadianFactory.makeConfigList();
        expect(roundList[MO_SPLIT].isMiddleRound()).toBe(true)
    })
    it("MC speech should be a round with POI", ()=>{
        let roundList = canadianFactory.makeConfigList();
        expect(roundList[MC_SPLIT].isMiddleRound()).toBe(true)
    })

    it("PM last speech should not be a round with POI", ()=>{
        let roundList = canadianFactory.makeConfigList();
        expect(roundList[PM_END_SPLIT].isMiddleRound()).toBe(false)
    })

    it("CO last speech in split should not be a round with POI", ()=>{
        let roundList = canadianFactory.makeConfigList();
        expect(roundList[CO_END_SPLIT].isMiddleRound()).toBe(false)
    })

    it("CO round in trad should be a round with POI", ()=>{
        let roundList = canadianFactory.makeConfigList();
        expect(roundList[CO_END_TRADITIONNAL].isMiddleRound()).toBe(true)
    })

})