import CarNamesFieldset from './CarNamesFieldset.js';
import GameTryCountFieldset from './GameTryCountSection.js';

const CarNamesSection = /*html*/ `
<section class="d-flex justify-center mt-5">
  <form data-props="input-form">
  ${CarNamesFieldset()}
  ${GameTryCountFieldset()}
  </form>
</section>
`;

export default CarNamesSection;
