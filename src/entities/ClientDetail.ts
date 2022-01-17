import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class ClientDetail extends BaseEntity {
  @PrimaryColumn("varchar", { length: 32 })
  clientKey!: string;

  @Column("varchar", { length: 100 })
  name: string;

  @Column("decimal", { precision: 38, scale: 4 })
  ownerClientRevenue: string;

  @Column("decimal", { precision: 38, scale: 4 })
  billingClientRevenue: string;
}
