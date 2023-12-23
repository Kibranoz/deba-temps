import Timer from "@/models/timer"

describe("timer class", ()=>{
    let timer:Timer
    const SECOND_LOWER_10 = 5
    const SECOND_LOWER_10_WITH_ZEROS = "05"

    const SECOND_BIGGER_10 = 15
    const SECOND_BIGGER_10_WITHOUT_ZEROS = "15"

    const TIMES_PASSING = 40000

    beforeEach(()=>{
        timer = new Timer(30)
        timer.sendNotification = ()=>{

        }
    })

    it("only starts to play once the timer is play()", ()=>{

        expect(timer.timeStartedAt).toBe(0);
        timer.play()
        timer.tick()
        expect(timer.timeStartedAt).not.toBe(0)
    })

    it("compensate from the time passed during pause", ()=>{
        timer.play()
        timer.tick()
        let timeBeginning = timer.timeStartedAt
        timer.pause();
        timer.tick()
        timer.pauseStartedAt -= TIMES_PASSING;
        timer.play();
        timer.tick()
        let timeBeginningAfterPause = timer.timeStartedAt
        expect(timeBeginningAfterPause).toBeGreaterThan(timeBeginning)
    })

    it("can format strings", ()=>{
        expect(timer.formatNumber(SECOND_LOWER_10)).toBe(SECOND_LOWER_10_WITH_ZEROS)
        expect(timer.formatNumber(SECOND_BIGGER_10)).toBe(SECOND_BIGGER_10_WITHOUT_ZEROS)

    })

})