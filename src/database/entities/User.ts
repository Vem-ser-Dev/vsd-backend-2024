import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  uid!: string;

  @Column("varchar", {
    length: 255,
  })
  full_name!: string;

  @Column("varchar", {
    length: 255,
  })
  email!: string;

  @Column("varchar", {
    length: 50,
  })
  document!: string;

  @Column("varchar", {
    length: 255,
  })
  password!: string;

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
