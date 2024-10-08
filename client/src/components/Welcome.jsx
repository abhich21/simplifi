import React from 'react'
import styled from 'styled-components';
import Video from "../utils/video.mp4"


const CoverContainer = styled.div`
  background: #0c0c0c;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  height: 800px;
  position: relative;
  z-index: 1;

  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%),
    linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 100%);
    z-index: 2;
  }
`;

const CoverBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const VideoBg = styled.video`
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  background: #232a34;
`;

const CoverContent = styled.div`
  z-index: 3;
  max-width: 1200px;
  position: absolute;
  top: 20%;
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
`;
const CoverH1 = styled.h1`
  color: white;
  font-size: 48px;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 40px;
  }
  
`;
const Welcome = ({userName}) => {
  return (
    <CoverContainer>
        <CoverBg>
            <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
        </CoverBg>
        <CoverContent>
        <CoverH1>Welcome, {userName}</CoverH1>
        </CoverContent>
    </CoverContainer>
  )
}

export default Welcome