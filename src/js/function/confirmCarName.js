import {
  INVALID_CAR_NAME_GAP_ALERT,
  INVALID_CAR_NAME_LENGTH_ALERT,
} from "../../constant/alert.js";
import { $inputCarName, $tryContainer } from "../../constant/constant.js";
import {
  CAR_NAME_GAP_REGEX,
  CAR_NAME_MAX_LENGTH,
  CAR_NAME_REST_REGEX,
} from "../../constant/validation.js";

export const confirmCarName = () => {
  const carNameArray = [];
  const carNameStr = $inputCarName.value.split(CAR_NAME_REST_REGEX);
  let isTryContainerCheck = true;

  carNameStr.map((car) => {
    let carName = car.replace(CAR_NAME_GAP_REGEX, "");
    if (carName.length > CAR_NAME_MAX_LENGTH) {
      isTryContainerCheck = false;
      return alert(
        `${carName}을 수정해주세요,${INVALID_CAR_NAME_LENGTH_ALERT}`
      );
    }

    if (carName === "") {
      isTryContainerCheck = false;
      return alert(INVALID_CAR_NAME_GAP_ALERT);
    }

    carNameArray.push(carName);
  });

  if (isTryContainerCheck) {
    $tryContainer.style.display = "block";
    $inputCarName.disabled = true;
  }

  return carNameArray;
};
