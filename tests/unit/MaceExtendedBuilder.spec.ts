import MaceExtendedDebateBuilder from "@/models/MaceExtendedBuilder";

describe("Mace extended builder", ()=> {
    let maceExtendedBuilder:MaceExtendedDebateBuilder
    const MAIN_SPEAKER_CONFIG_INDEX = 0;
    const ANY_CONFIG_INDEX = 0
    const MAIN_SPEAKER_MINUTES = 6
    const SUMMARY_SPEAKER_MINUTES = 4
    const SUMMARY_SPEAKER_CONFIG_INDEX = 4
    const ONE_MINUTE_IN__SECONDS = 60;
    beforeEach(()=>{
        maceExtendedBuilder = new MaceExtendedDebateBuilder();
    })

    it("has default values for main speaker minutes", ()=> {
        expect(maceExtendedBuilder.mainSpeakerMinutes).toBe(5)
        expect(maceExtendedBuilder.summarySpeakerMinutes).toBe(5)
    })
    it("for a given main speaker configuration, it gives the amount of minutes specified", ()=>{
        maceExtendedBuilder.setMainSpeakerMinutes(MAIN_SPEAKER_MINUTES)
        const configList = maceExtendedBuilder.makeConfigList()
        expect(configList[MAIN_SPEAKER_CONFIG_INDEX].getTotalRoundTimeInMinutes()).toBe(MAIN_SPEAKER_MINUTES)
    })
    it("for a given summary speaker configuration, it gives the amount of minutes specified", ()=>{
        maceExtendedBuilder.setSummarySpeakerMinutes(SUMMARY_SPEAKER_MINUTES)
        const configList = maceExtendedBuilder.makeConfigList()
        expect(configList[SUMMARY_SPEAKER_CONFIG_INDEX].getTotalRoundTimeInMinutes()).toBe(SUMMARY_SPEAKER_MINUTES)
    })
    it ("for any configuration we have middle round ", ()=>{
        const configList = maceExtendedBuilder.makeConfigList()
        expect(configList[ANY_CONFIG_INDEX].isMiddleRound()).toBe(true)
    })
    it("for any configuration we have one minute protected time", ()=>{
        const configList = maceExtendedBuilder.makeConfigList()
        expect(configList[ANY_CONFIG_INDEX].getAmountOfSecondsProtectedInTheBeginning()).toBe(ONE_MINUTE_IN__SECONDS)
    })

    it("have six speakers in total", ()=>{
        const configList = maceExtendedBuilder.makeConfigList()
        expect(configList.length).toBe(6)  
    })
})