import React from 'react'
import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';

const Spinning = ({ loading }) => {
  return (
    <Box>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', padding: '20px', display: 'grid', gap: '1rem' }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            style={{
              justifyItems: 'center',
              display: 'inline-block',
              transformOrigin: 'center center',
            }}
          >
            <Box
              style={{
                border: '1.25rem solid #f3f3f3',
                borderTop: '1.25rem solid #F5904B',
                borderRadius: '50%',
                width: '10rem',
                height: '10rem',
                margin: 'auto',
              }}
            />
          </motion.div>
          <Typography variant='PBT'>퀴즈를 불러오는 중...</Typography>
        </motion.div>
      )}
    </Box>
  );
};

export default Spinning;
