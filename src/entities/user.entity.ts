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
  @Column({ name: 'username', type: 'varchar', length: 50, unique: true, nullable: true })
  username: string;

  @Column({ name: 'email', type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ name: 'password', type: 'text' })
  password: string;

  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  lastName: string;

  @Column({ name: 'dob', type: 'date'})
  dob: Date;

  @Column({ name: 'gender', type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ name: 'bio', type: 'text', nullable: true })
  bio: string;

  @Column({ name: 'avatar_url', type: 'text', nullable: true })
  avatarUrl: string;

  @Column({ name: 'is_verified', default: false })
  isVerified: boolean;

  @Column({ name: 'verified_at', type: 'timestamp', nullable: true })
  verifiedAt: Date;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => PostLikeEntity, (like) => like.user)
  postLikes: PostLikeEntity[];

  @OneToMany(() => CommentLikeEntity, (like) => like.user)
  commentLikes: CommentLikeEntity[];

  @OneToMany(() => UserFollowerEntity, (uf) => uf.follower)
  following: UserFollowerEntity[];

  @OneToMany(() => UserFollowerEntity, (uf) => uf.following)
  followers: UserFollowerEntity[];

  @OneToMany(() => NotificationEntity, (notification) => notification.user)
  notifications: NotificationEntity[];

  @OneToMany(() => ConversationMemberEntity, (cm) => cm.user)
  conversations: ConversationMemberEntity[];

  @OneToMany(() => MessageEntity, (message) => message.sender)
  sentMessages: MessageEntity[];

  @OneToMany(() => MessageStatusEntity, (status) => status.user)
  messageStatuses: MessageStatusEntity[];
}
