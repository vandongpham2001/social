import { Column, Entity } from 'typeorm';
import { BaseIdEntity } from './base.entity';

@Entity('refresh_tokens')
export class UserRefreshTokenEntity extends BaseIdEntity {
  @Column({ name: 'hashed_token', unique: true })
  hashedToken: string;

  @Column({ name: 'expired_at', type: 'timestamp' })
  expiredAt: Date;

  @Column({ name: 'email', type: 'varchar' })
  email: string;
}
