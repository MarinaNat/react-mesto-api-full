const jwt = require('jsonwebtoken');

const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmNmM2Y4M2I0YjcyYTkzZTQxZDYzYjIiLCJpYXQiOjE2NTc3NDkzOTAsImV4cCI6MTY1ODM1NDE5MH0._lsVXid36XHsaFJ4zUC8nxXneryuCx_4QAYrswyFrGU'; // вставьте сюда JWT, который вернул публичный сервер студента
const SECRET_KEY_DEV = 'eb28135ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b'; // вставьте сюда секретный ключ для разработки из кода студента
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
