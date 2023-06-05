import express from 'express'
import { RequestValidation } from '../../middlewares/validate-request'
import { UserController } from './user.controller'
import { UserValidation } from './user.validation'

const router = express.Router()

router.post(
  '/create-user',
  RequestValidation.validate_request(UserValidation.create_user_zod_schema),
  UserController.createUser
)

export const UserRoutes = router
