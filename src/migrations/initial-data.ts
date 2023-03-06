import { MigrationInterface, QueryRunner } from 'typeorm';
import { Roles } from '../auth/roles.enum';
import { User } from '../users/entities/user.entity';

export class InitialData1614762444377 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.connection.getRepository(User);
    const adminUser = new User();
    adminUser.username = 'admin';
    adminUser.password = 'password';
    adminUser.roles = [Roles.Admin];
    await userRepository.save(adminUser);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.connection.getRepository(User);
    const adminUser = await userRepository.findOne({
      where: { username: 'admin' },
    });
    if (adminUser) {
      await userRepository.remove(adminUser);
    }
  }
}
