function ga4Track(eventName: string, params?: any){

  if(process.env.NODE_ENV !== 'production'){
  const mainStyle = "color: #4CAF50; font-size: 16px; font-weight: bold;";
  const eventStyle = "color: #FFC107; font-size: 14px;";
  const paramStyle = "color: #2196F3; font-size: 12px;";

  console.log(
    "%cGA4 Event Tracked:%c %s %cwith parameters %o",
    mainStyle,
    eventStyle,
    eventName,
    paramStyle,
    params || {}
  );

  return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params
  });
}

export function trackSignUp() {
  ga4Track('sign_up')
}

export function trackSignIn() {
  ga4Track('sign_in')
}

export function trackDeleteUser(){
  ga4Track('delete_user')
}

export function trackUploadImageFailBySizeExceeded(){
  ga4Track('upload_image_fail', {
    reason: 'file_size_exceeded'
  })
}