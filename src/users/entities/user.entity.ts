import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  nom: string;

  @Field()
  @Column()
  prenom: string;

  @Field()
  @Column()
  telephone: string;

  @Field()
  @Column()
  adresse: string;

  @Field()
  @Column()
  role: string;

  @Field()
  @CreateDateColumn()
  dateInscription: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  password?: string;
}