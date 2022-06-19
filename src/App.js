import { Header } from './components/Header';
import { Characters } from './components/Characters';
import { ThemeContext } from "./context/ThemeContext";
import { useContext } from "react";
import './App.css';

function App() {
  const {themeValue} = useContext(ThemeContext);
  return (
    <div className={ themeValue? 'App dark-App': 'App' }>
      <Header/>
      <Characters/>
    </div>
  );
}

export default App;
