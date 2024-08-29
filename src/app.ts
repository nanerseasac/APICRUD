import express from 'express';
import router from './routes';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(router);


app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT} idk i just wanna die`
  );
});