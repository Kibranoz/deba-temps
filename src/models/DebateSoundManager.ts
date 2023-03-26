class DebateSoundManager  {
    roundIsOver(){
        const moon = new Audio("../../../assets/sounds/moon.wav");
        moon.play();
    }
    roundIsReallyOver(){
        const clapping = new Audio("../../../assets/sounds/clapping.wav");
        clapping.play()
    }
    changePOIAllowed(){
        const thud = new Audio("../../../assets/sounds/thud.wav")
        thud.play()
    }
}

const debateSoundManager = new DebateSoundManager();
export default debateSoundManager;