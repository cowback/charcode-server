import mongoose from 'mongoose';
import encryptionService from '../services/encryption-service';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: true,
  },
}, { minimize: false });

userSchema.pre('save', function preSafe(next) {
  if (!this.isModified('password') && !this.isNew) next();

  encryptionService.encrypt(this.password).then((hash) => {
    this.password = hash;
    next();
  }).catch((err) => {
    next(err);
  });
});

userSchema.methods.comparePassword = function comparePassword(password, callback) {
  encryptionService.compare(password, this.password).then((equals) => {
    callback(undefined, equals);
  }).catch((err) => {
    callback(err);
  });
};

export default mongoose.model('User', userSchema);
