export const printRacingOutput = (racingResult) => {
  console.log("");
  console.log("실행 결과");

  racingResult.forEach((round) => {
    Object.entries(round).forEach(([carName, position]) => {
      console.log(`${carName} : ${"-".repeat(position)}`);
    });
    console.log("");
  });

  console.log("경주를 완료했습니다.");
};
