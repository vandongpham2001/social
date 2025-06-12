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
  @PrimaryColumn({ name: 'follower_id', type: 'uuid' })
  followerId: string;

  @PrimaryColumn({ name: 'following_id', type: 'uuid' })
  followingId: string;

  @CreateDateColumn({ name: 'followed_at', type: 'timestamp' })
  followedAt: Date;

  @Column({ name: 'is_muted', type: 'boolean', default: false })
  isMuted: boolean;

  @Column({ name: 'is_blocked', type: 'boolean', default: false })
  isBlocked: boolean;

  @Column({ name: 'is_request_pending', type: 'boolean', default: false })
  isRequestPending: boolean;

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
}
