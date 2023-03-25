import express from 'express'
import {
  getUsers,
  addUser,
  deleteUser,
  updateUser
} from '../controllers/users.js'

const router = express.Router()
router.get('/', getUsers)
router.post('/', addUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
