import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import '../../styles/home/Main.scss';
import { useAnimation, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import { useDispatch, useSelector } from "react-redux";
import { getCountQP } from "../../apis/quizApi";

const Main = () => {

  const dispatch = useDispatch();
  const navi = useNavigate();
  const controls = useAnimation();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchCondition, setSearchCondition] = useState("title");
  const quizzesCount = useSelector((state) => state.quiz.quizzesCount);
  const usersCount = useSelector((state) => state.quiz.usersCount);

  useEffect(() => {
    dispatch(getCountQP());
  },[dispatch]);

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  const images = [
    "images/home/1.png",
    "images/home/2.png",
    "images/home/3.png"
  ];

  useEffect(() => {
    const slideShow = async () => {
      try {
        while (true) {
          for (let i = 0; i < images.length; i++) {
            await controls.start({ x: -100 * i + '%' });
            await new Promise(resolve => setTimeout(resolve, 3000));
          }
        }
      } catch (error) {
        console.error('슬라이드 에러', error);
      }
    };
    slideShow();
  }, [controls, images.length]);

  const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        const keyword = searchKeyword.trim() === '' ? 'all' : searchKeyword;
        navi('/search', { state: { searchKeyword: keyword, searchCondition } });
      }
    };

    const handleSearchKeywordChange = (event) => {
      setSearchKeyword(event.target.value);
    };

  const items = [
    { imageSrc: "images/home/main_memo.png", textTop: "단순 암기", textBottom: "Simple Memorization", backgroundColor: "#02D7C5" },
    { imageSrc: "images/home/main_quiz.png", textTop: "매일 색다른 퀴즈", textBottom: "Different Quiz Every Day", backgroundColor: "#FFC91B" },
    { imageSrc: "images/home/main_studynote.png", textTop: "나만의 퀴즈", textBottom: "My Custom Quiz", backgroundColor: "#AC8EF8" }
  ];

  return (
    <Box className="main">
      <Header className="headerText"/>
    <Box className="main_top">
      <Box className="main_left-box">
        <Box className="main_left-box_content">
            <Typography sx={{fontSize: "3.75rem"}} className="main_left-box_text">단순 암기,
              <span className="main_left-box_text one">이젠 JNL로!</span>
            </Typography>
            <TextField
              variant="outlined"
              placeholder="퀴즈 검색하기"
              className="search-bar"
              value={searchKeyword}
              onChange={handleSearchKeywordChange}
              onKeyPress={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          <Box className="info-box">
            <Box className="info-text-group">
              <Typography variant="PBT" className="info-text">
                현재 회원 수
              </Typography>
              <Typography variant="PBT" className="info-text">
                현재 퀴즈 개수
              </Typography>
            </Box>
            <Box className="info-text-group">
              <Typography variant="BT" className="info-number">
                {usersCount}명
              </Typography>
              <Typography variant="BT" className="info-number">
                {quizzesCount}개
              </Typography>
            </Box>
          </Box>
          <Button
            onClick={() => navi('/search')}
            variant="contained"
            size="small"
            className="start-button"
          >
            시작해보기
          </Button>
          </Box>
        </Box>
        <Box className="main_right-box">
        {items.map((item, index) => (
          <Box key={index} className="main_right-box_item" sx={{ backgroundColor: item.backgroundColor }}>
            <Box className="main_right-box_item-content">
              <Box className="main_right-box_text">
                <Typography variant="SBT">{item.textTop}</Typography>
                <Typography variant="PBT">{item.textBottom}</Typography>
              </Box>
              <img src={item.imageSrc} alt="Icon" className="right-box-image" />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
    <Box className="main_middle">
      <motion.div
       variants={fadeInUp}
       initial="hidden"
       whileInView="visible"
       viewport={{ once: true }}
       transition={{ duration: 1.5, ease: "easeInOut" }}>
      <Box className="main_title-box middle">
        <Typography variant="VBT" className="main_title middle">
          Features
        </Typography>
      </Box>
      <Box className="main_subtitle-box middle">
        <Typography variant="PBT" className="main_subtitle middle">
          JNL의 주요 기능
        </Typography>
      </Box>
      </motion.div>
      <Box className="main_middle-content-box">
        <Box className="main-middle-left">
          {[
            { img: "images/home/main_easy.png", title: "Very Easy", description: "몇 분만으로도 손쉽게 퀴즈를 만들 수 있습니다." },
            { img: "images/home/main_sign-in.png", title: "No Log-in", description: "로그인을 하지 않아도 퀴즈를 풀고, 검색할 수 있습니다." },
            { img: "images/home/main_favorite.png", title: "Favorites", description: "원하는 퀴즈를 즐겨찾기를 한 다음, 원하는 시간에 다시 그 퀴즈를 볼 수 있습니다." }
          ].map((feature, index) => (
            <motion.div
            key={index}
            className="main-middle-feature left"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <Box className="main-middle-feature-text">
              <Typography variant="BT" className="feature-title">{feature.title}</Typography>
              <Typography variant="PBT" className="feature-description">{feature.description}</Typography>
            </Box>
            <img src={feature.img} alt={feature.title} className="feature-icon left" />
          </motion.div>
          ))}
        </Box>
        <Box className="main-middle-image">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{display: 'flex', justifyContent: 'center'}}>
          <Box className="slide-container">
            <motion.div
              className="slides"
              animate={controls}
              initial={{ x: '0%' }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            >
              {images.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`Slide ${index + 1}`}
                  className="slide-image"
                />
              ))}
            </motion.div>
          </Box>
          </motion.div>
        </Box>
        <Box className="main-middle-right">
          {[
            { img: "images/home/main_note-study.png", title: "My Quiz", description: "내가 등록한 퀴즈를 마이페지에서 확인 할 수 있습니다." },
            { img: "images/home/main_anywhere.png", title: "Any Where", description: "PC도 모바일도 원하면 언제든 접속이 가능합니다." },
            { img: "images/home/main_statistics.png", title: "Statistics", description: "퀴즈 결과를 한 눈에 보여지는 통계를 통해 자신의 문제점을 발견 할 수 있습니다." }
          ].map((feature, index) => (
            <motion.div
            key={index}
            className="main-middle-feature right"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <Box key={index} className="main-middle-feature right">
              <img src={feature.img} alt={feature.title} className="feature-icon right"/>
              <Box className="main-middle-feature-text">
                <Typography variant="BT" className="feature-title">{feature.title}</Typography>
                <Typography variant="PBT" className="feature-description">{feature.description}</Typography>
              </Box>
            </Box>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Box>
    <Box className="main_bottom">
    <motion.div
       variants={fadeInUp}
       initial="hidden"
       whileInView="visible"
       viewport={{ once: true }}
       transition={{ duration: 1.5, ease: "easeInOut" }}>
      <Box className="main_title-box bottom">
          <Typography variant="VBT" className="main_title bottom">
            Service
          </Typography>
      </Box>
      <Box className="main_subtitle-box bottom">
        <Typography variant="PBT" className="main_subtitle bottom">
          JNL를 즐기는 방법
        </Typography>
      </Box>
      </motion.div>
      <Box className="main_bottom_service">
          {[
            { img: "images/home/main_profile.png", title: "Study Note", description: "클릭을 통해 무료로 회원가입 후 로그인하세요." },
            { img: "images/home/main_create.png", title: "Any Where", description: "상단의 버튼을 통해서 등록하고 싶은 퀴즈를 등록하세요." },
            { img: "images/home/main_mobile.png", title: "Statistics", description: "언제든 어디서든 모바일에서도 간편하게 이용하세요." },
            { img: "images/home/main_people.png", title: "Any Where", description: "다른 사람이 만든 퀴즈를 손쉽게 접하고 자신의 것으로 만드세요." }
          ].map((feature, index) => (
            <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{display: 'flex', justifyContent: 'center'}}>
            <Box key={index} className="main-bottom-feature">
              <img src={feature.img} alt={feature.title} className="feature-icon bottom"/>
              <Box className="main-bottom-feature-text">
                <Typography variant="BT" className="feature-title bottom">{feature.title}</Typography>
                <Typography variant="MPCT" className="feature-description">{feature.description}</Typography>
              </Box>
            </Box>
            </motion.div>
          ))}
      </Box>
    </Box>
  </Box>
  );
}

export default Main;
