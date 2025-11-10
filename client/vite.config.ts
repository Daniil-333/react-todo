import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import * as process from "node:process";

// https://vite.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '');
    const isDev = mode === 'development';

    return {
        define: {
            __APP_ENV__: JSON.stringify(env.APP_ENV),
        },
        server: {
            port: env.REACT_APP_PORT ? Number(env.REACT_APP_PORT) : 5173,
        },
        plugins: [
            react({
                babel: isDev ? {
                    plugins: [['babel-plugin-react-compiler']],
                } : undefined,
            }),
        ],
        esbuild: false,
        build: {
            target: 'es2015',
            minify: 'terser',
            sourcemap: false,
        }
    }
})
