import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { MessageEntity } from './message.entity';
import { UserEntity } from './user.entity';

@Entity('message_statuses')
export class MessageStatusEntity extends BaseEntity {
  @PrimaryColumn({ name: 'message_id', type: 'uuid' })
  messageId: string;

  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'is_read', type: 'boolean', default: false })
  isRead: boolean;
  
  @Column({ name: 'read_at', type: 'timestamp', nullable: true })
  readAt?: Date;
  
  @ManyToOne(() => MessageEntity, (message) => message.statuses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'message_id' })
  message: MessageEntity;

  @ManyToOne(() => UserEntity, (user) => user.messageStatuses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
