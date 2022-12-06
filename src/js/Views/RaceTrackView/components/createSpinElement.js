function createSpinElement() {
  const spinElementWrapper = document.createElement('div');
  spinElementWrapper.classList.add('d-flex', 'justify-center', 'mt-3');
  spinElementWrapper.innerHTML = `
    <div class="relative spinner-container">
      <span class="material spinner"></span>
    </div>
  `;

  return spinElementWrapper;
}

export { createSpinElement };
