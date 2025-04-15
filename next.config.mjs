/** @type {import('next').NextConfig} */
// const webpack = require("webpack");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost','aksmedia.in', 'seller.aksmedia.in', 'clients.aksindia.com'], // Allow images from localhost
  },
  // output: 'export',
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    // Example: Adding a custom loader
    config.module.rules.push({
      test: /\.html$/,
      use: 'html-loader',
    });

    // Adding jQuery globally
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      })
    ); 

    
    return config;
  },
};

export default nextConfig;

 

/** @type {import('next').NextConfig} */
// const webpack = require("webpack");

// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'universalstudenthomes.com',  // The domain for the images
//         port: '',  // No specific port
//         pathname: '/uploads/**',  // Path where the images are located
//       },
//       {
//         protocol: 'http',  // Assuming you're using HTTP for localhost
//         hostname: 'localhost',  // Allow images from localhost
//         port: '3000',  // Or whichever port your localhost server is running on
//         pathname: '/uploads/**',  // Path where the images are located
//       },
//     ],
//   },
//   // output: 'export',
//   webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
//     // Example: Adding a custom loader
//     config.module.rules.push({
//       test: /\.html$/,
//       use: 'html-loader',
//     });

//     // Adding jQuery globally
//     config.plugins.push(
//       new webpack.ProvidePlugin({
//         $: 'jquery',
//         jQuery: 'jquery',
//         'window.jQuery': 'jquery',
//       })
//     );

//     return config;
//   },
// };

// export default nextConfig;

