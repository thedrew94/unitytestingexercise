// todoList.test.js
const todoList = require("./todoList");

describe("todolist ", () => {
  test("should add a task to the list", () => {
    const list = todoList();
    list.addTask("Buy milk");
    expect(list.listTasks()).toEqual(["Buy milk"]);
  });

  test("should remove a task from the list", () => {
    const list = todoList();
    list.addTask("Buy milk");
    list.addTask("Walk dog");
    list.removeTask("Buy milk");
    expect(list.listTasks()).toEqual(["Walk dog"]);
  });

  test("mark a task as completed", () => {
    const list = todoList();
    list.addTask("Buy milk");
    list.completeTask("Buy milk");
    expect(list.listTasks()).toEqual([{ task: "Buy milk", completed: true }]);
  });

  test("should list tasks including their completion status", () => {
    const list = todoList();
    list.addTask("Buy milk");
    list.addTask("Walk dog");
    list.completeTask("Buy milk");
    expect(list.listTasks()).toEqual([
      { task: "Buy milk", completed: true },
      { task: "Walk dog", completed: false },
    ]);
  });
});

// todoList.js
function todoList() {
  let tasks = [];

  function addTask(task) {
    tasks.push({ task: task, completed: false });
  }

  function removeTask(task) {
    tasks = tasks.filter((t) => t.task !== task);
  }

  function completeTask(task) {
    tasks = tasks.map((t) => {
      if (t.task === task) {
        return { ...t, completed: true };
      }
      return t;
    });
  }

  function listTasks() {
    return tasks;
  }

  return {
    addTask,
    removeTask,
    completeTask,
    listTasks,
  };
}

module.exports = todoList;
