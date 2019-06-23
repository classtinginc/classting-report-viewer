import React from 'react';
import firebase from 'firebase';
import StatsBar from 'Components/StatsBar';
import * as constants from 'constants.js';
import './Report.scss';

const config = (
  {
    apiKey: `${constants.API_KEY}`,
    authDomain: `${constants.PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${constants.PROJECT_ID}.firebaseio.com`,
    projectId: `${constants.PROJECT_ID}`,
    storageBucket: `${constants.PROJECT_ID}.appspot.com`,
    messagingSenderId: `${constants.MESSAGING_SENDER_ID}`,
  }
);

firebase.initializeApp(config);
const firestore = firebase.firestore();

class Report extends React.Component {

  constructor() {
    super();

    this.state = {
      schoolName: '',
      grade: '',
      ban: 1,
      preStudentsList: [],
      studentsList: [],
      totalStudentList: [],
      studentsProfileList: [],
      preStartDate: `${constants.PRE_START_DATE}`,
      preEndDate: `${constants.PRE_END_DATE}`,
      startDate: `${constants.START_DATE}`,
      endDate: `${constants.END_DATE}`,
    };
  }

  componentDidMount() {
    const accessToken = window.location.hash.split('&')[1].split('=')[1]
    const continueUrl = `authorize?client_id=${constants.TMP_CLIENT_ID}&redirect_uri=${constants.REDIRECT_URI}&response_type=token`;
    if (!accessToken) {
      window.location.href = `https://auth.classting.net/v1/oauth2/${continueUrl}`;
    }
    this.getFirebaseAccessToken(accessToken);
    this.getFirebaseData();
    this.getClasstingClassInfo(accessToken);
  }

