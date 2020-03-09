import actionCreatorFactory, { } from 'typescript-fsa'
import {SignInForm, SignUpForm} from './reducer'

const actionCreator = actionCreatorFactory()

export const Actions = {
    updateUsername: actionCreator<string>('UPDATE_USERNAME'),
    updatePrice: actionCreator<number>('UPDATE_PRICE'),
    updateQuantity: actionCreator<number>('UPDATE_QUANTITY'),
    updateSignInForm: actionCreator<SignInForm>('UPDATE_SIGNIN_FORM'),
    updateSignUpForm: actionCreator<SignUpForm>('UPDATE_SIGNUP_FORM'),
    updateToggleSignUpPage: actionCreator<boolean>('UPDATE_TOGGLE_SIGNUP_PAGE'),
}