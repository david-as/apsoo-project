import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserType {
  PERSON = 'PERSON',
  RESTAURANT = 'RESTAURANT',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserType,
  })
  type: UserType;

  @Column({ nullable: true })
  cpf: string;

  @Column({ nullable: true })
  cnpj: string;
}
