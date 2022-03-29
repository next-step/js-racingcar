const CarName = () => {
  return `
    <form class="d-flex car-name-form" data-form="name-form">
      <input type="text" class="w-100 mr-2 car-name-input" placeholder="자동차 이름" data-form="name-input"/>
      <button type="submit" class="btn btn-cyan car-name-button" data-form="name-button">확인</button>
    </form>
  `
}

export default CarName;
