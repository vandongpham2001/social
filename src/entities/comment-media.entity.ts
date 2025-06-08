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
  @ManyToOne(() => CommentEntity, (comment) => comment.media, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'comment_id' })
  comment: CommentEntity;

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
