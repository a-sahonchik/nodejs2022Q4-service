import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetupDB1677508783661 implements MigrationInterface {
  name = 'SetupDB1677508783661';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "refreshToken" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
  }
}
