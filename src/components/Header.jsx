import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/Header.css"

const Header = () => {
    const {themeValue ,setThemeValue} = useContext(ThemeContext);
    const handleClick = () => {
        setThemeValue(!themeValue);
    };

    return (
        <div className={ themeValue? 'header dark-header' : 'header'}>
            <h1 className="header--title"><p>This is not a practice page of: </p><strong>Rick And Morty</strong></h1>
            <div className="theme">
                <p className="theme--name">Dark Mode</p>
                <button className="mode--button" onClick={handleClick} type="button"> <div className={themeValue? "mode--button__selector selector-dark": "mode--button__selector"}></div><p className="mode--text">On</p> <p className="mode--text">Off</p></button>
            </div>
        </div>
    );
};

export { Header };