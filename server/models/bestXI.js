const mongoose = require('mongoose');
const { Schema } = mongoose;

const bestXISchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  formation: {
    type: String,
    required: true
  },
  players: {
    type: Map,
    of: String,
    validate: {
      validator: function(map) {
        return Array.from(map.keys()).every(key => !key.startsWith('$'));
      },
      message: 'Player keys cannot start with "$"'
    }
  }
}, { timestamps: true });

const BestXIModel = mongoose.model('BestXI', bestXISchema);

module.exports = BestXIModel;
