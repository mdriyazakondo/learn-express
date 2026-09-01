import app from "./app";
import config from "./config";
import initDb from "./db";

const main = () => {
  initDb();
  app.listen(config.port, () => {
    console.log(`server is running port : https:/localhost:${config.port}`);
  });
};

export default main();
