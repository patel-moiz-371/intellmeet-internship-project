// server/src/modules/meetings/meeting.controller.ts
import { Request, Response } from 'express'
import { asyncHandler } from '../../utils/asyncHandler'
import { ApiResponse } from '../../utils/ApiResponse'
import { ApiError } from '../../utils/ApiError'
import * as meetingService from './meeting.service'

export const getAllMeetings = asyncHandler(async (_req: Request, res: Response) => {
  const meetings = await meetingService.getAllMeetings()
  res.status(200).json(new ApiResponse('Meetings fetched', meetings))
})

export const getMeetingById = asyncHandler(async (req: Request, res: Response) => {
  const { meetingId } = req.params
  const meeting = await meetingService.getMeetingById(meetingId)
  if (!meeting) {
    res.status(404).json({ success: false, message: 'Meeting not found' })
    return
  }
  res.status(200).json(new ApiResponse('Meeting fetched', meeting))
})

export const createMeeting = asyncHandler(async (req: Request, res: Response) => {
  const { title, scheduledAt } = req.body
  const host = (req as any).user.userId
  if (!title || !scheduledAt) {
    res.status(400).json({ success: false, message: 'Title and scheduledAt are required' })
    return
  }
  const meeting = await meetingService.createMeeting({ title, host, scheduledAt })
  res.status(201).json(new ApiResponse('Meeting created', meeting))
})

export const updateMeetingStatus = asyncHandler(async (req: Request, res: Response) => {
  const { meetingId } = req.params
  const { status } = req.body
  const meeting = await meetingService.updateMeetingStatus(meetingId, status)
  if (!meeting) {
    res.status(404).json({ success: false, message: 'Meeting not found' })
    return
  }
  res.status(200).json(new ApiResponse('Meeting status updated', meeting))
})

export const deleteMeeting = asyncHandler(async (req: Request, res: Response) => {
  const { meetingId } = req.params
  await meetingService.deleteMeeting(meetingId)
  res.status(200).json(new ApiResponse('Meeting deleted'))
})

export const joinMeeting = asyncHandler(async (req: Request, res: Response) => {
  const { meetingId } = req.params
  const userId = (req as any).user.userId
  const meeting = await meetingService.joinMeeting(meetingId, userId)
  if (!meeting) {
    res.status(404).json({ success: false, message: 'Meeting not found' })
    return
  }
  res.status(200).json(new ApiResponse('Joined meeting', meeting))
})