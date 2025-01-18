import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            'tsparticles': 'tsparticles',
        },
    },
    base: '/', // Use '/' if deploying at the root of your domain or './' if deploying in a subdirectory
});
