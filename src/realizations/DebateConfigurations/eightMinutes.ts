import configuration from "@/models/configurations"

class eightMinutes extends configuration {
    constructor() {
        super()
    }
    totalRoundTime = 8*60;
    isMiddle = true;
}

export default eightMinutes;