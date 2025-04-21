import BritishDebateBuilder from "@/models/BritishDebateBuilder";
import debateSoundManager from "@/models/DebateSoundManager";
import debate from "@/models/debate";
import Round from "@/models/round";
const mockAudio = {
        play: jest.fn(),
 } as unknown as HTMLAudioElement;

jest.spyOn(globalThis, 'Audio').mockImplementation(() => mockAudio);

describe("Debate sound manager", ()=>{


    const MINUTES_REMAINING = 3
    const MINUTES_AMOUNT = 4
    const MINUTES_INDEX = "4"

    beforeEach(()=>{
        jest.clearAllMocks();
    })

it("will play the changePOI sound", ()=>{

    debateSoundManager.changePOIAllowed()

    expect(mockAudio.play).toBeCalled();
})

it("will play the round is over sound", ()=>{

    debateSoundManager.roundIsOver()

    expect(mockAudio.play).toBeCalled();
})

it("will play the roundIsReallyOver sound", ()=>{

    debateSoundManager.roundIsReallyOver()

    expect(mockAudio.play).toBeCalled();
})
it("will play the minutes remaining the number of times it is being asked", ()=>{
    jest.useFakeTimers();
    jest.spyOn(globalThis, 'setTimeout');

    debateSoundManager.minutesRemaining(MINUTES_REMAINING)

    expect(setTimeout).toBeCalledTimes(MINUTES_REMAINING);
})

it("does not play any sound following the forwarding of a round", ()=> {
    let debateState:debate = jest.createMockFromModule("@/models/debate")
    debateState.isSwitchingRound = ()=>{return true;}
    debateState.dismissIsSwitchingRound = jest.fn()
    jest.spyOn(debateSoundManager,"blockFirstSoundFromPopping").mockImplementationOnce(jest.fn())
    debateSoundManager.playAnyNecessarySound(debateState);

    expect(mockAudio.play).toBeCalledTimes(0)
})

it("will prevent the minutes clock from being played at the beginning using the block function", ()=> {
    let debateState:debate = BritishDebateBuilder.fromMinutes(MINUTES_AMOUNT);
    debateSoundManager.blockFirstSoundFromPopping(debateState)
    expect(debateSoundManager.clockSoundsJustPlayed[MINUTES_INDEX]).toBeTruthy()
})

it("will not play the minute sounds if the settings says so", ()=>{
    jest.spyOn(debateSoundManager, "isShouldPlayMinuteSounds").mockImplementationOnce(()=>{return true})
    debateSoundManager.minutesRemaining(6);
    expect(mockAudio.play).toBeCalledTimes(0)

})

}

)