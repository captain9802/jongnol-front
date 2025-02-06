import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Button, Typography } from "@mui/material";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "50rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img src="alert/404.png" style={{width:'200px'}}/>
        <Typography sx={{color: "#F5904B", fontSize:'10rem', fontWeight:'bold' }}>
          404
        </Typography>
        <Typography variant="BT" sx={{ marginBottom: 2 }}>
          페이지를 찾을 수 없습니다.
        </Typography>
        <motion.div
          initial={{ y: -10 }}
          animate={{ y: 15 }}
          transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
        >
          <Typography variant="PCT" sx={{ color: "#666" }}>
            존재하지 않는 페이지이거나 이동된 페이지입니다.
          </Typography>
        </motion.div>
      </motion.div>
      <Button
        variant="contained"
        color='primary'
        size="large"
        sx={{
          marginTop: 3
        }}
        onClick={() => navigate("/")}
      >
        홈으로 돌아가기
      </Button>
    </Box>
  );
};

export default ErrorPage;
