// Run this script to clean up duplicate users
// Usage: node cleanup-duplicate-user.js

const mongoose = require('mongoose');

async function cleanupDuplicateUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'your_mongodb_connection_string');
    
    // Find all users with the same username but different emails
    const duplicateUsername = "Amar Chauhan";
    
    const users = await mongoose.connection.db.collection('users').find({
      username: duplicateUsername
    }).toArray();
    
    console.log(`Found ${users.length} users with username "${duplicateUsername}"`);
    
    if (users.length > 1) {
      // Keep the first user, remove others
      const usersToDelete = users.slice(1);
      
      for (const user of usersToDelete) {
        console.log(`Deleting user: ${user.email} (ID: ${user._id})`);
        await mongoose.connection.db.collection('users').deleteOne({ _id: user._id });
      }
      
      console.log(`Cleaned up ${usersToDelete.length} duplicate users`);
    } else {
      console.log('No duplicate users found');
    }
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error cleaning up users:', error);
    process.exit(1);
  }
}

cleanupDuplicateUsers();