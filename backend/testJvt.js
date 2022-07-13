const jwt = require('jsonwebtoken');

const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmNmMWU0M2I0YjcyYTkzZTQxZDYzN2MiLCJpYXQiOjE2NTc3NDA4ODgsImV4cCI6MTY1ODM0NTY4OH0.j7RHNo5FhvBANFP2P2Pbs8DZ0sk0F8bMnGNoxlKqItk'; // вставьте сюда JWT, который вернул публичный сервер студента
const SECRET_KEY_DEV = 'SECRET_KEY'; // вставьте сюда секретный ключ для разработки из кода студента
try {
  jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log('\x1b[31m%s\x1b[0m', `
Надо исправить. В продакшне используется тот же
секретный ключ, что и в режиме разработки.
`);
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    console.log(
      '\x1b[32m%s\x1b[0m',
      'Всё в порядке. Секретные ключи отличаются',
    );
  } else {
    console.log(
      '\x1b[33m%s\x1b[0m',
      'Что-то не так',
      err,
    );
  }
}
