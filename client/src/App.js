import axios from 'axios';
import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { UserContext } from './context/UserContext';
import Header1 from './companant/Header/Header'
// import Header1 from './Component/Header/Header';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signUp/SignUp';
import Footer from './companant/Footer/Footer';
import Que from './pages/AskQuestion/AskQuestion'
import AnswerQuestion from './pages/QuestionDetail/QuestionDetail';
function App() {
  const [userData, setUserData] = useContext(UserContext);

  const checkLoggedIn = async () => {
    let token = localStorage.getItem('auth-token');
    if (token === null) {
      localStorage.setItem('auth-token', '');
      token = '';
    } else {
      const userRes = await axios.get('http://localhost:4000/api/users', {
        headers: { 'x-auth-token': token }
      });
      // console.log(userRes);
      setUserData({
        token,
        user: {
          id: userRes.data.data.user_id,
          display_name: userRes.data.data.user_name
        }
      })
    }
  }
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem('auth-token', '');
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);
  return (
    <Router>
      <Header1 logout={logout} />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home logout={logout} />} />
        <Route path="/ask-question" element={<Que />} />
        <Route path="/questions/:id" element={<AnswerQuestion />} />
      </Routes>
      <Footer />
    </Router>
  )
}
export default App;
