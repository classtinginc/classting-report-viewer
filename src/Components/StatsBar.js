import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './StatsBar.scss';


class StatsBar extends React.Component {
  static propTypes = {
    correctQuizzesCount: PropTypes.number,
    totalQuizzesCount: PropTypes.number,
    vedioDuration: PropTypes.number,
    quizDuration: PropTypes.number,
    diffVideoDuration: PropTypes.number,
    diffStudyDuration: PropTypes.number,
    diffCorrectRate: PropTypes.number,
  }

  render() {
    const { key } = this.props.info;
    const {
      correctQuizzesCount,
      totalQuizzesCount,
      vedioDuration,
      quizDuration,
      diffVideoDuration,
      diffStudyDuration,
      diffCorrectRate,
    } = this.props;

    const totalHour = quizDuration + vedioDuration;
    const diffQuizCount = totalQuizzesCount - correctQuizzesCount;
    const thours = (`00${Math.floor(totalHour / 60).toString()}`).slice(-2);
    const tminutes = (`00${(totalHour % 60).toString()}`).slice(-2);
    const hours = (`00${Math.floor(vedioDuration / 60).toString()}`).slice(-2);
    const minutes = (`00${(vedioDuration % 60).toString()}`).slice(-2);

    return (
      <div className="student_info">
        <div className="student_profile">
          <div className="student_picture" />
          <p className="student_name">{`학생 ${key}`}</p>
        </div>
        <div className="segment" />
        <div className="student_statistics">
          <div className="result_wrapper">
            <p className="title">총 공부시간</p>
            <p className="time">{`${thours}:${tminutes}`}</p>
            <p className="sub">분</p>
            <p className={`${diffStudyDuration > 0 ? 'up' : 'down'}`}>{`${diffStudyDuration}` > 0 ? `+${diffStudyDuration}분` : `${diffStudyDuration}분`}</p>
          </div>
          <div className="result_wrapper">
            <p className="title">동영상 콘텐츠</p>
            <p className="time">{`${hours}:${minutes}`}</p>
            <p className="sub">분</p>
            <p className={`${diffVideoDuration > 0 ? 'up' : 'down'}`}>{`${diffVideoDuration}` > 0 ? `+${diffVideoDuration}분` : `${diffVideoDuration}분`}</p>
          </div>
          <div className="result_wrapper">
            <p className="title">문제 풀이</p>
            <p className="count">{correctQuizzesCount}</p>
            <p className="sub">개</p>
            <p className={`${diffQuizCount > 0 ? 'up' : 'down'}`}>{`${diffQuizCount}` > 0 ? `+${diffQuizCount}개` : `${diffQuizCount}개`}</p>
          </div>
          <div className="result_wrapper">
            <p className="title">정답률</p>
            <p className="count">{((correctQuizzesCount / totalQuizzesCount) * 100).toFixed(2)}%</p>
            <p className={`${Number(diffCorrectRate) > 0 ? 'up' : 'down'}`}>{`${Number(diffCorrectRate)}` > 0 ? `+${diffCorrectRate}%` : `${diffCorrectRate}%`}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(StatsBar);
