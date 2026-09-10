import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
  const { isAuthenticated, email, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate("/login")
  }

  return (
    <header className="navbar">
      <Link to="/" className="navbar-mark" style={{ textDecoration: "none", color: "inherit" }}>
        task<span>log</span>
      </Link>
      <div className="navbar-right">
        {isAuthenticated ? (
          <>
            {email && <span>{email}</span>}
            <button onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </div>
    </header>
  )
}
