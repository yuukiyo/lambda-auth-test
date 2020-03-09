import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
// import { CognitoUser } from '@aws-amplify/auth';
// import { CognitoUserAttribute, CognitoUserSession } from 'amazon-cognito-identity-js';
// import AWS from 'aws-sdk'
Amplify.configure(awsconfig);
// Auth.configure({
//     authenticationFlowType: 'CUSTOM_AUTH'
// });

export class CognitoService {
    static signIn = async (email: string, password: string) => {
        const challengeResponse = "the answer for the challenge";
        const signIn = await Auth.signIn(email, password)
        const result = await Auth.sendCustomChallengeAnswer(signIn, challengeResponse)
        return result
    }
    static signOut = async () => {
        const result = await Auth.signOut()
        return result
    }
    static signUp = async (username: string, password: string, email: string) => {
        const result = await Auth.signUp({
            username: username,
            password: password,
            attributes: {
                email: email
            },
            validationData: []  //optional
        })
        console.log(result)
        return result
    }
    static confirmSignUp = async (email: string, code: string) => {
        // After retrieving the confirmation code from the user
        const result = await Auth.confirmSignUp(email, code, {
            // Optional. Force user confirmation irrespective of existing alias. By default set to True.
            forceAliasCreation: true
        })
        console.log(result)
        return result
    }
    static resendSignUp = async (email: string) => {
        const result = await Auth.resendSignUp(email)
        console.log(result)
        return result
    }
}