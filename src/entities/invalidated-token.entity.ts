import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('invalidated_tokens')
export class InvalidatedTokenEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'timestamp' })
  expiryTime: Date;
}
