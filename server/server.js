const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")

const app = express()
const PORT = process.env.PORT || 5000
const JWT_SECRET = "your-secret-key" // In production, use environment variables

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Simulated user database
const users = [{ id: 1, email: "user@example.com", password: "password123", name: "Demo User" }]

// Login route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body

  // Find user by email
  const user = users.find((u) => u.email === email)

  // Check if user exists and password matches
  if (user && user.password === password) {
    // In a real app, the password would be hashed and compared securely
    // Never store plain text passwords

    // Create JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" })

    // Return success with user data (excluding password)
    const { password: _, ...userData } = user
    return res.json({
      success: true,
      user: userData,
      token,
    })
  }

  // Return error for invalid credentials
  return res.status(401).json({
    success: false,
    message: "Invalid email or password",
  })
})

// Protected route example
app.get("/api/profile", authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.id)

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  const { password: _, ...userData } = user
  res.json(userData)
})

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Authentication required" })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" })
    }

    req.user = user
    next()
  })
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
