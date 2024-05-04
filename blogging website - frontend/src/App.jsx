import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'

// Components
import Navbar from '../src/components/Navbar'

const App = () => {
    return (
        <div className='flex flex-col w-full min-h-full bg-white text-black '>
                <Router>
                    <Navbar />
                    <Routes>
                        {/* <Route path='/' element={}/> */}
                    </Routes>
                </Router>
        </div>
    )
}

export default App;