const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function register(req, res) {
  const { email, password, name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  } finally {
    await prisma.$disconnect();
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  console.log('Received login request for email:', email); // Verifica l'email ricevuta nel log

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    console.log('Found user:', user); // Verifica se l'utente è stato trovato nel log

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log('Password match:', isMatch); // Verifica se la password corrisponde nel log

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error); // Log dell'errore nel caso ci siano problemi
    res.status(500).json({ error: 'Error logging in user' });
  } finally {
    await prisma.$disconnect();
  }
}

async function logout(req, res) {
  // For simplicity, we handle logout on the client side by deleting the token.
  res.json({ message: 'Logout successful' });
}

module.exports = {
  register,
  login,
  logout,
};
