import configuration from "@/models/configurations"

class fourMinutes extends configuration {
    constructor() {
        super();
    }
    totalRoundTime = 4*60;
    isMiddle = false;
}

export default fourMinutes;