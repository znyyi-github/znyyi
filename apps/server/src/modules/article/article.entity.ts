import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('article')
export class ArticleEntity {
  @ObjectIdColumn()
  _id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  des: string;

  @Column({ type: 'string' })
  author: string; // 存储作者ID

  @Column({ type: 'bigint' })
  date: number; // 时间戳

  @Column({ type: 'varchar' })
  md: string; // 存储.md文件路径

  @Column({ type: 'int', default: 0 })
  pv: number;
}
