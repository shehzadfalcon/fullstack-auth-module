import { env } from 'process';

import { mongoose } from '../../transformers/mongoose.transformer';
import { EDependencyTokens } from 'src/enums/dependency-tokens.enum';

export const databaseProvider = {
  inject: [],
  provide: EDependencyTokens.DB_CONNECTION_TOKEN,
  useFactory: async () => {
    let reconnectionTask = null;
    const RECONNECT_INTERVAL = 6000;

    // Connect to the database
    function connection() {
      return mongoose.connect(env.DB_URI, {});
    }

    mongoose.connection.on('connecting', () => {
      console.log('Database connection...');
    });

    mongoose.connection.on('open', () => {
      console.info('Database connection is successful！');
      clearTimeout(reconnectionTask);
      reconnectionTask = null;
    });

    mongoose.connection.on('disconnected', () => {
      console.error(
        `Database connection lost！try ${RECONNECT_INTERVAL / 1000}s Reconnect`,
      );
      reconnectionTask = setTimeout(connection, RECONNECT_INTERVAL);
    });

    mongoose.connection.on('error', (error) => {
      console.error('Database exception！', error);
      mongoose.disconnect();
    });

    return await connection();
  },
};
