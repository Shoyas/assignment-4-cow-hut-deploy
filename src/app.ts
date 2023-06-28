import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import { UserRoutes } from './app/modules/users/user.route';
import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';
import routes from './app/routes';

const app: Application = express();

app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
// app.use('/api/v1/users', UserRoutes)

app.use('/api/v1', routes);

//Testing
// app.get('/',  (req: Request, res: Response) => {
//   res.send('Working Successfully...')
// })

// Global Error Handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
