const handleAddEventListener = ({ targetDom, event, callback }) => {
  targetDom.addEventListener(event, callback);
};

export { handleAddEventListener };
