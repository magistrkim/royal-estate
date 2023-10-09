import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="royal-estate/" element={<Home />} />
        <Route path="royal-estate/about" element={<About />} />
        <Route path="royal-estate/profile" element={<Profile />} />
        <Route path="royal-estate/signin" element={<Signin />} />
        <Route path="royal-estate/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
