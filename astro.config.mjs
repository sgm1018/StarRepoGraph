import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { Entorno } from './Entorno';
import react from '@astrojs/react';
// import node from '@astrojs/node';
import vercel from '@astrojs/vercel';


export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'server',
  port: Entorno.port,
  host: Entorno.host,
  adapter: vercel(),
});