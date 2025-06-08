import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  BaseEntity as TypeORMBaseEntity,
} from 'typeorm';

export abstract class BaseEntity extends TypeORMBaseEntity {
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deleted_at?: Date;

  @Column({ name: 'created_by', nullable: true })
  created_by?: string;

  @Column({ name: 'updated_by', nullable: true })
  updated_by?: string;

  @Column({ name: 'deleted_by', nullable: true })
  deleted_by?: string;

  @Column({ name: 'is_deleted', default: false })
  is_deleted: boolean;
}

export abstract class BaseIdEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
