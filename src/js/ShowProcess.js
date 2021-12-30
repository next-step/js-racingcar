import { processingTemplate, processTemplate } from "./utils/templates.js";

export default class ShowProcess {
	constructor({ initialCarNames, initialTryTimes, $showProcess, $carPlayers }) {
		this.initialCarNames = initialCarNames;
		this.initialTryTimes = initialTryTimes;
		this.$showProcess = $showProcess;
	}

	async render() {
		this.$showProcess.innerHTML = processTemplate(this.initialCarNames);
		const waitUntilDone = async () => {
			return await new Promise((resolve) => {
				let count = 1;
				const timeoutId = setInterval(() => {
					[
						...this.$showProcess.querySelectorAll(".car-player"),
					].forEach((element) =>
						element.insertAdjacentHTML(
							"afterend",
							processingTemplate(this.initialTryTimes)
						)
					);
					if (count++ === this.initialTryTimes) {
						[
							...this.$showProcess.querySelectorAll(".spinner-container"),
						].forEach((element) => element.classList.add("hidden"));
						clearInterval(timeoutId);
						resolve();
					}
				}, 1000);
			});
		};
		await waitUntilDone();
	}

	async setState(nextCarNames, nextTryTimes) {
		this.initialCarNames = nextCarNames;
		this.initialTryTimes = nextTryTimes;
		await this.render();
	}
}
