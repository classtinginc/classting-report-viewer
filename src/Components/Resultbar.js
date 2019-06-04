
import React from 'react';
import './Resultbar.scss';
import { withRouter } from 'react-router-dom';

class Resultbar extends React.Component {


  render() {

    const {
      name,
      correct_quizzes_count,
      total_quizzes_count,
      vedio_duration
    } = this.props.info;

    return (
      <div>
        <div className="Rectangle">
          <div className="bar">
            <div className="student-profile"> </div>
            <div className="student-name">{name} </div>
          </div>
          <div className="total-study-wrapper">
            <div className="total-study-text">총 공부시간</div>
            <div className="total-study-time">00:20</div>
            <div className="total-study-time-plus">+20분</div>
          </div>

          <div className="total-study-wrapper">
            <div className="total-study-text">동영상 콘텐츠</div>
            <div className="total-study-time">00:20</div>
            <div className="total-study-time-plus">+20분</div>
          </div>

          <div className="total-study-wrapper">
            <div className="total-study-text">문제 풀이</div>
            <div className="total-study-time">{correct_quizzes_count}개</div>
            <div className="total-study-minus">{total_quizzes_count-correct_quizzes_count}개</div>
          </div>

          <div className="total-study-wrapper">
            <div className="total-study-text">정답률</div>
            <div className="total-study-time">{(correct_quizzes_count/total_quizzes_count)*100}%</div>
            <div className="total-study-minus">-1.98%</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Resultbar);
