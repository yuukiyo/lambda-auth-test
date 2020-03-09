import { connect } from "react-redux";
import { AppState } from './store';
import { SignInComponent } from "./signInComponent";
import { Dispatch } from "redux";
import { Actions } from "./action";
import Amplify, { Auth } from 'aws-amplify'
import awsconfig from './aws-exports'
import { CognitoService } from "./CognitoService";
import { SignInForm } from "./reducer";

Amplify.configure(awsconfig);
Auth.configure({
    authenticationFlowType: 'CUSTOM_AUTH'
});

export interface signInHundler {
    hundleInit(): void
    hundleSignIn(signInForm: SignInForm): void
    handleSignOut(): void
    hundleOrder(username: string, price: number): void
    hundleUpdateQuantity(event: any, newValue: number | number[]): void
    hundleUpdateSigInForm(username: string, password: string): void
}

const hundleInit = () => async (dispatch: Dispatch) => {
    Auth.currentSession()
        .then(data => {
            console.log(data)
            dispatch(Actions.updateUsername(data["accessToken"]["payload"]["username"]))
        })
        .catch(err => {
            console.log(err)
        })
    Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => console.log(user))
        .catch(err => console.log(err));
}

const hundleUpdateQuantity = (event: any, quantity: number) => async (dispatch: Dispatch) => {
    dispatch(Actions.updateQuantity(quantity))
    const price = quantity > 9 ? 9800 : quantity * 1000
    dispatch(Actions.updatePrice(price))
}

const hundleUpdateSigInForm = (username: string, password: string) => async (dispatch: Dispatch) => {
    const signInForm: SignInForm = {
        username: username,
        password: password
    }
    dispatch(Actions.updateSignInForm(signInForm))
}

const hundleOrder = (username: string, price: number) => async () => {
    console.log(username)
    console.log(price)
}

const hundleSignIn = (signInForm: SignInForm) => async (dispatch: Dispatch) => {
    try {
        const result = await CognitoService.signIn(signInForm.username, signInForm.password)
        dispatch(Actions.updateUsername(result.username))
    } catch (e) {
        console.log(e)
    }
}

const handleSignOut = () => async (dispatch: Dispatch) => {
    await CognitoService.signOut()
    const signInForm: SignInForm = {
        username: "",
        password: ""
    }
    dispatch(Actions.updateSignInForm(signInForm))
    dispatch(Actions.updateUsername(""))
}

const mapStateToProps = (appState: AppState) => {
    return Object.assign({}, appState.state, {
        username: appState.state.username,
    })
}
export default connect(mapStateToProps, {
    hundleInit,
    hundleSignIn,
    handleSignOut,
    hundleOrder,
    hundleUpdateQuantity,
    hundleUpdateSigInForm
})(SignInComponent)