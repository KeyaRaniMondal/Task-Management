import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/login'
import AddTask from '../Pages/Tasks/addTask';

const Router = () => {
  return (
    <Routes>
        <Route index element={<Login/>}></Route>
      <Route path="/home" element={<Home />} />
      <Route path="/addTask" element={<AddTask></AddTask>} />
    </Routes>
  );
};

export default Router;
