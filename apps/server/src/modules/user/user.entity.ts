import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('login')
export class UserEntity {
  @ObjectIdColumn()
  uid: string;
  @Column({ type: 'varchar', length: 50 })
  user: string;
  @Column({ type: 'varchar', length: 16 })
  pwd: string;
  @Column({ type: 'string' })
  photo: string;
}
