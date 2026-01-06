
import logo from './logo.svg';
import './App.css';
import Hero from './components/hero/Hero';
import DashboardList from './components/dashboard-list/DashboardList';
import Header from './components/header/Header';
import RythuBazarInfo from './components/RythuBazarInfo/RythuBazarInfo';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="">
      <Header />
      <Hero />
      <DashboardList />
      <RythuBazarInfo />
      <Footer />
    </div>
  );
}

export default App;
