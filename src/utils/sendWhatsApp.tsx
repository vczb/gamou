import isMobileDevice from "./isMobileDevice";

const sendWhatsApp = (phone: string, message: string) => {
  const isMobile = isMobileDevice(navigator.userAgent);
  const encodedMessage = encodeURIComponent(message);
  if (isMobile) {
    window.location.href = `whatsapp://send?phone=${phone}&text=${encodedMessage}`;
  } else {
    window.open(
      `https://web.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`,
      "_blank"
    );
  }
};

export default sendWhatsApp;
