const Nurse = require('../models/Nurse');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Nurse
const registerNurse = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const nurseExists = await Nurse.findOne({ email });
    if (nurseExists) {
      return res.status(400).json({ message: 'Nurse already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const nurse = await Nurse.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: nurse._id, role: 'nurse' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      _id: nurse._id,
      name: nurse.name,
      email: nurse.email,
      token,
      role: 'nurse',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Nurse
const loginNurse = async (req, res) => {
  try {
    const { email, password } = req.body;
    const nurse = await Nurse.findOne({ email });
    if (!nurse) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, nurse.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: nurse._id, role: 'nurse' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({
      _id: nurse._id,
      name: nurse.name,
      email: nurse.email,
      token,
      role: 'nurse',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerNurse, loginNurse }; 