import React, { useEffect, useState } from 'react'
import { Posts } from './Posts'
import moment from 'moment'

import Avatar from '@mui/joy/Avatar'
import Typography from '@mui/joy/Typography'
import Button from '@mui/joy/Button'
import Box from '@mui/joy/Box'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/material/Stack'
import Divider from '@mui/joy/Divider'
import Navbar from './Navbar'

import WhatshotIcon from '@mui/icons-material/Whatshot'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { useAxios, useAxiosGet } from '../utils/apiCalls'
import axios from '../utils/axios'
import AddNewPost from './AddNewPost'
import CircularProgress from '@mui/material/CircularProgress'

// import Profile from './Profile';

const HomePage = () => {
  const [loadingPosts, setLoadingPosts] = useState(false)
  const { data, setLoading, loading } = useAxiosGet('posts', null, 'GET')

  // const [error, setError] = useState('')
  // const [loading, setLoading] = useState('')
  // const [data, setData] = useState('')
  // const url = 'posts'
  // const param = null

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:4000/${url}`, param)
  //     .then(response => {
  //       // if (isCurrent.current)
  //       console.log('In success block', response)
  //       setData(response.data)
  //     })
  //     .catch(err => {
  //       console.log('In error block', err)
  //       setError(err?.response?.data?.error)
  //       setLoading(false)
  //     })
  // }, [])

  // console.log('DATA', data)

  // const [posts, setPosts] = useState(data?.posts || [])

  return (
    <Box>
      <Navbar />
      <Stack
        direction='row'
        spacing={10}
        alignItems='flex-start'
        justifyContent='center'
      >
        <Stack
          direction='column'
          alignItems='flex-start'
          width={'50%'}
          padding={2}
        >
          <Typography level='display2' component='h1'>
            Home
          </Typography>
          <AddNewPost updatePosts={setLoading} isUpdatingPost={loading} />
          <Sheet sx={{ marginY: 3, width: '100%' }}>
            <Stack
              direction='row'
              alignItems='flex-start'
              justifyContent='flex-start'
              spacing={2}
            >
              <Button
                startDecorator={<WhatshotIcon />}
                color='primary'
                size='sm'
                variant='soft'
              >
                Hot Posts
              </Button>

              <Button
                startDecorator={<AutoAwesomeIcon />}
                color='primary'
                size='sm'
                variant='soft'
              >
                New
              </Button>

              <Button
                startDecorator={<TrendingUpIcon />}
                color='primary'
                size='sm'
                variant='soft'
              >
                Trending
              </Button>
            </Stack>
          </Sheet>

          <Box sx={{ width: '100%' }} py={2}>
            <Posts
              posts={data?.posts}
              updatePost={setLoading}
              setLoadingPosts={setLoadingPosts}
            />
          </Box>
        </Stack>

        <Sheet sx={{ padding: 5 }}>
          <Stack
            direction='column'
            alignItems='flex-start'
            maxHeight='100vh'
            spacing={3}
          >
            <Box>
              <Typography level='h5'>Top Accounts</Typography>
              <Divider />
            </Box>

            <Stack spacing={1}>
              <Stack alignItems='center' justifyContent='center'>
                <Avatar
                  sx={{ height: '75px', width: '75px' }}
                  src={
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                  }
                  alt={'Author'}
                  css={{
                    border: '2px solid white'
                  }}
                />
              </Stack>

              <Stack spacing={2}>
                <Stack align='flex-start'>
                  <Typography level='body1' component='strong'>
                    John Doe
                  </Typography>
                  <Typography level='body2'>Frontend Developer</Typography>
                </Stack>

                <Button variant='soft' size='sm'>
                  Follow
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Sheet>
      </Stack>
    </Box>
  )
}

export default HomePage
