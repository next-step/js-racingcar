
import { handleAttemptNumberButton, handleRacingCarNameButton, handleResetButton } from "./handlers/form.js";
import { $attemptNumberButton, $racingcarNameButton, $resetButton, hideAttemptFieldset } from "./views/form.js";
import { hideRacingcarSection, hideResultSection } from "./views/racing.js";

hideAttemptFieldset();
hideRacingcarSection();
hideResultSection();

$racingcarNameButton.addEventListener('click', handleRacingCarNameButton);
$attemptNumberButton.addEventListener('click', handleAttemptNumberButton);
$resetButton.addEventListener('click', handleResetButton);
