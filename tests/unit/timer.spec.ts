import  CountDownTimer  from "@/models/timer/CountDownTimer"
import CountUpTimer from "@/models/timer/CountUpTImer"
import Timer from "@/models/timer/timer"

describe("timer class", ()=>{
    let timer:Timer
    const SECOND_LOWER_10 = 5
    const SECOND_LOWER_10_WITH_ZEROS = "05"

    const SECOND_BIGGER_10 = 15
    const SECOND_BIGGER_10_WITHOUT_ZEROS = "15"

    const TIMES_PASSING = 40000

    const ONE_SECOND = 1000

    beforeEach(()=>{
        timer = new CountDownTimer(30)
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

    it("when counting up, currentTimeDisplay starts at 0", ()=>{
        timer = new CountUpTimer(30)
        timer.sendNotification = ()=>{
        }
        timer.play()
        timer.tick()
        expect(timer.currentDisplayTime).toBe(0)
    })

    it("when counting down, currentTimeDisplay starts at the total time", ()=>{
        timer = new CountDownTimer(30)
        timer.sendNotification = ()=>{
        }
        timer.play()
        timer.tick()
        expect(timer.currentDisplayTime).toBe(timer.upperLimit * 1000)
    })

    it ("when counting down, time counts down", ()=>{
        timer = new CountDownTimer(30)
        timer.sendNotification = ()=>{
        }
        timer.play()
        timer.timeStartedAt = new Date(Date.now() - ONE_SECOND).getTime()
        timer.tick()
        expect(timer.currentDisplayTime).toBe((timer.upperLimit * 1000) - ONE_SECOND)
    })

    it ("when counting up, time counts up", ()=>{
        timer = new CountUpTimer(30)
        timer.sendNotification = ()=>{
        }
        timer.play()
        timer.timeStartedAt = new Date(Date.now() - ONE_SECOND).getTime()
        timer.tick()
        expect(timer.currentDisplayTime).toBe(ONE_SECOND)
    })

    it ("can tell when the timer is done", ()=> {
        timer.play()
        timer.timeStartedAt = new Date(Date.now() - (timer.upperLimit * 1000)).getTime()
        timer.tick()
        expect(timer.isDone()).toBe(true)
    })

})