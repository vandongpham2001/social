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

@Entity('user_followers')
export class UserFollowerEntity extends BaseEntity {
  @PrimaryColumn('uuid')
  follower_id: string;

  @PrimaryColumn('uuid')
  following_id: string;

  @ManyToOne(() => UserEntity, (user) => user.following, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'follower_id' })
  follower: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.followers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'following_id' })
  following: UserEntity;

  @CreateDateColumn({ type: 'timestamp' })
  followed_at: Date;

  @Column({ type: 'boolean', default: false })
  is_muted: boolean;

  @Column({ type: 'boolean', default: false })
  is_blocked: boolean;

  @Column({ type: 'boolean', default: false })
  is_request_pending: boolean;
}
