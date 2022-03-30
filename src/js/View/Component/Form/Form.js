import Fieldset from "./Fieldset.js";

const Form = () => {
  return `
    <section class="d-flex flex-column items-center justify-center mt-5 racing-info-section" data-form="section">
      ${Fieldset('name', '자동차 이름')}
    </section>
  `
}

export default Form;
