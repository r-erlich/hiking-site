const mongoose = require('mongoose');
const hikeSchema = new mongoose.Schema({
    hikeName: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      review: {
        type: String,
      },
      rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
    });

    const userSchema = new mongoose.Schema({
        username: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
        hikes: [hikeSchemaSchema]
      });
      
      const User = mongoose.model('User', userSchema);
      
      module.exports = User;