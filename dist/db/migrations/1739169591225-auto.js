"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auto1739169591225 = void 0;
class Auto1739169591225 {
    constructor() {
        this.name = 'Auto1739169591225';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "article" integer NOT NULL, "color" character varying(100), "price" numeric(10,2), "img" character varying(255), "categoryId" integer, CONSTRAINT "UQ_e3c0b01c8df8b391e132379445e" UNIQUE ("article"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }
}
exports.Auto1739169591225 = Auto1739169591225;
//# sourceMappingURL=1739169591225-auto.js.map