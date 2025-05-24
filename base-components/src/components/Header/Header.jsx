import "./header.css";

function Header({ title, children }) {
  return (
    <header>
      <a href="/">
        <img src="/logo.png" alt="logo-image" />
      </a>
      {children}
      <h3>{title}</h3>
      <h3 className="pecsTitle">Pécs Workshop</h3>
    </header>
  );
}

export default Header;
