import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseIdEntity } from './base.entity';
import { CommentEntity } from './comment.entity';
import { UserEntity } from './user.entity';
import { ReactionType } from 'src/enum/reaction-type.enum';

@Entity('comment_likes')
export class CommentLikeEntity extends BaseIdEntity {
  @Column({ type: 'enum', enum: ReactionType, default: ReactionType.LIKE })
  like_type: ReactionType;

  @ManyToOne(() => CommentEntity, (comment) => comment.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'comment_id' })
  comment: CommentEntity;

  @ManyToOne(() => UserEntity, (user) => user.comment_likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
