export default function RaceTrack({ cars }) {
	const raceTrackDiv = document.getElementById("raceTrack");
	let raceTrackHTML = "";
	cars.forEach((car) => {
		const progress = car.position;
		const progressBars = "-".repeat(progress);
		raceTrackHTML += `${car.name}: ${progressBars}<br>`;
	});

	raceTrackDiv.innerHTML += raceTrackHTML;
}
