import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class ProjectsTeam extends BaseEntity {
  @PrimaryColumn("varchar", { length: 30 })
  number: string = "123456";

  @Column("varchar", { length: 11 })
  team: string = "Design Lead";

  @Column("varchar")
  practice: string = "STRU";

  @Column("varchar")
  employee: string = "12345";
}
