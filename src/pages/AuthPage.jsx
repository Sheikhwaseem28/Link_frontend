import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const AuthPage = () => {
    const [login, setLogin] = useState(true)

    return (
        <>
            {login ? (
                <LoginForm onToggleForm={() => setLogin(false)} />
            ) : (
                <RegisterForm onToggleForm={() => setLogin(true)} />
            )}
        </>
    )
}

export default AuthPage