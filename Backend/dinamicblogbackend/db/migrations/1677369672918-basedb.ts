import { MigrationInterface, QueryRunner } from "typeorm";

export class basedb1677369672918 implements MigrationInterface {
    name = 'basedb1677369672918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(50) NOT NULL, \`last_name\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`avatar\` longblob NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`login\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user\` varchar(50) NOT NULL, \`password\` varchar(50) NOT NULL, \`profile_id\` int NOT NULL, UNIQUE INDEX \`IDX_b1d565077145a749138b30a400\` (\`profile_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`blog\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`date\` date NOT NULL, \`description\` text NOT NULL, \`image\` longblob NULL, \`profile_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`document\` (\`document_id\` int NOT NULL AUTO_INCREMENT, \`html\` varchar(50) NOT NULL, \`image\` longblob NULL, \`blog_id\` int NOT NULL, PRIMARY KEY (\`document_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`login\` ADD CONSTRAINT \`FK_b1d565077145a749138b30a4003\` FOREIGN KEY (\`profile_id\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`blog\` ADD CONSTRAINT \`FK_23bebf58a5f833bd0a4087cdfdc\` FOREIGN KEY (\`profile_id\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`document\` ADD CONSTRAINT \`FK_50a7967d9168aa4bbec35dbcc93\` FOREIGN KEY (\`blog_id\`) REFERENCES \`blog\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`document\` DROP FOREIGN KEY \`FK_50a7967d9168aa4bbec35dbcc93\``);
        await queryRunner.query(`ALTER TABLE \`blog\` DROP FOREIGN KEY \`FK_23bebf58a5f833bd0a4087cdfdc\``);
        await queryRunner.query(`ALTER TABLE \`login\` DROP FOREIGN KEY \`FK_b1d565077145a749138b30a4003\``);
        await queryRunner.query(`DROP TABLE \`document\``);
        await queryRunner.query(`DROP TABLE \`blog\``);
        await queryRunner.query(`DROP INDEX \`IDX_b1d565077145a749138b30a400\` ON \`login\``);
        await queryRunner.query(`DROP TABLE \`login\``);
        await queryRunner.query(`DROP TABLE \`profile\``);
    }

}
