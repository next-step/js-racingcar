import template from "../util/template.js";
import refineName from "../util/refineName.js";

function WinnerBoard(target) {
	this.setWinners = (winners) => {
		this.render(winners);
	};

	const html = (winners) => {
		const div = template("div");
		const h2 = template("h2", { text: `🏆 최종 우승자: ${refineName(winners)} 🏆` });
		const flex = template("div", { class: "d-flex justify-center" });

		const button = template("button", {
			type: "button",
			class: "btn btn-cyan",
			text: "다시 시작하기",
			onClick: () => {
				window.location.reload();
			}
		});

		flex.append(button);
		div.append(h2, flex);

		return div;
	};

	this.render = (winners) => {
		target.innerHTML = "";

		const dom = html(winners);
		target.append(dom);
	};
}

export default WinnerBoard;
