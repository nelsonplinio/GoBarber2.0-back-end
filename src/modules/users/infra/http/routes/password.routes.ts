import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRoter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRoter.post('/forgot', forgotPasswordController.create);
passwordRoter.post('/reset', resetPasswordController.create);

export default passwordRoter;
