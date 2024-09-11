import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'johndoe', description: 'The username of the user' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @Column()
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email of the user',
  })
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ApiProperty({
    example: 'person',
    description: 'The type of user (person or restaurant)',
  })
  @Column({
    type: 'enum',
    enum: ['person', 'restaurant'],
    default: 'person',
  })
  type: 'person' | 'restaurant';

  @ApiProperty({
    example: '12345678901',
    description: 'The CPF of the person (if type is person)',
  })
  @Column({ nullable: true })
  cpf: string;

  @ApiProperty({
    example: '12345678901234',
    description: 'The CNPJ of the restaurant (if type is restaurant)',
  })
  @Column({ nullable: true })
  cnpj: string;

  @ApiProperty({
    example: '123 Main St, City, State',
    description: 'The address of the restaurant (if type is restaurant)',
  })
  @Column({ nullable: true })
  address: string;

  @ApiProperty({
    example: 'Italian',
    description: 'The cuisine type of the restaurant (if type is restaurant)',
  })
  @Column({ nullable: true })
  cuisine: string;
}

export class Person extends User {
  name: string;
  cpf: string;
}

export class Restaurant extends User {
  name: string;
  cnpj: string;
  address: string;
  cuisine: string;
}