  // 클래스팅에서 받은 OAuth 토큰을 파이어베이스에 전달하여, 파이어스토어에 접근할 수 있는 토큰을 부여 받음
  getFirebaseAccessToken = (accessToken) => {
    fetch(`${constants.OAUTH_URL}/v1/oauth2/jwt?service=classting`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(response => {
        sessionStorage.setItem('firebaseAccessToken', response.token);
        firebase.auth().signInWithCustomToken(response.token).catch((error) => {
          console.log('Login Failed!', error.code);
          console.log('Error message: ', error.message);
        });
      })
    // 파이어베이스에 접속했는지 안했는지 여부를 파악
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('파이베이스 접속 여부:', `${user.uid} is signed in.`);
      } else {
        console.log('No user is signed in.');
      }
    });
  }

  // 사용자 UID를 이용하여 UID에 소속되어 있는 학생들의 데이터를 파이어스토어로 부터 조회(현재, 로그인한 UID에 해당하는 데이터가 없어서 "14851478215410458"를 임시로 사용)
  getFirebaseData = () => {
    const {
      preStartDate,
      startDate,
      preEndDate,
      endDate,
    } = this.state

    const combinedStudentList =[];
    firestore.collection(`${constants.COLLECTION_NAME}`).doc(`${constants.DOC_NAME}`).get().then((aiDoc) => {
      aiDoc.ref.collection(`${preStartDate.replace(/-/g,'')}-${preEndDate.replace(/-/g,'')}`).doc(`${constants.DOC_MEMBER_UID}`).get().then((snap) => {
        if (snap.exists) {
          this.setState(
            {
              preStudentsList: Object.entries(snap.data().report).map(([key, value]) => ({ key, value })),
            }, () => combinedStudentList.push(this.state.preStudentsList)
          )
          firestore.collection(`${constants.COLLECTION_NAME}`).doc(`${constants.DOC_NAME}`).get().then((aiDoc) => {
            aiDoc.ref.collection(`${startDate.replace(/-/g,'')}-${endDate.replace(/-/g,'')}`).doc(`${constants.DOC_MEMBER_UID}`).get().then((snap) => {
              if (snap.exists) {
                this.setState(
                  {
                    studentsList: Object.entries(snap.data().report).map(([key, value]) => ({ key, value })),
                  }, () => combinedStudentList.push(this.state.studentsList)
                )
              } else {
                console.log('No such document!');
              }
            }).catch((error) => {
              console.log('Error getting document:', error);
            });
          });
          this.setState(
            {
              totalStudentList: combinedStudentList
            }
          )
        } else {
          console.log('No such document!');
        }
      }).catch((error) => {
        console.log('Error getting document:', error);
      });
    })
  }

  // 클래스팅의 특정 클래스에 등록된 학생들의 정보를 보여줌
  getClasstingClassInfo = (accessToken) => {
    fetch('https://auth.classting.net/v1/oauth2/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(response => {
        fetch(`https://api.classting.net:443/v2/users/${response.user_id}/joined_classes`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        })
          .then(response => response.json())
          .then(response => {
            this.setState(
              {
                schoolName: response[0].school_name,
                grade: response[0].grade,
              }
            )
            fetch(`https://api.classting.net:443/v2/classes/${response[0].id}/members`, {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              }
            })
              .then(response => response.json())
              .then(response => {
              })
                this.setState(
                  {
                    studentsProfileList: response
                  })
          })
      })
  }

  render() {

    const {
      schoolName,
      grade,
      ban,
      startDate,
      endDate,
      reportDate,
      studentsList,
      preStudentsList,
      studentsProfileList
    } = this.state;

    const diffResult = [];
    for (let i=0; i < studentsList.length; i++) {
      for (let j=0; j < preStudentsList.length; j++) {
        if (studentsList[i]['key'] === preStudentsList[j]['key']) {
          const correctQuizzesCount = studentsList[i]['value']['correct_quizzes_count'];
          const totalQuizzesCount = studentsList[i]['value']['quizzes_count'];
          const vedioDuration = studentsList[i]['value']['video_duration'];
          const quizDuration = studentsList[i]['value']['quiz_duration'];
          const diffVideoDuration = studentsList[i]['value']['video_duration'] - preStudentsList[j]['value']['video_duration'];
          const diffStudyDuration = (studentsList[i]['value']['quiz_duration']+studentsList[i]['value']['video_duration'])-(preStudentsList[j]['value']['quiz_duration']+preStudentsList[j]['value']['video_duration']);
          const diffCorrectRate = (((studentsList[i]['value']['correct_quizzes_count']/studentsList[i]['value']['quizzes_count'])*100)-((preStudentsList[i]['value']['correct_quizzes_count']/preStudentsList[i]['value']['quizzes_count'])*100)).toFixed(2);
          diffResult.push(
            {
              'key': studentsList[i]['key'],
              'value':
              {
                'correctQuizzesCount': correctQuizzesCount,
                'totalQuizzesCount': totalQuizzesCount,
                'vedioDuration': vedioDuration,
                'quizDuration': quizDuration,
                'diffVideoDuration': diffVideoDuration,
                'diffStudyDuration': diffStudyDuration,
                'diffCorrectRate': diffCorrectRate
              }
            })
        } else {
          const correctQuizzesCount = studentsList[i]['value']['correct_quizzes_count'];
          const totalQuizzesCount = studentsList[i]['value']['quizzes_count'];
          const vedioDuration = studentsList[i]['value']['video_duration'];
          const quizDuration = studentsList[i]['value']['quiz_duration'];
          const diffVideoDuration = studentsList[i]['value']['video_duration'];
          const diffStudyDuration = studentsList[i]['value']['quiz_duration']+studentsList[i]['value']['video_duration'];
          const diffCorrectRate = (((studentsList[i]['value']['correct_quizzes_count']/studentsList[i]['value']['quizzes_count'])*100)).toFixed(2);
          diffResult.push(
            {
              'key': studentsList[i]['key'],
              'value':
              {
                'correctQuizzesCount': correctQuizzesCount,
                'totalQuizzesCount': totalQuizzesCount,
                'vedioDuration': vedioDuration,
                'quizDuration': quizDuration,
                'diffVideoDuration': diffVideoDuration,
                'diffStudyDuration': diffStudyDuration,
                'diffCorrectRate': diffCorrectRate
              }
            }
          )
        }
      }
    }

    return (
      <section className="report_wrapper">
        <div className="ic_classting" />
        <p className="intro"><span className="intro_style">{schoolName} {grade}학년 {ban}반</span>의 <br/> AI 위클리 리포트입니다.</p>
        <p className="intro_date">{`${startDate} ~ ${endDate}`}</p>
        <div>
          {diffResult.map(el => (
            <StatsBar
              info={el}
              correctQuizzesCount={el.value.correctQuizzesCount}
              totalQuizzesCount={el.value.totalQuizzesCount}
              vedioDuration={el.value.vedioDuration}
              quizDuration={el.value.quizDuration}
              diffVideoDuration={el.value.diffVideoDuration}
              diffStudyDuration={el.value.diffStudyDuration}
              diffCorrectRate={el.value.diffCorrectRate}
            />
          ))}
        </div>
        <footer className="footer_wrapper">
        <div className="report_end" />
          <div className="ic_tab_logo" />
          <div className="etc">
            <span className="address">(주)클래스팅 · 대표 조현구 · </span>
            <span className="address"> 서울시 강남구 테헤란로 427 선릉 위워크 2호점 18층 · 사업자 번호</span>
            <p className="address">사용자 약관 · 정보보호 방침 · 고객 지원</p>
          </div>
        </footer>
      </section>
    );
  }
}


export default Report;
