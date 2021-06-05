import { LOADER_ID, FORWARD_ID } from "../constants/index.js";

export const headerTemplate = (name) => `<div class="car-player">${name}</div>`;

export const forwardTemplate = (id) => {
  const $container = document.createElement("div");
  $container.id = FORWARD_ID;
  $container.dataset.id = id;
  $container.className = "forward-icon mt-2";
  $container.innerText = "⬇️";
  return $container;
};

export const loaderTemplate = (id) => {
  const $container = document.createElement("div");
  $container.id = LOADER_ID;
  $container.dataset.id = id;
  $container.className = "d-flex justify-center mt-3";
  $container.innerHTML = `
    <div class="relative spinner-container">
      <span class="material spinner"></span>
    </div>`;
  return $container;
};
