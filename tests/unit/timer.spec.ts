import Timer from "@/models/timer"

describe("timer class", ()=>{
    let timer:Timer

    beforeEach(()=>{
        timer = new Timer(30)
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
        timer.pauseStartedAt -= 40000;
        timer.play();
        timer.tick()
        let timeBeginningAfterPause = timer.timeStartedAt
        expect(timeBeginningAfterPause).toBeGreaterThan(timeBeginning)
    })

})