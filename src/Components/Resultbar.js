import React from 'react';
import './Resultbar.scss';
import { withRouter } from 'react-router-dom';

class Resultbar extends React.Component {
  render() {
    const {
      name,
      correctQuizzesCount,
      totalQuizzesCount,
      vedioDuration,
    } = this.props.info;


    return (
      <div className="student-info">
        <div className="student-profile">
          <div className="student-picture" />
          <p className="student-name">{name}</p>
        </div>
        <div className="segment" />
        <div className="student-statistics">
          <div className="result-wrapper">
            <p className="result-title">총 공부시간</p>
            <p className="result-time">00:20</p>
            <p className="result-sub">분</p>
            <p className="result-sum">+20분</p>
          </div>
          <div className="result-wrapper">
            <p className="result-title">동영상 콘텐츠</p>
            <p className="result-time">00:20</p>
            <p className="result-sub">분</p>
            <p className="result-sum">+20분</p>
          </div>
          <div className="result-wrapper">
            <p className="result-title">문제 풀이</p>
            <p className="result-count">{correctQuizzesCount}</p>
            <p className="result-sub">개</p>
            <p className="result-enhancement">-{totalQuizzesCount - correctQuizzesCount}개</p>
          </div>
          <div className="result-wrapper">
            <p className="result-title">정답률</p>
            <p className="result-count">{((correctQuizzesCount / totalQuizzesCount) * 100).toFixed(2)}%</p>
            <p className="result-enhancement">-1.98%</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Resultbar);
