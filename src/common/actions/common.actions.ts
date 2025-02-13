import { createAction } from "@reduxjs/toolkit"
import { TasksStateType } from "features/todolists/model/tasksSlice"
import { DomainTodolist } from "features/todolists/model/todolistsSlice"

export type ClearTasksAndTodolistsType = {
  tasks: TasksStateType
  todolists: DomainTodolist[]
}

export const clearTasksAndTodolists = createAction<ClearTasksAndTodolistsType>("common/create-tasks-todolists")
