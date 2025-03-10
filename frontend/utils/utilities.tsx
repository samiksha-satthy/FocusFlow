import { create } from "domain";
import moment from "moment"; 

export const formatTime = (createdAt: string) => {
    const now = moment(); 
    const created = moment(createdAt);

    //if task is created today
    if (created.isSame(now, "day")){
        return "Today"; 
    }

    //if task was created yesterday 
    else if (created.isSame(now.subtract(1, "day"), "day")){
        return "Yesterday"; 
    }

    //check if the task was created within last week
    else if (created.isAfter(moment().subtract(6, "days"))){
        return created.fromNow(); 
    }

    //check if item is created within last 4 weeks
    else if (created.isAfter(moment().subtract(3, "week"))){
        return created.fromNow();
    }

    return created.format("DD/MM/YYYY"); 
}