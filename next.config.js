// next.config.js
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://3kd8fds38lvbrrcg.public.blob.vercel-storage.com*',
      },
    ];
  },
  env: {
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    // Agrega aquí otras variables de entorno según sea necesario
  },
  // Otras configuraciones de Next.js
};