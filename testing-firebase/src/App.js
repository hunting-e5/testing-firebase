import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB9rBTk0B1MG0EYWxRAVfR-RdMuoeUenzg",
  authDomain: "taxi-web-3c12b.firebaseapp.com",
  databaseURL: "https://taxi-web-3c12b.firebaseio.com",
  projectId: "taxi-web-3c12b",
  storageBucket: "taxi-web-3c12b.appspot.com",
  messagingSenderId: "735762818450",
  appId: "1:735762818450:web:7557c862ea5df7266a0d4b",
  measurementId: "G-QSDPYWZHLD"
};

firebase.initializeApp(firebaseConfig); //firebase 초기화

const db = firebase.firestore(); //store 사용

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      password: '',
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    var { phoneNumber, password } = this.state;
    password = String(password);
    db.collection('users')
      .doc(phoneNumber)
      .get()
      .then(
        function (doc) {
          if (!doc.data()) {
            alert("등록된 유저가 없습니다.");

          }

          else { //등록된 유저일 경우
            db.doc(`/users/${phoneNumber}`).get().then(function (doc) {
              var userPassword = doc.data().password;
              console.log(userPassword, password);
              if (password === userPassword) {
                alert(`${phoneNumber}님, 환영합니다`);
              }
              else {
                alert("비밀번호를 다시 확인해주세요")
              }
            })

          }
        });

    let nextState = {
    };
    this.setState(nextState);
  }

  handleChange(e) {
    console.log(e.target);
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  render() {
    return (
      <form onSubmit={this.handleClick}>
        <h1>로그인</h1>
          핸드폰 번호: <input
          placeholder="핸드폰 번호"
          name="phoneNumber"
          value={this.state.phoneNumber}
          onChange={this.handleChange} />

          비밀번호: <input
          placeholder="비밀번호"
          name="password"
          value={this.state.password}
          onChange={this.handleChange} />

        <br />
        <button type="submit">추가하기</button>
        <br />
        <p>
        <button type="submit">회원가입</button>
        </p>
      </form>

    );
  }

}

export default App;

// db.collection('users')
//   .doc(phoneNumber)
//   .set({
//     cons_amount: 1,
//     coupons_amount: 0,
//     password: "1234",
//   });
// db.collection(`/users/${phoneNumber}/cons`).add({
//   create_date: new Date(),
//   is_used: false,
//   is_expired: false
// });
// alert(`${phoneNumber}님 환영합니다.`);