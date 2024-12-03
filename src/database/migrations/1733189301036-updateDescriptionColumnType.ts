import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDescriptionColumnType1733189301036
  implements MigrationInterface
{
  name = "UpdateDescriptionColumnType1733189301036";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE social_service ALTER COLUMN description TYPE character varying(1500)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE social_service ALTER COLUMN description TYPE character varchar(255)`
    );
  }
}
