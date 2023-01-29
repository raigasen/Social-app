import Stack from '@mui/material/Stack'
import React from 'react'
import Post from './Post'

export const Posts = ({ posts }) => {
  return (
    <Stack spacing={5}>
      {posts?.map(post => (
        <Post key={post._id} post={post} />
      ))}
    </Stack>
  )
}
