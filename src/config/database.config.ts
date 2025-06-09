import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { CommentLikeEntity } from 'src/entities/comment-like.entity';
import { CommentMediaEntity } from 'src/entities/comment-media.entity';
import { CommentEntity } from 'src/entities/comment.entity';
import { ConversationMemberEntity } from 'src/entities/conversation-member.entity';
import { ConversationEntity } from 'src/entities/conversation.entity';
import { InvalidatedTokenEntity } from 'src/entities/invalidated-token.entity';
import { MessageAttachmentEntity } from 'src/entities/message-attachment.entity';
import { MessageStatusEntity } from 'src/entities/message-status.entity';
import { MessageEntity } from 'src/entities/message.entity';
import { NotificationEntity } from 'src/entities/notification.entity';
import { PostLikeEntity } from 'src/entities/post-like.entity';
import { PostMediaEntity } from 'src/entities/post-media.entity';
import { PostEntity } from 'src/entities/post.entity';
import { TagEntity } from 'src/entities/tag.entity';
import { UserFollowerEntity } from 'src/entities/user-follower.entity';
import { UserRefreshTokenEntity } from 'src/entities/user-refresh-token.entity';
import { UserEntity } from 'src/entities/user.entity';

config();

export const dataSourceOption: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    CommentLikeEntity,
    CommentMediaEntity,
    CommentEntity,
    ConversationMemberEntity,
    ConversationEntity,
    InvalidatedTokenEntity,
    MessageAttachmentEntity,
    MessageStatusEntity,
    MessageEntity,
    NotificationEntity,
    PostLikeEntity,
    PostMediaEntity,
    PostEntity,
    TagEntity,
    UserFollowerEntity,
    UserRefreshTokenEntity,
    UserEntity,
  ],
  synchronize: false,
  migrations: [__dirname + '/../database/migrations/*-migration.{ts,js}'],
};

const AppDataSource = new DataSource(dataSourceOption);

export default AppDataSource;
