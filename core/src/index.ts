import dotenv from 'dotenv';
import path from 'path';
import app from './app';

const dirname = path.resolve(path.dirname(''));

dotenv.config({
  path: path.join(dirname, '.env'),
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`running in port ${port}`));
