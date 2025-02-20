import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Login from './login';

const Router = () => {
  return (
    <Routes>
        <Route index element={<Login/>}></Route>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default Router;
