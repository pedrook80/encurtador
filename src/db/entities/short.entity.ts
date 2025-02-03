import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('short_urls')
export class ShortUrlEntity {
  // Usaremos o código encurtado como chave primária
  @PrimaryColumn({ length: 6 })
  code: string;

  @Column()
  originalUrl: string;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
