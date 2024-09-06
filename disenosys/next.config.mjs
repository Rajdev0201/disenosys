/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
      },
      sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
      },
      webpack: (config, { isServer }) => {
        // Modify the webpack config as needed
        return config;
      },
};

export default nextConfig;
