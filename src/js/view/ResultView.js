export default function ResultView() {
  // TODO : 경주 결과 우승자 영역을 보여주는 함수
  this.showRacingResult = () => {
    document.querySelector('#racing-result').style.display = '';
  };

  this.showRacingWinners = (winners = []) => {
    document.querySelector('#winners').innerHTML = winners.join(', ');
  };

  this.showCongratulatoryMessage = () => 
    setTimeout(() => {
      alert("🎇🎇🎇🎇 축하합니다!🎇🎇🎇🎇");
    }, 2000);
  
}
