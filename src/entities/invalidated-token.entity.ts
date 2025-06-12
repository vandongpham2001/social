import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('invalidated_tokens')
export class InvalidatedTokenEntity extends BaseEntity {
  @PrimaryColumn({ name: 'id', type: 'text' })
  id: string;

  @Column({ name: 'expiry_time', type: 'timestamp' })
  expiryTime: Date;
}
