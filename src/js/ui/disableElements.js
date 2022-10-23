export default function disableElements(...elements) {
  [...elements].forEach(it => it.setAttribute('disabled', true));
}