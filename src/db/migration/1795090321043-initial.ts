import type { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1795090321043 implements MigrationInterface {
    name = 'Initial1795090321043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_details" ("id" SERIAL NOT NULL, "salary" double precision, "location" character varying, CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "comment" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "productId" integer, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'user', 'manager')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "email" character varying NOT NULL, "imageProfile" character varying, "password" character varying(100) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "isActive" boolean NOT NULL DEFAULT false, "verificationToken" character varying, "resetpasswordToken" character varying, "create_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "update_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "detailsId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_a8687924ae4d52f05db87f3352" UNIQUE ("detailsId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "description" text, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL DEFAULT '0', "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_a6b3c434392f5d10ec171043666" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a8687924ae4d52f05db87f3352f" FOREIGN KEY ("detailsId") REFERENCES "user_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a8687924ae4d52f05db87f3352f"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_a6b3c434392f5d10ec171043666"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "user_details"`);
    }

}
