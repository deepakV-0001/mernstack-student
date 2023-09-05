
import './App.css';
import Nav from './components/Nav';
import { BrowserRouter ,Routes ,Route} from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddStudent from './components/AddStudent';
import StudentList from './components/StudentList';
import UpdateStudent from './components/UpdateStudent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>

        <Route element={<PrivateComponent/>}>
        <Route path='/' element={<StudentList/>}/>
        <Route path='/add' element={<AddStudent/>}/>
        <Route path='/update/:id' element={<UpdateStudent/>}/>
        <Route path='/logout' element={<h1></h1>}/>
        <Route path='/profile' element={<h1>Profile page</h1>}/>
        </Route>
        
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
