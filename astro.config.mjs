import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { Entorno } from './Entorno';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'server',
  port: Entorno.port,
  host: Entorno.host
});