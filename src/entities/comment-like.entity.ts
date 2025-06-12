import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseIdEntity } from './base.entity';
import { CommentEntity } from './comment.entity';
import { UserEntity } from './user.entity';
import { ReactionType } from 'src/enum/reaction-type.enum';

@Entity('comment_likes')
export class CommentLikeEntity extends BaseIdEntity {
  @Column({ name: 'like_type', type: 'enum', enum: ReactionType, default: ReactionType.LIKE })
  likeType: ReactionType;

  @ManyToOne(() => CommentEntity, (comment) => comment.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'comment_id' })
  comment: CommentEntity;

  @ManyToOne(() => UserEntity, (user) => user.commentLikes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
