import './App.css';
import ThemeToggle from './components/ThemeToggle';

function Nav() {
  return (
    <>
      <nav id="navbar" className="nav">
        <a id="logo" href="https://isaiahiruoha.com/">II</a>
        <ul className="nav-list">
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#skills">Experience</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li className="theme-toggle-container">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Nav;