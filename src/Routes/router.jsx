import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/login'
import AddTask from '../Pages/Tasks/addTask';
import MainLayout from '../Layouts/mainLayout';
import TaskBoard from '../Pages/Tasks/showTask';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout/>}>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />     
      <Route path="/login" element={<Login />} />      
      <Route path="/addTask" element={<AddTask></AddTask>} />
      <Route path="/showTask" element={<TaskBoard></TaskBoard>} />
      </Route>
       
    </Routes>
  );
};

export default Router;
