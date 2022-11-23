export default function disableElements(...elements) {
  console.log(elements);
  elements.forEach(it => it.setAttribute('disabled', true));
}