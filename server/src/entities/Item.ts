import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Item {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Column({ unique: true })
	name!: string

	@Column({ type: 'int' })
	quantity!: number
}