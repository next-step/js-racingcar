import Component from '../core/Component';

class NameForm extends Component {
  template = /*html*/ `
    <form>
      <p>
        5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
        예시) EAST, WEST, SOUTH, NORTH
      </p>
      <div class="d-flex">
        <input type="text" class="w-100 mr-2" placeholder="자동차 이름" />
        <button type="button" class="btn btn-cyan">확인</button>
      </div>
    </form>
  `;
}

customElements.define('my-name-form', NameForm);
