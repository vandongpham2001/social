import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BaseIdEntity } from './base.entity';
import { PostEntity } from './post.entity';
import { MediaType } from 'src/enum/media-type.enum';

@Entity('post_media')
export class PostMediaEntity extends BaseIdEntity {
  @ManyToOne(() => PostEntity, (post) => post.media, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  @Column({ type: 'text' })
  media_url: string;

  @Column({
    type: 'enum',
    enum: MediaType,
    default: MediaType.IMAGE,
  })
  media_type: MediaType;

  @Column({ type: 'text', nullable: true })
  thumbnail_url?: string;

  @Column({ type: 'int', nullable: true })
  duration?: number;

  @CreateDateColumn({ type: 'timestamp' })
  uploaded_at: Date;
}
