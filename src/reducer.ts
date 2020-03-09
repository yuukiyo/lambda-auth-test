import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { Actions } from './action'

export interface SignInForm {
    username: string,
    password: string
}

export interface State {
    username: string,
    price: number,
    quantity: number,
    signInForm: SignInForm
}

const initialState: State = {
    username: '',
    price: 0,
    quantity: 0,
    signInForm: {
        username: "",
        password: ""
    }
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