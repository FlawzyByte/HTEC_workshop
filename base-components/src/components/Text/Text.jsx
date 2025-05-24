import "./Text.css";

function Text({ variant = "body", children }) {
  return <div className={`text-${variant}`}>{children}</div>;
}
export default Text;
