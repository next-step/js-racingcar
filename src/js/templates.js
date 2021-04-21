'use strict';

const template = {
  car: name => {
    return `
	  	<div class="car mr-2">
			<div class="car-player">${name}</div>
			<div class="car-process"></div>
			<div class="d-flex justify-center mt-3">
				<div class="relative spinner-container">
					<span class="material spinner"></span>
				</div>
			</div>
		</div>
	  `;
  },

  forward: () => {
    return `
	  	<div class="forward-icon mt-2">⬇️️</div>
	  `;
  },

  wait: () => {
    return `
		<div class="d-flex justify-center mt-3">
			<div class="relative spinner-container">
				<span class="material spinner"></span>
			</div>
		</div>
	`;
  },

  resultSection: names => {
    return `
		<div>
			<h2>🏆 최종 우승자: ${names.join(', ')} 🏆</h2>
			<div class="d-flex justify-center">
			<button type="button" class="btn btn-cyan">다시 시작하기</button>
			</div>
		</div>
	  `;
  },
};

export { template };
