import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'

// Components
import Navbar from '../src/components/Navbar'
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
    return (
        <div className='flex flex-col w-full min-h-full bg-white text-black '>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path='/login' element={<Login />}/>
                        <Route path='/signup' element={<Signup />}/>
                    </Routes>
                </Router>
        </div>
    )
}

export default App;