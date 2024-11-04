import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { EProjectStatus } from "../../models/EProjectStatus";

@Entity()
export class SocialProject {
  @PrimaryGeneratedColumn("uuid")
  uid!: string;

  @Column("varchar", {
    length: 100,
    unique: true,
    nullable: false,
  })
  project_name!: string;

  @Column("varchar", {
    length: 80,
    nullable: false,
  })
  classification!: string;

  @Column("varchar", {
    length: 255,
    nullable: false,
  })
  description!: string;

  @Column("varchar", {
    length: 80,
    nullable: false,
  })
  agent_name!: string;

  @Column("varchar", {
    length: 50,
    nullable: false,
  })
  agent_role!: string;

  @Column("varchar", {
    length: 130,
    nullable: true,
  })
  email!: string;

  @Column("varchar", {
    length: 14,
    nullable: true,
  })
  phone!: string;

  @Column("varchar", {
    length: 100,
    nullable: true,
  })
  website!: string;

  @Column("enum", {
    enum: EProjectStatus,
    nullable: false,
  })
  status!: string;

  @CreateDateColumn({
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  updated_at!: Date;
}
