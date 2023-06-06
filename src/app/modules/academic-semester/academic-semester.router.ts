import express from 'express';
import { RequestValidation } from '../../middlewares/validate-request';
import { academic_semester_validation } from './academic-semester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  RequestValidation.validate_request(
    academic_semester_validation.create_academic_semester_zod_schema
  )
);

export const UserRoutes = router;
