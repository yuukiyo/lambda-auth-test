import React, { useEffect } from 'react'
import { makeStyles, Slider, Button, TextField, Typography } from '@material-ui/core'
import { State } from './reducer'
import { signInHundler } from './signInContainer'

const useStyles = makeStyles({
    orderWrapper: {
        margin: '0 auto',
        padding: 30,
        textAlign: 'center',
        '& button': {
            padding: '0 50px'
        },
        maxWidth: 400
    },
    tabesugi: {
        fontSize: '300%'
    },
    button: {
        margin: '30px 0'
    },
    textfieldWrapper: {
        margin: '0 auto',
        padding: 30,
        textAlign: 'center',
        maxWidth: 400
    },
    textfield: {
        margin: '10px 0'
    },
    signInButton: {
        margin: '10px 0',
        padding: '10px 50px'
    }
});

type Props = State & signInHundler

export const SignInComponent: React.FC<Props> = (props: Props) => {
    const count = 1
    useEffect(() => {
        props.hundleInit()
    }, [count])
    const classes = useStyles();
    return (
        <>
            {props.username.length > 0 ?
                <div className={classes.orderWrapper}>
                    <div>ようこそ{props.username}さん</div>
                    <div>マルゲリータは一枚1000円です</div>
                    <div>でも10枚頼むと200円引きです！</div>
                    <Slider
                        defaultValue={0}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={0}
                        max={10}
                        onChange={props.hundleUpdateQuantity}
                    />
                    <div>あなたはピザを{props.quantity}枚頼もうとしているので</div>
                    <div>合計金額は{props.price}円です</div>
                    {props.quantity > 5 ?
                        <div className={classes.tabesugi}>食べすぎwww</div>
                        :
                        <></>
                    }
                    <div className={classes.button}>
                        {
                            props.quantity === 0 ?
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled
                                    onClick={() => props.hundleOrder(props.username, props.price)}
                                >注文</Button>
                                :
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => props.hundleOrder(props.username, props.price)}
                                >注文</Button>
                        }
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.signInButton}
                        onClick={() => props.handleSignOut()}
                    >ログアウト</Button>
                </div>
                :
                <div>
                    <div className={classes.textfieldWrapper}>
                        <Typography variant="h6">ログインして下さい</Typography>
                        <TextField
                            className={classes.textfield}
                            label="username"
                            variant="outlined"
                            fullWidth
                            value={props.signInForm.username}
                            onChange={(e) => {props.hundleUpdateSigInForm(e.target.value, props.signInForm.password)}}
                        />
                        <TextField
                            className={classes.textfield}
                            label="password"
                            variant="outlined"
                            fullWidth
                            value={props.signInForm.password}
                            type="password"
                            onChange={(e) => {props.hundleUpdateSigInForm(props.signInForm.username, e.target.value)}}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.signInButton}
                            onClick={() => props.hundleSignIn(props.signInForm)}
                        >ログイン</Button>
                    </div>
                </div>
            }
        </>
    )
}