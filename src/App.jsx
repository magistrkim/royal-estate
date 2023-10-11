import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<div>...here will be Loader Component</div>}>
        <Routes>
          <Route path="royal-estate/" element={<Home />} />
          <Route path="royal-estate/about" element={<About />} />
          <Route path="royal-estate/profile" element={<Profile />} />
          <Route path="royal-estate/signin" element={<Signin />} />
          <Route path="royal-estate/signup" element={<Signup />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

export default App;