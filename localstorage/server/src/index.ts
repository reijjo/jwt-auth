import chalk from "chalk";
import { app } from "./app";
import { config } from "./utils/config";

app.listen(config.PORT, () => {
  console.log(chalk.cyanBright(`Server on port ${config.PORT}`));
});
