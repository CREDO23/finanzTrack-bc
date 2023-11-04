import * as dotenv from 'dotenv';
import App from './app';

dotenv.config();

const PORT = process.env.PORT || 8700;

const app: App = new App();

app.init().then((server) => {
  server.listen(PORT, () => console.log(`Listening on ${PORT}`));
});
