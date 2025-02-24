import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: {
    IBG_CHECKLIST: [
      {
        id: 1,
        name: "GET Credentials",
        completed: false,
      },
      {
        id: 2,
        name: "Add Intake Video",
        completed: false,
      },
      {
        id: 3,
        name: "Create ARPA Tree",
        completed: false,
      },
    ],
    TE_CHECKLIST: [
      {
        id: 1,
        name: "Verify Credentials",
        completed: false,
      },
      {
        id: 2,
        name: "Go through Intake Video",
        completed: false,
      },
      {
        id: 3,
        name: "Go through BRD",
        completed: false,
      },
      {
        id: 4,
        name: "Update cachet tree name",
        completed: false,
      },
      {
        id: 5,
        name: "Verify Call IA Version",
        completed: false,
      },
      {
        id: 6,
        name: "Verify Call IA API Call",
        completed: false,
      },
      {
        id: 7,
        name: "Verify Datastore Call",
        completed: false,
      },
      {
        id: 8,
        name: "Verify Refill Bid",
        completed: false,
      },
      {
        id: 9,
        name: "Verify Lane Count",
        completed: false,
      },
      {
        id: 10,
        name: "Verify Logs",
        completed: false,
      },
    ],
    TDM_CHECKLIST: [
      {
        id: 1,
        name: "ABC",
        completed: false,
      },
      {
        id: 2,
        name: "ABC",
        completed: false,
      },
      {
        id: 3,
        name: "ABC",
        completed: false,
      },
      {
        id: 4,
        name: "ABC",
        completed: false,
      },
    ],
  },
};

const checklistSlice = createSlice({
  name: "checklist",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { checklistType, taskName } = action.payload;
      const newTask = {
        id: Date.now(),
        name: taskName,
        completed: false,
      };
      state.tasks[checklistType].push(newTask);
    },
    toggleTask: (state, action) => {
      const { checklistType, taskId } = action.payload;
      const task = state.tasks[checklistType].find(
        (task) => task.id === taskId
      );
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

export const { addTask, toggleTask } = checklistSlice.actions;
export default checklistSlice.reducer;
