import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ESocialServiceStatus } from "../../models/ESocialServiceStatus";
import { ServiceCategory } from "./ServiceCategory";

@Entity()
export class SocialService {
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Column("varchar", {
    length: 100,
    unique: true,
    nullable: false,
  })
  service_name: string;

  @ManyToOne(() => ServiceCategory, (category) => category.name, {
    nullable: false,
  })
  service_category: ServiceCategory;

  @Column("varchar", {
    length: 255,
    nullable: false,
  })
  description: string;

  @Column("varchar", {
    length: 80,
    nullable: false,
  })
  agent_name: string;

  @Column("varchar", {
    length: 50,
    nullable: false,
  })
  agent_role?: string;

  @Column("varchar", {
    length: 130,
    nullable: true,
  })
  email?: string;

  @Column("varchar", {
    length: 14,
    nullable: true,
  })
  phone?: string;

  @Column("varchar", {
    length: 255,
    nullable: false,
  })
  website: string;

  @Column("enum", {
    enum: ESocialServiceStatus,
    nullable: false,
  })
  status: string;

  @Column("varchar", {
    length: 100,
    nullable: true,
  })
  organ?: string;

  @Column("varchar", {
    length: 100,
    nullable: true,
  })
  management?: string;

  @Column("varchar", {
    length: 100,
    nullable: true,
  })
  public_unit?: string;

  @Column("varchar", {
    length: 100,
    nullable: true,
  })
  organization?: string;

  @Column("varchar", {
    length: 100,
    nullable: true,
  })
  service_provider?: string;

  @Column("varchar", {
    length: 255,
    nullable: true,
  })
  main_law?: string;

  @Column("varchar", {
    length: 255,
    nullable: true,
  })
  municipal_law?: string;

  @Column("varchar", {
    length: 255,
    nullable: true,
  })
  laws?: string;

  @Column("varchar", {
    length: 255,
    nullable: true,
  })
  naming_of_laws?: string;

  @CreateDateColumn({
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  updated_at: Date;
}
