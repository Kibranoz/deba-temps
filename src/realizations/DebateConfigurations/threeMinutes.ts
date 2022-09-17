import configuration from "@/models/configurations"

class threeMinutes extends configuration {
    constructor() {
        super();
    }
    totalRoundTime = 3*60;
    isMiddle = false;
}


export default threeMinutes;