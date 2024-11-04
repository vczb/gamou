interface Window {
  dataLayer: Record<string, any>[];
}

declare var window: Window;

/** new FormData entries */ 
export type FormDataObject = {
  [key: string]: FormDataEntryValue | FormDataEntryValue[];
};