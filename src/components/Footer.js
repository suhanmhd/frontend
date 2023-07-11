import React from 'react'
import { Box, Stack, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box mt="80px" bgcolor="#fff3f4">
      <Stack gap="40px" alignItems="center" px="40px" pt="24px">
        <Typography variant="h4" fontWeight="600">
          CLICK N VISIT
        </Typography>
        <Typography variant="h5" pb="20px" mt="80px" fontSize="18px">
        &#169; Designed and Developed by Suhan Muhammed
        </Typography>
      </Stack>
    </Box>
  )
}

export default Footer