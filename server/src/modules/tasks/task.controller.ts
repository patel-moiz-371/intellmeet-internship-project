import { Request, Response } from 'express'
import { asyncHandler } from '../../utils/asyncHandler'
import { ApiResponse } from '../../utils/ApiResponse'
import * as taskService from './task.service'

const getParam = (value: string | string[]): string =>
  Array.isArray(value) ? value[0] : value

export const getAllTasks = asyncHandler(async (_req: Request, res: Response) => {
  const tasks = await taskService.getAllTasks()
  res.status(200).json(new ApiResponse('Tasks fetched', tasks))
})

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await taskService.createTask(req.body)
  res.status(201).json(new ApiResponse('Task created', task))
})

export const updateTaskStatus = asyncHandler(async (req: Request, res: Response) => {
  const taskId = getParam(req.params.taskId)
  const { status } = req.body
  const task = await taskService.updateTaskStatus(taskId, status)
  res.status(200).json(new ApiResponse('Task status updated', task))
})

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const taskId = getParam(req.params.taskId)
  await taskService.deleteTask(taskId)
  res.status(200).json(new ApiResponse('Task deleted'))
})

export const getTasksByMeeting = asyncHandler(async (req: Request, res: Response) => {
  const meetingId = getParam(req.params.meetingId)
  const tasks = await taskService.getTasksByMeeting(meetingId)
  res.status(200).json(new ApiResponse('Tasks fetched', tasks))
})