import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetupDB1676817290960 implements MigrationInterface {
  name = 'SetupDB1676817290960';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" character varying, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "artistId" character varying, "albumId" character varying, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorite_album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "albumId" uuid, CONSTRAINT "PK_8b1f4c021579fa1631fcc0b6377" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorite_artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "artistId" uuid, CONSTRAINT "PK_62b62ed38bf0e76f54a5609f9ae" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorite_track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "trackId" uuid, CONSTRAINT "PK_919a46033d84cebe3f7c405fe50" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_album" ADD CONSTRAINT "FK_25b9b6014e56d858b32863836ca" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_artist" ADD CONSTRAINT "FK_abb58fab7ade1c31939a54e1342" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_track" ADD CONSTRAINT "FK_8cdd0f83efe8f5df377eeab9b70" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorite_track" DROP CONSTRAINT "FK_8cdd0f83efe8f5df377eeab9b70"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_artist" DROP CONSTRAINT "FK_abb58fab7ade1c31939a54e1342"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_album" DROP CONSTRAINT "FK_25b9b6014e56d858b32863836ca"`,
    );
    await queryRunner.query(`DROP TABLE "favorite_track"`);
    await queryRunner.query(`DROP TABLE "favorite_artist"`);
    await queryRunner.query(`DROP TABLE "favorite_album"`);
    await queryRunner.query(`DROP TABLE "track"`);
    await queryRunner.query(`DROP TABLE "album"`);
    await queryRunner.query(`DROP TABLE "artist"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
