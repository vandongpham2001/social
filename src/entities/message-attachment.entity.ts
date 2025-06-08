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
  @ManyToOne(() => MessageEntity, (message) => message.attachments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'message_id' })
  message: MessageEntity;

  @Column({ type: 'text' })
  file_url: string;

  @Column({
    type: 'enum',
    enum: AttachmentFileType,
    nullable: true,
  })
  file_type?: AttachmentFileType;

  @CreateDateColumn({ type: 'timestamp' })
  uploaded_at: Date;
}
