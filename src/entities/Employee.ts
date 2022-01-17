import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Employee extends BaseEntity {
  @PrimaryColumn("varchar", { length: 20 })
  employee!: string;

  @Column("varchar", { length: 100 })
  firstName: string;

  @Column("varchar", { length: 50 })
  lastName: string;

  @Column("varchar", { length: 111 })
  employeeName: string;

  @Column("varchar", { length: 20 })
  manager: string;
}
