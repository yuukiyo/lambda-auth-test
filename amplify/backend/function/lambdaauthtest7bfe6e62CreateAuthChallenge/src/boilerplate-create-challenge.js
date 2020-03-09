/* tslint:disable */
/* eslint-disable */

exports.handler = (event, context) => {
  if (event.request.session.length === 2 && event.request.challengeName === 'CUSTOM_CHALLENGE') {
    event.response.publicChallengeParameters = { trigger: 'true', message: 'メッセージ' };

    event.response.privateChallengeParameters = {};
    event.response.privateChallengeParameters.answer = 'the answer for the challenge';
    event.response.challengeMetadata = 'metaメタ';
  }
  context.done(null, event);
};
