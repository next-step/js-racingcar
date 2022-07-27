import { $ } from './DOM.js';

const competitionCountInput = $('.competition-count-input');

const getCompetitionCount = () => Number(competitionCountInput.value);

export default getCompetitionCount;
