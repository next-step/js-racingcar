const player = ({ name }) => {
  return `
    <div class="mr-2" data-player=${name}>
      <div class="car-player">${name}</div>
    </div>
  `;
};

export default player;
