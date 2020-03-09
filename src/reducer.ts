import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { Actions } from './action'

export interface SignInForm {
    username: string,
    password: string
}

export interface SignUpForm {
    username: string,
    password: string,
    email: string
}

export interface State {
    username: string,
    price: number,
    quantity: number,
    signInForm: SignInForm,
    signUpForm: SignUpForm,
    isSignUpPage: boolean
}

const initialState: State = {
    username: '',
    price: 0,
    quantity: 0,
    signInForm: {
        username: "",
        password: ""
    },
    signUpForm: {
        username: "",
        password: "",
        email: ""
    },
    isSignUpPage: false
}

export const Reducers = reducerWithInitialState(initialState)
    .case(Actions.updateUsername, (state, username) => {
        return Object.assign({}, state, { username })
    })
    .case(Actions.updatePrice, (state, price) => {
        return Object.assign({}, state, { price })
    })
    .case(Actions.updateQuantity, (state, quantity) => {
        return Object.assign({}, state, { quantity })
    })
    .case(Actions.updateSignInForm, (state, signInForm) => {
        return Object.assign({}, state, { signInForm })
    })
    .case(Actions.updateSignUpForm, (state, signUpForm) => {
        return Object.assign({}, state, { signUpForm })
    })
    .case(Actions.updateToggleSignUpPage, (state, isSignUpPage) => {
        return Object.assign({}, state, { isSignUpPage })
    })