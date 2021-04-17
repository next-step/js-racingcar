function checkNames(carsName = '') {
  const splitNames = carsName.trim().split(',');
  return splitNames.every((name) => name && name.length <= 5);
}

function checkTimes(times) {
  return times > 0;
}

function errorAlert(error) {
  return alert(ERROR_MSG[error]);
}
