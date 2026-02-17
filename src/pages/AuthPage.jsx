import React, { useState, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useSelector } from 'react-redux'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const AuthPage = () => {
    const [login, setLogin] = useState(true)
    const navigate = useNavigate()
    const { isAuthenticated } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            navigate({ to: '/dashboard' })
        }
    }, [isAuthenticated, navigate])

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