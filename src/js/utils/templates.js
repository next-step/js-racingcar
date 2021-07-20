"use strict";

const templates = {
  car: (name) => {
    return `
            <div class="mr-2">
                <div class="car-player">${name}</div>
                <div class="d-flex justify-center mt-3 spinner">
                    <div class="relative spinner-container">
                        <span class="material spinner"></span>
                    </div>
                </div>
            </div>
        `;
  },
  goAhead: () => {
    return `
        <div class="forward-icon mt-2">⬇️️</div>
      `;
  },
  spinner: () => {
    return `
            <div class="d-flex justify-center mt-3 spinner">
                <div class="relative spinner-container">
                    <span class="material spinner"></span>
                </div>
            </div>
        `;
  },
  result: (winner) => {
    return `
        <div>
            <h2>🏆 최종 우승자: ${winner} 🏆</h2>
            <div class="d-flex justify-center">
                <button type="button" class="btn btn-cyan" id="reset">다시 시작하기</button>
            </div>
        </div>
      `;
  },
};

export default templates;
