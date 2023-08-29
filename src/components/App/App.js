import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import TiketsList from '../TiketsList';

import s from './App.module.scss';

function App() {
  return (
    <div className={s.container}>
      <Header />
      <SideBar />
      <TiketsList />
    </div>
  );
}

export default App;
