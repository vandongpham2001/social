import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseIdEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';
import { PostLikeEntity } from './post-like.entity';
import { TagEntity } from './tag.entity';
import { PostMediaEntity } from './post-media.entity';

@Entity('posts')
export class PostEntity extends BaseIdEntity {
  @ManyToOne(() => UserEntity, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'text', nullable: true })
  content?: string;

  @Column({ type: 'text', nullable: true })
  image_url?: string;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];

  @OneToMany(() => PostLikeEntity, (like) => like.post)
  likes: PostLikeEntity[];

  @ManyToMany(() => TagEntity, (tag) => tag.posts, { cascade: true })
  @JoinTable({
    name: 'post_tags',
    joinColumn: { name: 'post_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: TagEntity[];

  @OneToMany(() => PostMediaEntity, (media) => media.post)
  media: PostMediaEntity[];
}
