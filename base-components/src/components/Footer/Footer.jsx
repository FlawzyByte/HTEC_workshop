import "./Footer.css";

function Footer({ children }) {
  return (
    <footer>
      <span>&#169; 2025 Pécs Workshop </span>
      <a href="https://htec.com" target="_blank">
        HTEC
      </a>
      {children}
    </footer>
  );
}

export default Footer;
