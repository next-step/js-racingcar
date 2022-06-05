export default function ResultView() {
  this.showRacingResult = () => {
    document.querySelector('#racing-result').style.display = '';
  };

  this.hideRacingResult = () => {
    document.querySelector('#racing-result').style.display = 'none';
  };

  this.showRacingWinners = (winners = []) => {
    document.querySelector('#winners').innerHTML = winners.join(', ');
  };

  this.showCongratulatoryMessage = () => 
    setTimeout(() => {
      alert("🎇🎇🎇🎇 축하합니다!🎇🎇🎇🎇");
    }, 2000);
  
}
