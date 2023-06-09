import express from 'express';
import { RequestValidation } from '../../middlewares/validate-request';
import { acamedic_semester_controller } from './academic-semester.controller';
import { academic_semester_validation } from './academic-semester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  RequestValidation.validate_request(
    academic_semester_validation.create_academic_semester_zod_schema
  ),
  acamedic_semester_controller.create_semester
);

router.get('/:id', acamedic_semester_controller.get_single_semester);
router.get('/', acamedic_semester_controller.get_all_semesters);

export const academic_semester_route = router;
