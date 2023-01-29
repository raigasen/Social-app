import { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Card from '@mui/joy/Card'
import Avatar from '@mui/joy/Avatar'
import Alert from '@mui/joy/Alert'
import Button from '@mui/joy/Button'
import Divider from '@mui/joy/Divider'
import TextField from '@mui/joy/TextField'
import Typography from '@mui/joy/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import BadgeIcon from '@mui/icons-material/Badge'
import KeyIcon from '@mui/icons-material/Key'
import ErrorIcon from '@mui/icons-material/Error'
import { BE_URL, signupUser, useAxios } from '../utils/apiCalls'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { useAuth } from '../context/userContext'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  //   const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const { data, error, setError, loading, operation } = useAxios()
  const { session } = useAuth()

  const handleSignUp = async e => {
    e.preventDefault()
    if ((!email || !password || !confirmPassword || !firstName, !lastName)) {
      console.log({ email, password, firstName, lastName, confirmPassword })
      return setError('Fields are missing Please enter all the fields')
    }
    if (password !== confirmPassword) {
      return setError('Passwords donot match')
    }

    console.log({ email, password, confirmPassword })
    const payload = {
      email,
      firstName,
      lastName,
      password
    }
    console.log(payload)
    operation('register', payload)
  }

  if (data?.user?.email) {
    ;<Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
    return <Navigate to='/login' replace={true} />
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

          <form onSubmit={handleSignUp}>
            <Stack spacing={2}>
              <TextField
                id='username'
                type='text'
                placeholder='email address'
                startDecorator={<AlternateEmailIcon />}
                required
                variant='outlined'
                color={error ? 'danger' : 'neutral'}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <TextField
                id='firstName'
                type='text'
                placeholder='first name'
                startDecorator={<BadgeIcon />}
                required
                variant='outlined'
                color={error ? 'danger' : 'neutral'}
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              <TextField
                id='lastName'
                type='text'
                placeholder='last name'
                startDecorator={<BadgeIcon />}
                required
                variant='outlined'
                color={error ? 'danger' : 'neutral'}
                value={lastName}
                onChange={e => setLastName(e.target.value)}
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
              <TextField
                id='confirmPassword'
                type='password'
                placeholder='confirm password'
                startDecorator={<KeyIcon />}
                required
                variant='outlined'
                color={error ? 'danger' : 'neutral'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
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
                disabled={!email || !password}
              >
                Sign Up
              </Button>
            </Stack>
          </form>

          <Stack>
            <Typography level='body2'>
              Already have an account? <Link to='/login'>Login</Link>
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  )

  // return (
  //   <Flex
  //     flexDirection='column'
  //     width='100wh'
  //     height='100vh'
  //     backgroundColor='gray.200'
  //     justifyContent='center'
  //     alignItems='center'
  //   >
  //     <Stack
  //       flexDir='column'
  //       mb='2'
  //       justifyContent='center'
  //       alignItems='center'
  //     >
  //       <Avatar bg='teal.500' />
  //       <Heading color='teal.400'>Welcome</Heading>
  //       <Box minW={{ base: '90%', md: '468px' }}>
  //         <form onSubmit={handleSignUp}>
  //           {error && <ErrorMessage message={error} />}
  //           <Stack
  //             spacing={4}
  //             p='1rem'
  //             backgroundColor='whiteAlpha.900'
  //             boxShadow='md'
  //           >
  //             <FormControl>
  //               <InputGroup>
  //                 <InputLeftElement
  //                   pointerEvents='none'
  //                   children={<CFaUserAlt color='gray.300' />}
  //                 />
  //                 <Input
  //                   type='email'
  //                   placeholder='email address'
  //                   value={username}
  //                   onChange={e => setUsername(e.target.value)}
  //                 />
  //               </InputGroup>
  //             </FormControl>
  //             <FormControl>
  //               <InputGroup>
  //                 <InputLeftElement
  //                   pointerEvents='none'
  //                   color='gray.300'
  //                   children={<CFaLock color='gray.300' />}
  //                 />
  //                 <Input
  //                   type={showPassword ? 'text' : 'password'}
  //                   placeholder='Password'
  //                   onChange={e => setPassword(e.target.value)}
  //                   value={password}
  //                   // onChange={e =>}
  //                 />
  //                 <InputRightElement width='4.5rem'>
  //                   <Button h='1.75rem' size='sm' onClick={handleShowClick}>
  //                     {showPassword ? 'Hide' : 'Show'}
  //                   </Button>
  //                 </InputRightElement>
  //               </InputGroup>
  //             </FormControl>
  //             <FormControl>
  //               <InputGroup>
  //                 <InputLeftElement
  //                   pointerEvents='none'
  //                   color='gray.300'
  //                   children={<CFaLock color='gray.300' />}
  //                 />
  //                 <Input
  //                   type={showPassword ? 'text' : 'password'}
  //                   value={confirmPassword}
  //                   onChange={e => setConfirmPassword(e.target.value)}
  //                   placeholder='Confirm Password'
  //                 />
  //                 <InputRightElement width='4.5rem'>
  //                   <Button h='1.75rem' size='sm' onClick={handleShowClick}>
  //                     {showPassword ? 'Hide' : 'Show'}
  //                   </Button>
  //                 </InputRightElement>
  //               </InputGroup>
  //             </FormControl>
  //             <Button
  //               borderRadius={0}
  //               type='submit'
  //               variant='solid'
  //               colorScheme='teal'
  //               width='full'
  //             >
  //               Sign Up
  //             </Button>
  //           </Stack>
  //         </form>
  //       </Box>
  //     </Stack>
  //     <Box>
  //       Want to login?{' '}
  //       <Link color='teal.500' href='#'>
  //         Sign In
  //       </Link>
  //     </Box>
  //   </Flex>
  // )
}

export default SignUp
