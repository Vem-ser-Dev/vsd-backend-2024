import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ECategoryStatus } from "../../models/ECategoryStatus";
import { SocialService } from "./SocialService";

@Entity()
export class ServiceCategory {
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Column("varchar", {
    length: 50,
    unique: true,
    nullable: true,
  })
  name: string;

  @Column("enum", {
    enum: ECategoryStatus,
    nullable: false,
  })
  status: string;

  @OneToMany(() => SocialService, (project) => project.service_category.uid)
  socialServices: SocialService[];

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
