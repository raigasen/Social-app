import { useState, useEffect } from 'react'

import Stack from '@mui/material/Stack'
import Card from '@mui/joy/Card'
import Avatar from '@mui/joy/Avatar'
import Alert from '@mui/joy/Alert'
import Button from '@mui/joy/Button'
import Divider from '@mui/joy/Divider'
import TextField from '@mui/joy/TextField'
import Typography from '@mui/joy/Typography'

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import KeyIcon from '@mui/icons-material/Key'
import ErrorIcon from '@mui/icons-material/Error'

import { loginUser, useAxios } from '../utils/apiCalls'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/userContext'

const Login = () => {
  const { session, setSession, setUser } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false)
  const { data, error, setError, loading, operation } = useAxios()

  useEffect(() => {}, [username, password])

  const handleLogin = async e => {
    e.preventDefault()
    setLoading(true)

    console.log({ username, password })
    const payload = { email: username, password }
    operation('login', payload)
    setLoading(false)
  }

  if (data?.user?.email) {
    setSession(data.token)
    setUser(data.user)
    return <Navigate to='/' replace={true} />
  }
  if (session !== 'null' && session != null)
    return <Navigate to='/' replace={true} />

  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      sx={{ height: '100vh', width: '100vw' }}
    >
      <Card sx={{ minWidth: '25%', boxShadow: 'md' }}>
        <Stack spacing={3}>
          <Stack alignItems='center' spacing={2}>
            <Avatar size='lg' color='primary' />
            <Typography level='h2' component='h1' color='primary'>
              Welcome
            </Typography>
            <Divider />
          </Stack>

          <form onSubmit={handleLogin}>
            <Stack spacing={2}>
              <TextField
                id='username'
                type='text'
                placeholder='email address'
                startDecorator={<AlternateEmailIcon />}
                required
                variant='outlined'
                color={error ? 'danger' : 'neutral'}
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <TextField
                id='password'
                type='password'
                placeholder='password'
                startDecorator={<KeyIcon />}
                required
                variant='outlined'
                color={error ? 'danger' : 'neutral'}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />

              {error && (
                <Alert color='danger' startDecorator={<ErrorIcon />}>
                  {error}
                </Alert>
              )}

              <Button
                type='submit'
                variant='solid'
                loading={isLoading}
                disabled={!username || !password}
              >
                Login
              </Button>
            </Stack>
          </form>

          <Stack spacing={1}>
            <Typography level='body2'>Forgot password?</Typography>
            <Typography level='body2'>
              New to us?
              <Link to='/register'> Sign Up </Link>
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  )
}

export default Login
