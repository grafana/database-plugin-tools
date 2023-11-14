import path from 'path';
import { Configuration, EnvironmentPlugin } from 'webpack';
import { merge } from 'webpack-merge';

import getBaseConfig from './.config/webpack/webpack.config';

const config = async (env: any): Promise<Configuration> => {
  const baseConfig = await getBaseConfig(env);

  return merge(baseConfig, {
    plugins: [
      new EnvironmentPlugin({
        NODE_ENV: Boolean(env.production) ? 'production' : 'development',
        ENABLE_MSW: Boolean(env.enable_msw) && Boolean(env.development), // Only enable msw if in development and enable_msw flag is set
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
    },
  });
};

export default config;
