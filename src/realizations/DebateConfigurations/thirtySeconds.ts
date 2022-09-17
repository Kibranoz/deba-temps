import configuration from "@/models/configurations"

class thirtySeconds extends configuration {
    constructor() {
        super();
    }
    totalRoundTime = 30;
    isMiddle = false;
    isGrace = true;
}

export default thirtySeconds;