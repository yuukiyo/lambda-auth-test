exports.handler = (event, context, callback) => {
  // insert code to be executed by your lambda trigger
  console.log(event)
  event.response.autoConfirmUser = true
  event.response.autoVerifyEmail = true
  callback(null, event);
};
