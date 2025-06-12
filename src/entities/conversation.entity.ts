import { Column, Entity, OneToMany } from 'typeorm';
import { BaseIdEntity } from './base.entity';
import { ConversationMemberEntity } from './conversation-member.entity';
import { MessageEntity } from './message.entity';

@Entity('conversations')
export class ConversationEntity extends BaseIdEntity {
  @Column({ name: 'name', type: 'varchar', length: 100, nullable: true })
  name?: string;

  @Column({ name: 'is_group', type: 'boolean', default: false })
  isGroup: boolean;

  @OneToMany(() => ConversationMemberEntity, (member) => member.conversation)
  members: ConversationMemberEntity[];

  @OneToMany(() => MessageEntity, (message) => message.conversation)
  messages: MessageEntity[];
}
