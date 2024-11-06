import express, { NextFunction,  Response  } from 'express'; 
import dotenv from 'dotenv'; 
import cors from 'cors'; 
import { Date } from './interface/date';
import router from './router';
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); 
app.use(cors());

app.use((req: Date, res: Response, next: NextFunction) => {
  req.time = new Date(Date.now()).toString();
  console.log(req.method, req.hostname, req.path, req.time);
  next();
});

app.use('/api', router); 
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running on port ${port}`); 
});
