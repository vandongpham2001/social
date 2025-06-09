import { Column, Entity, OneToMany } from 'typeorm';
import { BaseIdEntity } from './base.entity';
import { PostEntity } from './post.entity';
import { CommentEntity } from './comment.entity';
import { PostLikeEntity } from './post-like.entity';
import { UserFollowerEntity } from './user-follower.entity';
import { NotificationEntity } from './notification.entity';
import { ConversationMemberEntity } from './conversation-member.entity';
import { MessageEntity } from './message.entity';
import { MessageStatusEntity } from './message-status.entity';
import { CommentLikeEntity } from './comment-like.entity';
import { Gender } from 'src/enum/gender.enum';

@Entity('users')
export class UserEntity extends BaseIdEntity {
  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  username: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  first_name: string;

  @Column({ type: 'varchar', length: 100 })
  last_name: string;

  @Column()
  dob: Date;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'text', nullable: true })
  avatar_url: string;

  @Column({ default: false })
  is_verified: boolean;

  @Column({ nullable: true })
  verified_at: Date;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => PostLikeEntity, (like) => like.user)
  post_likes: PostLikeEntity[];

  @OneToMany(() => CommentLikeEntity, (like) => like.user)
  comment_likes: CommentLikeEntity[];

  @OneToMany(() => UserFollowerEntity, (uf) => uf.follower)
  following: UserFollowerEntity[];

  @OneToMany(() => UserFollowerEntity, (uf) => uf.following)
  followers: UserFollowerEntity[];

  @OneToMany(() => NotificationEntity, (notification) => notification.user)
  notifications: NotificationEntity[];

  @OneToMany(() => ConversationMemberEntity, (cm) => cm.user)
  conversations: ConversationMemberEntity[];

  @OneToMany(() => MessageEntity, (message) => message.sender)
  sent_messages: MessageEntity[];

  @OneToMany(() => MessageStatusEntity, (status) => status.user)
  message_statuses: MessageStatusEntity[];
}
