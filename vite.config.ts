import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { getAliases } from 'vite-aliases';
import vitePluginImp from 'vite-plugin-imp';

const aliases = getAliases();

export default defineConfig({
  plugins: [
    reactRefresh(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/lib/${name}/style/index.css`
        }
      ]
    })
  ],
  resolve: {
    alias: aliases
  }
});
