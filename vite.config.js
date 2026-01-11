// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@config': path.resolve(__dirname, './src/config'),
            '@types': path.resolve(__dirname, './src/types'),
            '@services': path.resolve(__dirname, './src/services'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@context': path.resolve(__dirname, './src/context'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@lib': path.resolve(__dirname, './src/lib'),
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@routes': path.resolve(__dirname, './src/routes'),
            '@store': path.resolve(__dirname, './src/store'),
            '@assets': path.resolve(__dirname, './src/assets'),
        },
    },
    server: {
        port: 3001,
        proxy: {
            '/api': {
                target: process.env.VITE_API_URL || 'http://localhost:3000',
                changeOrigin: true,
            },
            '/socket.io': {
                target: process.env.VITE_WS_URL || 'http://localhost:3000',
                changeOrigin: true,
                ws: true,
            },
        },
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'ui-vendor': ['lucide-react', 'recharts'],
                    'utils-vendor': ['axios', 'date-fns', 'zod'],
                },
            },
        },
    },
});
