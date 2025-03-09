import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class AddPasswordColumnToUser1741473785741 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Добавляем столбец `password` без ограничения NOT NULL
    await queryRunner.query(`
      ALTER TABLE "user"
      ADD COLUMN "password" character varying;
    `);

    // 2. Хешируем пароль
    const hashedPassword = await bcrypt.hash('default_password', 10);

    // 3. Устанавливаем хешированный пароль для существующих записей
    await queryRunner.query(`
      UPDATE "user"
      SET "password" = '${hashedPassword}';
    `);

    // 4. Изменяем столбец `password`, чтобы он не допускал NULL
    await queryRunner.query(`
      ALTER TABLE "user"
      ALTER COLUMN "password" SET NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Откат миграции: удаляем столбец `password`
    await queryRunner.query(`
      ALTER TABLE "user"
      DROP COLUMN "password";
    `);
  }
}