import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Users } from "./Users"

@Entity("Situations")
export class Situations {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ unique: true })
    nameSituation!: string

    @OneToMany(() => Users, (user) => user.situation)
    users!: Users[]

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date
}