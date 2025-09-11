/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: chrome-extension: moz-extension: webkit-extension:; img-src 'self' data: blob: chrome-extension: moz-extension:; script-src 'self' 'unsafe-inline' 'unsafe-eval' chrome-extension: moz-extension:;"
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
