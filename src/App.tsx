import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import TaskEdit from './pages/TaskEdit';
import TaskList from './pages/TaskList';
import './App.scss';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<TaskList/>}/>
        <Route path='/task/:id' element={<TaskEdit/>}/>
        <Route
            path="*"
            element={<Navigate to="/" replace />}
        />
      </Routes>
      <Toaster></Toaster>
      </BrowserRouter>
    </div>
  );
}

export default App;
