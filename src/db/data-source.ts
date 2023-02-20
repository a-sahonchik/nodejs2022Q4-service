import { DataSource } from 'typeorm';
import { databaseConfig } from './db.config';

export default new DataSource({
  ...databaseConfig,
});
