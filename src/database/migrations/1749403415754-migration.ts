import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749403415754 implements MigrationInterface {
    name = 'Migration1749403415754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."post_likes_like_type_enum" AS ENUM('0', '1', '2', '3', '4', '5')`);
        await queryRunner.query(`CREATE TABLE "post_likes" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "is_deleted" boolean NOT NULL DEFAULT false, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "like_type" "public"."post_likes_like_type_enum" NOT NULL DEFAULT '0', "post_id" uuid, "user_id" uuid, CONSTRAINT "PK_e4ac7cb9daf243939c6eabb2e0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_followers" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "is_deleted" boolean NOT NULL DEFAULT false, "follower_id" uuid NOT NULL, "following_id" uuid NOT NULL, "followed_at" TIMESTAMP NOT NULL DEFAULT now(), "is_muted" boolean NOT NULL DEFAULT false, "is_blocked" boolean NOT NULL DEFAULT false, "is_request_pending" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_81bc622bd88e6ea821f9fa0ed97" PRIMARY KEY ("follower_id", "following_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."notifications_type_enum" AS ENUM('0', '1', '2', '3', '4', '5')`);
        await queryRunner.query(`CREATE TABLE "notifications" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "is_deleted" boolean NOT NULL DEFAULT false, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."notifications_type_enum" NOT NULL DEFAULT '0', "message" text, "is_read" boolean NOT NULL DEFAULT false, "read_at" TIMESTAMP, "user_id" uuid, "related_post_id" uuid, "comment_id" uuid, "follower_id" uuid, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message_statuses" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "is_deleted" boolean NOT NULL DEFAULT false, "message_id" uuid NOT NULL, "user_id" uuid NOT NULL, "is_read" boolean NOT NULL DEFAULT false, "read_at" TIMESTAMP, CONSTRAINT "PK_aa29a73af33a25a7fba23c242cb" PRIMARY KEY ("message_id", "user_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."message_attachments_file_type_enum" AS ENUM('png', 'jpeg', 'gif', 'mp4', 'webm', 'pdf', 'docx', 'txt')`);
        await queryRunner.query(`CREATE TABLE "message_attachments" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "is_deleted" boolean NOT NULL DEFAULT false, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "file_url" text NOT NULL, "file_type" "public"."message_attachments_file_type_enum", "uploaded_at" TIMESTAMP NOT NULL DEFAULT now(), "message_id" uuid, CONSTRAINT "PK_e5085d973567c61e9306f10f95b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."messages_message_type_enum" AS ENUM('text', 'image', 'video', 'file', 'audio', 'system')`);
        await queryRunner.query(`CREATE TABLE "messages" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "is_deleted" boolean NOT NULL DEFAULT false, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text, "message_type" "public"."messages_message_type_enum" NOT NULL DEFAULT 'text', "is_edited" boolean NOT NULL DEFAULT false, "conversation_id" uuid, "sender_id" uuid, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "conversations" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "is_deleted" boolean NOT NULL DEFAULT false, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100), "is_group" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_ee34f4f7ced4ec8681f26bf04ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "conversation_members" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "is_deleted" boolean NOT NULL DEFAULT false, "conversation_id" uuid NOT NULL, "user_id" uuid NOT NULL, "joined_at" TIMESTAMP NOT NULL DEFAULT now(), "last_read_at" TIMESTAMP, CONSTRAINT "PK_5fa9076068b6f2a26fb793d2439" PRIMARY KEY ("conversation_id", "user_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "is_deleted" boolean NOT NULL DEFAULT false, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(50), "email" character varying(100) NOT NULL, "password" text NOT NULL, "first_name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "dob" TIMESTAMP NOT NULL, "bio" text, "avatar_url" text, "is_verified" boolean NOT NULL DEFAULT false, "verified_at" TIMESTAMP, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "is_deleted" boolean NOT NULL DEFAULT false, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."post_media_media_type_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TABLE "post_media" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "is_deleted" boolean NOT NULL DEFAULT false, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "media_url" text NOT NULL, "media_type" "public"."post_media_media_type_enum" NOT NULL DEFAULT '0', "thumbnail_url" text, "duration" integer, "uploaded_at" TIMESTAMP NOT NULL DEFAULT now(), "post_id" uuid, CONSTRAINT "PK_049edb1ce7ab3d2a98009b171d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "is_deleted" boolean NOT NULL DEFAULT false, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text, "image_url" text, "user_id" uuid, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."comment_media_media_type_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TABLE "comment_media" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "is_deleted" boolean NOT NULL DEFAULT false, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "media_url" text NOT NULL, "media_type" "public"."comment_media_media_type_enum" NOT NULL DEFAULT '0', "thumbnail_url" text, "duration" integer, "uploaded_at" TIMESTAMP NOT NULL DEFAULT now(), "comment_id" uuid, CONSTRAINT "PK_64555a834f96e9d38fd8a479083" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "is_deleted" boolean NOT NULL DEFAULT false, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "post_id" uuid, "user_id" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."comment_likes_like_type_enum" AS ENUM('0', '1', '2', '3', '4', '5')`);
        await queryRunner.query(`CREATE TABLE "comment_likes" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "is_deleted" boolean NOT NULL DEFAULT false, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "like_type" "public"."comment_likes_like_type_enum" NOT NULL DEFAULT '0', "comment_id" uuid, "user_id" uuid, CONSTRAINT "PK_2c299aaf1f903c45ee7e6c7b419" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invalidated_tokens" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "is_deleted" boolean NOT NULL DEFAULT false, "id" character varying NOT NULL, "expiryTime" TIMESTAMP NOT NULL, CONSTRAINT "PK_47bb9767bff72a56f353d6775f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "is_deleted" boolean NOT NULL DEFAULT false, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hashed_token" character varying NOT NULL, "expired_at" TIMESTAMP NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_a3f63cd9808a6b752a61272bfce" UNIQUE ("hashed_token"), CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_tags" ("post_id" uuid NOT NULL, "tag_id" uuid NOT NULL, CONSTRAINT "PK_deee54a40024b7afc16d25684f8" PRIMARY KEY ("post_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5df4e8dc2cb3e668b962362265" ON "post_tags" ("post_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_192ab488d1c284ac9abe2e3035" ON "post_tags" ("tag_id") `);
        await queryRunner.query(`ALTER TABLE "post_likes" ADD CONSTRAINT "FK_b40d37469c501092203d285af80" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_likes" ADD CONSTRAINT "FK_9b9a7fc5eeff133cf71b8e06a7b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_followers" ADD CONSTRAINT "FK_da722d93356ae3119d6be40d988" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_followers" ADD CONSTRAINT "FK_0092daece8ed943fec27d37c413" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_9a8a82462cab47c73d25f49261f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_1ee709f4ef07a17e554964e4d9f" FOREIGN KEY ("related_post_id") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_e20313cbf1dacbb2abc5bd66d26" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_365bb966ca897bc78220c415f08" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message_statuses" ADD CONSTRAINT "FK_229b8548ced91512c3d1f08dc25" FOREIGN KEY ("message_id") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message_statuses" ADD CONSTRAINT "FK_e8cd4c8e814448442e81c430b89" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message_attachments" ADD CONSTRAINT "FK_bf65c3db8657cef6197b68b8c88" FOREIGN KEY ("message_id") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_3bc55a7c3f9ed54b520bb5cfe23" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_22133395bd13b970ccd0c34ab22" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversation_members" ADD CONSTRAINT "FK_36340a1704b039608e34244511f" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversation_members" ADD CONSTRAINT "FK_a46c76be8f62c4b00a835cdc370" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_media" ADD CONSTRAINT "FK_1eeb54a4fdfbe9db17899243cbe" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment_media" ADD CONSTRAINT "FK_2b8372157eb9d8ead079ae24642" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment_likes" ADD CONSTRAINT "FK_2073bf518ef7017ec19319a65e5" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment_likes" ADD CONSTRAINT "FK_bdba9a10c64ff58d36b09e3ac45" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_tags" ADD CONSTRAINT "FK_5df4e8dc2cb3e668b962362265d" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post_tags" ADD CONSTRAINT "FK_192ab488d1c284ac9abe2e30356" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_tags" DROP CONSTRAINT "FK_192ab488d1c284ac9abe2e30356"`);
        await queryRunner.query(`ALTER TABLE "post_tags" DROP CONSTRAINT "FK_5df4e8dc2cb3e668b962362265d"`);
        await queryRunner.query(`ALTER TABLE "comment_likes" DROP CONSTRAINT "FK_bdba9a10c64ff58d36b09e3ac45"`);
        await queryRunner.query(`ALTER TABLE "comment_likes" DROP CONSTRAINT "FK_2073bf518ef7017ec19319a65e5"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5"`);
        await queryRunner.query(`ALTER TABLE "comment_media" DROP CONSTRAINT "FK_2b8372157eb9d8ead079ae24642"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"`);
        await queryRunner.query(`ALTER TABLE "post_media" DROP CONSTRAINT "FK_1eeb54a4fdfbe9db17899243cbe"`);
        await queryRunner.query(`ALTER TABLE "conversation_members" DROP CONSTRAINT "FK_a46c76be8f62c4b00a835cdc370"`);
        await queryRunner.query(`ALTER TABLE "conversation_members" DROP CONSTRAINT "FK_36340a1704b039608e34244511f"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_22133395bd13b970ccd0c34ab22"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_3bc55a7c3f9ed54b520bb5cfe23"`);
        await queryRunner.query(`ALTER TABLE "message_attachments" DROP CONSTRAINT "FK_bf65c3db8657cef6197b68b8c88"`);
        await queryRunner.query(`ALTER TABLE "message_statuses" DROP CONSTRAINT "FK_e8cd4c8e814448442e81c430b89"`);
        await queryRunner.query(`ALTER TABLE "message_statuses" DROP CONSTRAINT "FK_229b8548ced91512c3d1f08dc25"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_365bb966ca897bc78220c415f08"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_e20313cbf1dacbb2abc5bd66d26"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_1ee709f4ef07a17e554964e4d9f"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_9a8a82462cab47c73d25f49261f"`);
        await queryRunner.query(`ALTER TABLE "user_followers" DROP CONSTRAINT "FK_0092daece8ed943fec27d37c413"`);
        await queryRunner.query(`ALTER TABLE "user_followers" DROP CONSTRAINT "FK_da722d93356ae3119d6be40d988"`);
        await queryRunner.query(`ALTER TABLE "post_likes" DROP CONSTRAINT "FK_9b9a7fc5eeff133cf71b8e06a7b"`);
        await queryRunner.query(`ALTER TABLE "post_likes" DROP CONSTRAINT "FK_b40d37469c501092203d285af80"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_192ab488d1c284ac9abe2e3035"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5df4e8dc2cb3e668b962362265"`);
        await queryRunner.query(`DROP TABLE "post_tags"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "invalidated_tokens"`);
        await queryRunner.query(`DROP TABLE "comment_likes"`);
        await queryRunner.query(`DROP TYPE "public"."comment_likes_like_type_enum"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "comment_media"`);
        await queryRunner.query(`DROP TYPE "public"."comment_media_media_type_enum"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "post_media"`);
        await queryRunner.query(`DROP TYPE "public"."post_media_media_type_enum"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "conversation_members"`);
        await queryRunner.query(`DROP TABLE "conversations"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TYPE "public"."messages_message_type_enum"`);
        await queryRunner.query(`DROP TABLE "message_attachments"`);
        await queryRunner.query(`DROP TYPE "public"."message_attachments_file_type_enum"`);
        await queryRunner.query(`DROP TABLE "message_statuses"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TYPE "public"."notifications_type_enum"`);
        await queryRunner.query(`DROP TABLE "user_followers"`);
        await queryRunner.query(`DROP TABLE "post_likes"`);
        await queryRunner.query(`DROP TYPE "public"."post_likes_like_type_enum"`);
    }

}
