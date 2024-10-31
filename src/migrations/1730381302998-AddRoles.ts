import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoles1730381302998 implements MigrationInterface {
    name = 'AddRoles1730381302998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    }

}
