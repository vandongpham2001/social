import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseIdEntity } from './base.entity';
import { PostEntity } from './post.entity';
import { UserEntity } from './user.entity';
import { CommentLikeEntity } from './comment-like.entity';
import { CommentMediaEntity } from './comment-media.entity';

@Entity('comments')
export class CommentEntity extends BaseIdEntity {
  @Column({ name: 'content', type: 'text' })
  content: string;

  @ManyToOne(() => PostEntity, (post) => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => CommentLikeEntity, (like) => like.comment)
  likes: CommentLikeEntity[];

  @OneToMany(() => CommentMediaEntity, (media) => media.comment)
  media: CommentMediaEntity[];
}
