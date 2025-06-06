const isMobileDevice = (userAgent: Navigator["userAgent"]) => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );
};

export default isMobileDevice;
