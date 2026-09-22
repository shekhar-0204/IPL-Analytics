import { BarChart3 } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="brand-icon">
          <BarChart3 size={22} />
        </div>

        <div>
          <h1>IPL Analytics</h1>
          <span>Cricket Statistics Dashboard</span>
        </div>
      </div>

      <div className="navbar-right">
        <span className="status-dot"></span>
        <span>Live Analytics</span>
      </div>
    </nav>
  );
}

export default Navbar;