import express from 'express';
import { requireSignIn } from '../middlewares/authMiddleware';
import { formidable } from 'express-formidable';

// rate teacher
router.post('/rate-teacher', rateTeacherController);

export default router;

