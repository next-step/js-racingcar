import Fieldset from "./Fieldset.js";

const Form = () => {
  return `
    <section class="d-flex items-center justify-center mt-5 racing-info-section" data-form="section">
      <form class="racing-form" data-form="form">
        ${Fieldset('name', '자동차 이름')}
      </form>
    </section>
  `
}

export default Form;
