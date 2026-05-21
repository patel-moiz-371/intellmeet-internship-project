import { Server } from 'socket.io'

export const initSocket = (io: Server): void => {
  io.on('connection', (socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`)

    socket.on('join-room', (roomId: string) => {
      socket.join(roomId)
      console.log(`Socket ${socket.id} joined room ${roomId}`)
    })

    socket.on('leave-room', (roomId: string) => {
      socket.leave(roomId)
      console.log(`Socket ${socket.id} left room ${roomId}`)
    })

    socket.on('disconnect', () => {
      console.log(`🔌 Socket disconnected: ${socket.id}`)
    })
  })
}