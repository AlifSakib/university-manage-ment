import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import global_error_handler from './app/middlewares/global-error-handler';
import routes from './app/routes';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
// app.use('/api/v1/users', UserRoutes);
// app.use('/api/v1/academic-semesters', academic_semester_route);

app.use('/api/v1', routes);

//global error handler
app.use(global_error_handler);

//route not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route not found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'Api not found',
      },
    ],
  });
  next();
});

export default app;
