function toEqualType(value, type) {
  const valueType = typeof value;

  if (valueType === type) {
    return {
      pass: true,
      message: () => 'Equal Type',
    };
  }
  return {
    pass: false,
    message: () => 'Different Type',
  };
}

expect.extend({ toEqualType });
