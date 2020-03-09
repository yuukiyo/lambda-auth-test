exports.handler = (event, context) => {
  if (event.request.session.length === 1 && event.request.session[0].challengeName === 'SRP_A') {
    event.response.issueTokens = false;
    event.response.failAuthentication = false;
    event.response.challengeName = 'PASSWORD_VERIFIER';
    console.log("1")
  } else if (
    event.request.session.length === 2 &&
    event.request.session[1].challengeName === 'PASSWORD_VERIFIER' &&
    event.request.session[1].challengeResult === true
  ) {
    event.response.issueTokens = false;
    event.response.failAuthentication = false;
    event.response.challengeName = 'CUSTOM_CHALLENGE';
    console.log("2")
  } else if (
    event.request.session.length === 3 &&
    event.request.session[2].challengeName === 'CUSTOM_CHALLENGE' &&
    event.request.session[2].challengeResult === true
  ) {
    event.response.issueTokens = true;
    event.response.failAuthentication = false;
    console.log("3")
  } else {
    event.response.issueTokens = false;
    event.response.failAuthentication = true;
    console.log("4")

  }
  console.log(`issueTokens:${event.response.issueTokens}`)
  console.log(`failAuthentication:${event.response.failAuthentication}`)
  context.done(null, event);
};
