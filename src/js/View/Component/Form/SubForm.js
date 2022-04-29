// 컴포넌트가 전체적으로 재사용성이 엉망임 리팩토링 요망
const SubForm = (dataName, placeholder) => {
  return `
    <div class="d-flex" data-form="${dataName}-container">
      <input 
        type="${dataName === 'name' ? 'text' : 'number'}" 
        class="w-100 mr-2 ${dataName === 'name' ? 'car-name-input' : 'racing-count-input'}" 
        placeholder="${placeholder}" 
        data-form="${dataName}-input"/>
      <button 
        type="button"
        class="btn btn-cyan ${dataName === 'name' ? 'car-name-button' : 'racing-count-button'}"
        data-form="${dataName}-button">확인</button>
    </div>
  `
}

export default SubForm;
