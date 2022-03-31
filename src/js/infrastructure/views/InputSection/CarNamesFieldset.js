const CarNamesFieldset = () => /*html*/ `
<fieldset data-props="car-names-field">
  <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
  <p>
    5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
    예시) EAST, WEST, SOUTH, NORTH
  </p>
  <div class="d-flex">
    <input type="text" class="w-100 mr-2" placeholder="자동차 이름" data-props="car-names-input" />
    <button type="button" class="btn btn-cyan" data-props="car-names-confirm-button">확인</button>
  </div>
</fieldset>
`;

export default CarNamesFieldset;
