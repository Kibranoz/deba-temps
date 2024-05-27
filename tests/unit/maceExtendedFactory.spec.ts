import MaceExtendedDebateOrchestrator from "@/models/MaceExtendedFactory";

describe("Mace extended factory", ()=> {
    let maceExtendedFactory:MaceExtendedDebateOrchestrator
    const MAIN_SPEAKER_CONFIG_INDEX = 0;
    const ANY_CONFIG_INDEX = 0
    const MAIN_SPEAKER_MINUTES = 6
    const SUMMARY_SPEAKER_MINUTES = 4
    const SUMMARY_SPEAKER_CONFIG_INDEX = 4
    const ONE_MINUTE_IN__SECONDS = 60;
    beforeEach(()=>{
        maceExtendedFactory = new MaceExtendedDebateOrchestrator();
    })

    it("has default values for main speaker minutes", ()=> {
        expect(maceExtendedFactory.mainSpeakerMinutes).toBe(5)
        expect(maceExtendedFactory.summarySpeakerMinutes).toBe(5)
    })
    it("for a given main speaker configuration, it gives the amount of minutes specified", ()=>{
        maceExtendedFactory.setMainSpeakerMinutes(MAIN_SPEAKER_MINUTES)
        const configList = maceExtendedFactory.makeConfigList()
        expect(configList[MAIN_SPEAKER_CONFIG_INDEX].getTotalRoundTimeInMinutes()).toBe(MAIN_SPEAKER_MINUTES)
    })
    it("for a given summary speaker configuration, it gives the amount of minutes specified", ()=>{
        maceExtendedFactory.setSummarySpeakerMinutes(SUMMARY_SPEAKER_MINUTES)
        const configList = maceExtendedFactory.makeConfigList()
        expect(configList[SUMMARY_SPEAKER_CONFIG_INDEX].getTotalRoundTimeInMinutes()).toBe(SUMMARY_SPEAKER_MINUTES)
    })
    it ("for any configuration we have middle round ", ()=>{
        const configList = maceExtendedFactory.makeConfigList()
        expect(configList[ANY_CONFIG_INDEX].isMiddleRound()).toBe(true)
    })
    it("for any configuration we have one minute protected time", ()=>{
        const configList = maceExtendedFactory.makeConfigList()
        expect(configList[ANY_CONFIG_INDEX].getAmountOfSecondsProtectedInTheBeginning()).toBe(ONE_MINUTE_IN__SECONDS)
    })

    it("have six speakers in total", ()=>{
        const configList = maceExtendedFactory.makeConfigList()
        expect(configList.length).toBe(6)  
    })
})