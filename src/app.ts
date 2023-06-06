import cors from 'cors';
import express, { Application } from 'express';
import global_error_handler from './app/middlewares/global-error-handler';
import { UserRoutes } from './app/modules/users/user.router';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/users', UserRoutes);

app.use(global_error_handler);

export default app;
