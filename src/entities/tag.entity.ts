import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseIdEntity } from './base.entity';
import { PostEntity } from './post.entity';

@Entity('tags')
export class TagEntity extends BaseIdEntity {
  @Column({ name: 'name', type: 'varchar', length: 50, unique: true })
  name: string;

  @ManyToMany(() => PostEntity, (post) => post.tags)
  posts: PostEntity[];
}
