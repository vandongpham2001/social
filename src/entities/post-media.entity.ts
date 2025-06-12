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
  @Column({ name: 'media_url', type: 'text' })
  mediaUrl: string;

  @Column({
    name: 'media_type',
    type: 'enum',
    enum: MediaType,
    default: MediaType.IMAGE,
  })
  mediaType: MediaType;

  @Column({ name: 'thumbnail_url', type: 'text', nullable: true })
  thumbnailUrl?: string;

  @Column({ name: 'duration', type: 'int', nullable: true })
  duration?: number;

  @CreateDateColumn({ name: 'uploaded_at', type: 'timestamp' })
  uploadedAt: Date;

  @ManyToOne(() => PostEntity, (post) => post.media, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;
}
