import { Column, Entity } from 'typeorm';
import { BaseIdEntity } from './base.entity';

@Entity('refresh_tokens')
export class UserRefreshTokenEntity extends BaseIdEntity {
  @Column({ unique: true })
  hashed_token: string;

  @Column()
  expired_at: Date;

  @Column()
  email: string;
}
