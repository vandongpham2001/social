import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseIdEntity } from './base.entity';
import { PostEntity } from './post.entity';
import { UserEntity } from './user.entity';
import { ReactionType } from 'src/enum/reaction-type.enum';

@Entity('post_likes')
export class PostLikeEntity extends BaseIdEntity {
  @ManyToOne(() => PostEntity, (post) => post.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  @ManyToOne(() => UserEntity, (user) => user.post_likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'enum', enum: ReactionType, default: ReactionType.LIKE })
  like_type: ReactionType;
}
