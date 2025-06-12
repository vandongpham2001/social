import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseIdEntity } from './base.entity';
import { PostEntity } from './post.entity';
import { UserEntity } from './user.entity';
import { ReactionType } from 'src/enum/reaction-type.enum';

@Entity('post_likes')
export class PostLikeEntity extends BaseIdEntity {
  @Column({ name: 'like_type', type: 'enum', enum: ReactionType, default: ReactionType.LIKE })
  likeType: ReactionType;
  
  @ManyToOne(() => PostEntity, (post) => post.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  @ManyToOne(() => UserEntity, (user) => user.postLikes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
