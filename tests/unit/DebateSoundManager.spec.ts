import debateSoundManager from "@/models/DebateSoundManager";
import debateState from "@/models/debate";

const mockAudio = {
        play: jest.fn(),
 } as unknown as HTMLAudioElement;

jest.spyOn(globalThis, 'Audio').mockImplementation(() => mockAudio);

describe("Debate sound manager", ()=>{

    const MINUTES_REMAINING = 3

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

    debateSoundManager.minutesRemaining(MINUTES_REMAINING)

    expect(mockAudio.play).toBeCalledTimes(MINUTES_REMAINING);
})
it("will select the correct sound to play", ()=>{
    //let debateState:debateState = jest.mock('@/models/debateState');
    //debateState.roundJustEnded =
    //expect(debateSoundManager.round
})
}

)