import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Project extends BaseEntity {
  @PrimaryColumn("varchar", { length: 30 })
  projectNumber!: string;

  @Column("varchar", { length: 9 })
  family: string;

  @Column("varchar", { length: 40 })
  name: string;

  @Column("varchar", { length: 11 })
  stage!: string;

  @Column("varchar", { length: 50 })
  sector: string;

  @Column("varchar", { length: 50 })
  superSector: string;

  @Column("varchar", { length: 255 })
  contractType: string;

  @Column("varchar", { length: 7 })
  constructionValue!: string;

  @Column("varchar", { length: 32 })
  ownerClient: string;

  @Column("varchar", { length: 32 })
  billingClient: string;

  @Column("varchar", { length: 20 })
  projectManager: string;

  @Column("datetime")
  designStart: Date;

  @Column("datetime")
  designEnd: Date;

  @Column("datetime")
  constructionStart: Date;

  @Column("datetime")
  constructionEnd: Date;
}
