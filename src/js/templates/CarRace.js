const carTemplate = (id) => {
  const $container = document.createElement("div");
  $container.className = "mr-2";
  $container.dataset.id = id;
  return $container;
};

export default carTemplate;
