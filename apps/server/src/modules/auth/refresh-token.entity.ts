import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('refresh_token')
export class RefreshTokenEntity {
  @ObjectIdColumn()
  _id: string;
  @Column({ type: 'varchar', length: 64 })
  refresh_token: string;
  @Column({ type: 'varchar', length: 50 })
  user: string;
  @Column({ type: 'int64' })
  exp: number;
}
