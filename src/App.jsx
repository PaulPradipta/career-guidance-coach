import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Signin from './components/Signin'
import Signup from './components/Signup'
import HomePage from './components/HomePage'
import Dashboard from './components/Dashboard'
import ViewResumes from './components/ViewResumes'
import ResumeForm from './components/ResumeForm'
import ResumePreview from './components/ResumePreview'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/viewresumes" element={<ViewResumes/>}/>
          <Route path="/resume-form" element={<ResumeForm/>}/>
          {/* This route now correctly matches the navigation in ResumeForm */}
          <Route path="/resume/preview/:userId" element={<ResumePreview/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
