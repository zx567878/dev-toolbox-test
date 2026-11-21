import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://43102620.xyz',
  integrations: [sitemap()],
  // 关键：file 格式让文章产出 /posts/<slug>.html，与既定 permalink 规则一致
  build: { format: 'file' },
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      wrap: true,
    },
  },
  devToolbar: { enabled: false },
});
