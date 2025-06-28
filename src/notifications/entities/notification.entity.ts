import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Colis } from '../../colis/entities/colis.entity';

@ObjectType()
@Entity()
export class Notification {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field()
  @Column()
  colisId: string;

  @ManyToOne(() => Colis)
  @JoinColumn({ name: 'colisId' })
  colis: Colis;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  message: string;

  @Field()
  @CreateDateColumn()
  dateCreation: Date;

  @Field()
  @Column({ default: false })
  lu: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dateLecture?: Date;
}