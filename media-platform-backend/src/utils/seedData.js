const User = require('../models/User');
const bcrypt = require('bcryptjs');

const seedCreators = async () => {
  try {
    const creators = [
      {
        username: 'creator_nature',
        email: 'creator@example.com',
        password: 'password123',
        fullName: 'Nature Creator',
        role: 'creator',
      },
      {
        username: 'creator_travel',
        email: 'creator2@example.com',
        password: 'password123',
        fullName: 'Travel Creator',
        role: 'creator',
      },
      {
        username: 'creator_food',
        email: 'creator3@example.com',
        password: 'password123',
        fullName: 'Food Creator',
        role: 'creator',
      },
    ];

    for (const creator of creators) {
      const exists = await User.findOne({ email: creator.email });
      if (!exists) {
        await User.create(creator);
        console.log(`✅ Created creator: ${creator.email}`);
      }
    }
  } catch (error) {
    console.error('Error seeding creators:', error);
  }
};

module.exports = seedCreators;