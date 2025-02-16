import { Todolist } from "../../api/todolistsApi.types"
import { v1 } from "uuid"
import {
  addTodolist,
  changeTodolistFilter,
  changeTodolistTitle,
  DomainTodolist,
  removeTodolist,
  todolistsReducer,
} from "../todolistsSlice"

let todolistId1: string
let todolistId2: string
let startState: DomainTodolist[] = []

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = [
    { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
    { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
  ]
})

test("correct todolist should be removed", () => {
  const action = removeTodolist.fulfilled({ id: todolistId1 }, "requestId", todolistId1)
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
  const todolist: Todolist = {
    title: "New Todolist",
    id: "any id",
    addedDate: "",
    order: 0,
  }

  const action = addTodolist.fulfilled({ todolist }, "requestId", "New Todolist")
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(todolist.title)
  expect(endState[0].filter).toBe("all")
})

test("correct todolist should change its name", () => {
  const newTitle = "New Todolist"

  const action = changeTodolistTitle.fulfilled({ id: todolistId2, title: newTitle }, "requestId", {
    id: todolistId2,
    title: newTitle,
  })
  const endState = todolistsReducer(startState, action)

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(newTitle)
})

test("correct filter of todolist should be changed", () => {
  const newFilter = "completed"
  const action = changeTodolistFilter({ id: todolistId2, filter: newFilter })
  const endState = todolistsReducer(startState, action)

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(newFilter)
})
