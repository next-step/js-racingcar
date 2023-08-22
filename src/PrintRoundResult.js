const PrintRoundResult = (cars) => {
  cars.map(($car) => {
    console.log(`${$car.getName().padEnd(6, " ")}: ${"-".repeat($car.getPosition())}`);
  });
  console.log("\n");
};

export default PrintRoundResult;
