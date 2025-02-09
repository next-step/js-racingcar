import Car from "./Car.js";
import { createReadlineInterface, getCarNamesFromInput } from "./io.js";

const main = async () => {
  const readline = createReadlineInterface();

  try {
    const names = await getCarNamesFromInput(readline);
    const cars = names.map((name) => new Car(name));
  } catch (e) {
    if (!(e instanceof Error)) return;
    console.log(e.message);
  } finally {
    readline.close();
  }
};

await main();
