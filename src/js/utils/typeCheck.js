export const instanceCheck = (instance, instanceType) => {
  if (!(instance instanceof instanceType))
    throw Error('해당하는 인스턴스의 인자만 받을 수 있습니다.');
};
