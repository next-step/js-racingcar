import { Racing } from "./domain/racing/racing.model.js";

async function main() {
  const racing = new Racing();

  await racing.setup();
  racing.start();
  racing.end();
  racing.display();
}

main();
