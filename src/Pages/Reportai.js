import React from 'react';
import Resultbar from 'Components/Resultbar';
import { temp } from './data';
import './Reportai.scss';

class Reportai extends React.Component {
  render() {
    return (

      <div className="reportai-wrapper">
        <div className="ic_classting" />
        <p className="intro"><span className="intro-style">**초등학교 *학년 *반</span>의 AI 위클리 리포트입니다.</p>
        <p className="intro-date">2019-10-20 ~ 2019-10-27</p>
        <div>
          {temp.map((el, idx) => (
            <Resultbar
              info={el}
              key={idx}
            />
          ))}
        </div>
        <div className="suggestion">보다 상세한 AI 데이터를 보고 싶으세요?</div>
        <div className="suggestion-button"> 클라스팅 AI 페이지로 이동하기</div>
        <div className="reportai-end" />
        <div className="ic_tab_logo" />
        <div className="address">(주)클래스팅 대표 조현구 서울시 강남구 테헤란로 427 선릉 위워크 2호점 18층 사업자 번호 </div>
        <div className="support"> 사용자 약관, 정보보호 방침, 고객 지원</div>
      </div>
    );
  }
}


export default Reportai;
