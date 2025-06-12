import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BaseIdEntity } from './base.entity';
import { MessageEntity } from './message.entity';
import { AttachmentFileType } from 'src/enum/attachment-file-type.enum';

@Entity('message_attachments')
export class MessageAttachmentEntity extends BaseIdEntity {
  @Column({ name: 'file_url', type: 'text' })
  fileUrl: string;

  @Column({
    name: 'file_type',
    type: 'enum',
    enum: AttachmentFileType,
    nullable: true,
  })
  fileType?: AttachmentFileType;

  @CreateDateColumn({ name: 'uploaded_at', type: 'timestamp' })
  uploadedAt: Date;

  @ManyToOne(() => MessageEntity, (message) => message.attachments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'message_id' })
  message: MessageEntity;
}
