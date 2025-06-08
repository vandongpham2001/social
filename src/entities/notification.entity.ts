import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseIdEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { NotificationType } from 'src/enum/notification-type.enum';
import { PostEntity } from './post.entity';
import { CommentEntity } from './comment.entity';

@Entity('notifications')
export class NotificationEntity extends BaseIdEntity {
  @ManyToOne(() => UserEntity, (user) => user.notifications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({
    type: 'enum',
    enum: NotificationType,
    default: NotificationType.SYSTEM,
  })
  type: NotificationType;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({ type: 'boolean', default: false })
  is_read: boolean;

  @Column({ type: 'timestamp', nullable: true })
  read_at?: Date;

  @ManyToOne(() => PostEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'related_post_id' })
  relatedPost?: PostEntity;

  @ManyToOne(() => CommentEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'comment_id' })
  comment?: CommentEntity;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'follower_id' })
  follower?: UserEntity;
}
