import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { MessageEntity } from './message.entity';
import { UserEntity } from './user.entity';

@Entity('message_statuses')
export class MessageStatusEntity extends BaseEntity {
  @PrimaryColumn('uuid')
  message_id: string;

  @PrimaryColumn('uuid')
  user_id: string;

  @ManyToOne(() => MessageEntity, (message) => message.statuses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'message_id' })
  message: MessageEntity;

  @ManyToOne(() => UserEntity, (user) => user.message_statuses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'boolean', default: false })
  is_read: boolean;

  @Column({ type: 'timestamp', nullable: true })
  read_at?: Date;
}
