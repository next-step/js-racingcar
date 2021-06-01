function GameStartInput({ target, onKeyInput, button, onClick }) {
	target.addEventListener("keydown", onKeyInput);
	button.addEventListener('click', onClick);
}

export default GameStartInput;
