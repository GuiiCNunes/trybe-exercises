import './App.css';

const taskList = ['escovar os dentes', 'tomar banho', 'arrumar a mochila'];

const Task = (value) => {
  return (
    <li>{value}</li>
  );
}

function App() {
  return (
    <ol>
      {taskList.map((element) => Task(element))}
    </ol>
  );
}

export default App;
