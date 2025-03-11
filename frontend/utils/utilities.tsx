import { create } from "domain";
import moment from "moment";
import { Task } from "./types";

export const formatTime = (createdAt: string) => {
  const now = moment();
  const created = moment(createdAt);

  //if task is created today
  if (created.isSame(now, "day")) {
    return "Today";
  }

  //if task was created yesterday
  else if (created.isSame(now.subtract(1, "day"), "day")) {
    return "Yesterday";
  }

  //check if the task was created within last week
  else if (created.isAfter(moment().subtract(6, "days"))) {
    return created.fromNow();
  }

  //check if item is created within last 4 weeks
  else if (created.isAfter(moment().subtract(3, "week"))) {
    return created.fromNow();
  }

  return created.format("DD/MM/YYYY");
};

export const filterTasks = (tasks: Task[], priority: string) => {
  const filteredTasks = () => {
    switch (priority) {
      case "low":
        return tasks.filter((task) => task.priority === "low");
      case "medium":
        return tasks.filter((task) => task.priority === "medium");
      case "high":
        return tasks.filter((task) => task.priority === "high");
      default:
        return tasks;
    }
  };

  return filteredTasks();
};

export const overdueTasks = (tasks: Task[]) => {
  const todayDate = moment();

  //filter tasks that are not completed and are after the due date
  return tasks.filter((task) => {
    return !task.completed && moment(task.dueDate).isBefore(todayDate);
  });
};
