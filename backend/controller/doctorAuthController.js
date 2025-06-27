const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Doctor
const registerDoctor = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const doctorExists = await Doctor.findOne({ email });
    if (doctorExists) {
      return res.status(400).json({ message: 'Doctor already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const doctor = await Doctor.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: doctor._id, role: 'doctor' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      token,
      role: 'doctor',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Doctor
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: doctor._id, role: 'doctor' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      token,
      role: 'doctor',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerDoctor, loginDoctor }; 