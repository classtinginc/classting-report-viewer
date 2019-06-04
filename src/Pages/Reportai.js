import React from 'react';
import { withRouter } from 'react-router-dom';
import Resultbar from 'Components/Resultbar';
import { tmp_data } from './data';
import './reportai.scss';


class Reportai extends React.Component {

  render() {


    return (

      <div className="Reportai-wrapper">
        <img className="ic_classting" src = {require("images/ic-classting.svg")} />
        <div className="network"> </div>
        <div className="report-intro"><span className="report-intro-style">**초등학교 *학년 *반</span>의 AI 위클리 리포트입니다.</div>
        <div className="report-intro-date">2019-10-20 ~ 2019-10-27</div>

        <div>
          {tmp_data.map((el, idx) => (
            <Resultbar
              info={el}
              key={idx}
            />
          ))}
        </div>
        <div className="suggestion">보다 상세한 AI 데이터를 보고 싶으세요?</div>
        <div className="ai-button">
          <p className="ai-button-text"> 클라스팅 AI 페이지로 이동하기 </p>
        </div>
        <div className="underline"> </div>
        <img className = "ic_tab_logo" src = {require("images/ic-tab-logo.svg")} />
        <div className="address">(주)클래스팅 대표 조현구 서울시 강남구 테헤란로 427 선릉 위워크 2호점 18층 사업자 번호 </div>
        <div className="support"> 사용자 약관, 정보보호 방침, 고객 지원</div>

      </div>

    )
  }
}



export default Reportai;
