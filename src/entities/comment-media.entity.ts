import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BaseIdEntity } from './base.entity';
import { CommentEntity } from './comment.entity';
import { MediaType } from 'src/enum/media-type.enum';

@Entity('comment_media')
export class CommentMediaEntity extends BaseIdEntity {
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

  @ManyToOne(() => CommentEntity, (comment) => comment.media, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'comment_id' })
  comment: CommentEntity;
}
