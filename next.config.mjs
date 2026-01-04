/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol:'https',
        hostname:'images.unsplash.com',
        port:'',
        pathname:'/**'
      },
      {
        protocol:'https',
        hostname:'unsplash.com',
        port:'',
        pathname:'/**'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh4.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh5.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh6.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  webpack: (config, { isServer, webpack }) => {
    // Fix for MongoDB client-side import issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        buffer: false,
        dns: false,
        async_hooks: false,
        child_process: false,
        timers: false,
        "timers/promises": false,
        util: false,
        os: false,
        path: false,
        events: false,
        url: false,
        querystring: false,
        http: false,
        https: false,
        zlib: false,
        assert: false,
        punycode: false,
        constants: false,
        module: false,
        cluster: false,
        dgram: false,
        readline: false,
        repl: false,
        vm: false,
        worker_threads: false,
        perf_hooks: false,
      };

      // Exclude server-only packages from client bundle
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^(mongodb|mongoose)$/,
        })
      );
    }
    
    return config;
  },
  // Add empty turbopack config to suppress warning
  turbopack: {},
  serverExternalPackages: ['mongodb'],
};

export default nextConfig;
