import { DataSource } from 'typeorm';
import { InitialData1614762444377 } from './src/migrations/initial-data';
import { User } from './src/users/entities/user.entity';
import { Image } from './src/images/entities/image.entity';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Asiris1711',
  database: 'gallery',
  entities: [User, Image],
  migrations: [InitialData1614762444377],
});
console.log(dataSource.migrations);
