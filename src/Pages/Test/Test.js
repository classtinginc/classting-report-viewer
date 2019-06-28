import React from 'react';
import * as constants from 'constants.js';
import './Test.scss';

class Test extends React.Component {

  handleClick = () => {
    window.location.href = `${constants.OAUTH_URL}/v1/oauth2/authorize?client_id=${constants.TMP_CLIENT_ID}&redirect_uri=${constants.REDIRECT_URI}&response_type=token`;
  }

  render() {
    return (
      <div className="report_wrapper">
        <div className="ic_classting" />
        <p className="intro"><span className="intro_style">**** 학교 * 학년 * 반</span>의 <br/> AI 위클리 리포트입니다.</p>
        <p className="intro_date">2019-01-20 ~ 2019-01-27</p>
        <div className="report_screenshot" />
        <p className="suggestion">보다 상세한 AI 데이터를 보고 싶으세요?</p>
        <div className="suggestion_button" onClick={this.handleClick}> 클라스팅 AI 페이지로 이동하기</div>
        <footer className="footer_wrapper">
          <div className="report_end" />
          <div className="ic_tab_logo" />
          <div className="etc">
            <span className="address">(주)클래스팅 · 대표 조현구 · </span>
            <span className="address"> 서울시 강남구 테헤란로 427 선릉 위워크 2호점 18층 · 사업자 번호</span>
            <p className="address">사용자 약관 · 정보보호 방침 · 고객 지원</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default Test;
