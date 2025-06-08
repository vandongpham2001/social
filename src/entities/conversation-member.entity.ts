import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { ConversationEntity } from './conversation.entity';

@Entity('conversation_members')
export class ConversationMemberEntity extends BaseEntity {
  @PrimaryColumn('uuid')
  conversation_id: string;

  @PrimaryColumn('uuid')
  user_id: string;

  @ManyToOne(() => ConversationEntity, (conversation) => conversation.members, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'conversation_id' })
  conversation: ConversationEntity;

  @ManyToOne(() => UserEntity, (user) => user.conversations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @CreateDateColumn({ type: 'timestamp' })
  joined_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_read_at?: Date;
}
