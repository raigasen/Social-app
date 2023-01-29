import React, { useState } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Textarea from '@mui/joy/Textarea'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import ModalClose from '@mui/joy/ModalClose'
import { Box, Divider, Typography } from '@mui/joy'
import { useAxios } from '../utils/apiCalls'
import CircularProgress from '@mui/material/CircularProgress'

const AddNewPost = ({ updatePosts, isUpdatingPost }) => {
  const [loadingPosts, setLoadingPosts] = useState(false)
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [isSaving, setSaving] = useState(false)
  const { error, setError, loading, operation } = useAxios()

  const createNewPost = async e => {
    e.preventDefault()
    const payload = {
      title
    }
    operation('posts/new-post', payload).then(post => {
      setTitle('')
      setLoadingPosts(true)
      updatePosts(!isUpdatingPost)
      setOpen(false)
      setLoadingPosts(false)
    })
  }

  const handleSubmit = async () => {
    const date = new Date()

    setOpen(false)
    setTitle('')
  }

  if (loadingPosts)
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )

  return (
    <>
      <Button variant='solid' color='primary' onClick={() => setOpen(true)}>
        Add new post
      </Button>

      <Modal onClose={() => setOpen(false)} open={open}>
        <ModalDialog aria-labelledby='modal-title'>
          <Stack direction='column' spacing={4}>
            <Stack
              direction='row'
              alignItems='flex-start'
              justifyContent='flex-start'
            >
              <Typography id='modal-title' level='h4' component='h5' p={0}>
                Add new post
              </Typography>
              <ModalClose />
            </Stack>

            <Divider />
            {!loadingPosts ? (
              <>
                <Box>
                  <FormControl id='post-title'>
                    <FormLabel required>Post title</FormLabel>
                    <Textarea
                      value={title}
                      minRows={3}
                      required
                      onChange={e => setTitle(e.target.value)}
                    />
                  </FormControl>
                </Box>

                <Box>
                  <Button
                    // colorScheme='blue'
                    disabled={!title.trim()}
                    onClick={createNewPost}
                    loading={isSaving}
                  >
                    Save
                  </Button>
                </Box>
              </>
            ) : (
              <Box sx={{ display: 'flex' }}>Saving Post</Box>
            )}
          </Stack>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default AddNewPost
