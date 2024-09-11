import { FlashMessageProps } from "@/components/FlashMessage";
import { dispatch, FLASH_MESSAGE_EVENT } from "./events";

const renderFlashMessage = (props: FlashMessageProps) => {
  dispatch(FLASH_MESSAGE_EVENT, props);
};

export default renderFlashMessage;
