const User = require('../models/user.model');

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      req.session.user = { username: user.username, role: user.role };
      return res.json({ success: true, role: user.role });
    }
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.json({ success: true });
};

const getCurrentUser = (req, res) => {
  if (req.session.user) {
    return res.json({ user: req.session.user });
  }
  res.status(401).json({ user: null });
};

module.exports = { login, logout, getCurrentUser };
