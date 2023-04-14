import React, { useState } from 'react';
import s from './RegistrationForm.module.scss';
import openai from 'openai';
openai.apiKey = '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';

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  // Створення з'єднання з MongoDB Atlas
  mongoose
    .connect(
      'mongodb+srv://agdemidof:s1lenth1llQq@cluster0.m1fi5qp.mongodb.net/test',
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.log(err));

  // Створення схеми для моделі користувачів
  const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
  });

  // Створення моделі користувачів
  const User = mongoose.model('User', UserSchema);

  // Обробник подання форми
  function handleSubmit(event) {
    event.preventDefault();
    const newUser = new User({ username, email, password });
    newUser
      .save()
      .then(() => console.log('User saved to database'))
      .catch(err => console.log(err));
  }

  return (
    <form onSubmit={handleSubmit} className={s.registrationForm}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;
