import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Colis {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  destinataire: string;

  @Field()
  @Column()
  adresse: string;

  @Field()
  @Column()
  statut: string;

  @Field()
  @Column()
  expediteur: string;

  @Field()
  @Column()
  dateExpedition: Date;

  @Field()
  @Column()
  numeroSuivi: string;

  @Field()
  @Column('decimal', { precision: 10, scale: 2 })
  poids: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dateEstimeeLivraison?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  commentaire?: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column('decimal', { precision: 10, scale: 2 })
  valeurDeclaree: number;
}
