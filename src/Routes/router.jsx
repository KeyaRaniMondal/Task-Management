import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/login'
import AddTask from '../Pages/Tasks/addTask';
import MainLayout from '../Layouts/mainLayout';
import TaskBoard from '../Pages/Tasks/showTask';

const Router = () => {
  return (
    <Routes>
        <Route index element={<MainLayout/>}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/addTask" element={<AddTask></AddTask>} />
      <Route path="/showTask" element={<TaskBoard></TaskBoard>} />
    </Routes>
  );
};

export default Router;
