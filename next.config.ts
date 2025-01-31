import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint:{
        ignoreDuringBuilds:true
    },
    images:{
        
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'api-cdn.rule34.xxx',
                port: '',
                pathname: '/**',
                search: '',
                        
            },
            {
                protocol: 'https',
                hostname: 'api-cdn-mp4.rule34.xxx',
                port: '',
                pathname: '/**',
                search: '',
                        
            }
        ]
    }

};

export default nextConfig;
