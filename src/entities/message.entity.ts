import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseIdEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { ConversationEntity } from './conversation.entity';
import { MessageStatusEntity } from './message-status.entity';
import { MessageAttachmentEntity } from './message-attachment.entity';
import { MessageType } from 'src/enum/message-type.enum';

@Entity('messages')
export class MessageEntity extends BaseIdEntity {
  @ManyToOne(
    () => ConversationEntity,
    (conversation) => conversation.messages,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'conversation_id' })
  conversation: ConversationEntity;

  @ManyToOne(() => UserEntity, (user) => user.sent_messages, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'sender_id' })
  sender?: UserEntity;

  @Column({ type: 'text', nullable: true })
  content?: string;

  @Column({ type: 'enum', enum: MessageType, default: MessageType.TEXT })
  message_type: MessageType;

  @Column({ type: 'boolean', default: false })
  is_edited: boolean;

  @OneToMany(() => MessageStatusEntity, (status) => status.message)
  statuses: MessageStatusEntity[];

  @OneToMany(() => MessageAttachmentEntity, (attachment) => attachment.message)
  attachments: MessageAttachmentEntity[];
}
