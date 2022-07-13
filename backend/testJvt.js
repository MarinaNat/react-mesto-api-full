const jwt = require('jsonwebtoken');

const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmNhOTQwNmU5YTI2MTRjODE1MTliMjIiLCJpYXQiOjE2NTc3NTA4MTMsImV4cCI6MTY1ODM1NTYxM30.3rh23PSxFYnSErCft6nZUDbDRQpLSzN2r4cEryiziGI'; // вставьте сюда JWT, который вернул публичный сервер студента
const SECRET_KEY_DEV = 'QWERTY'; // вставьте сюда секретный ключ для разработки из кода студента
try {
  const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
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
