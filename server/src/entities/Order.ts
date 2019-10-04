import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { OrderStage } from './OrderStage'
import { Item } from './Item'

@Entity()
export class Order {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Column()
	customerName!: string

	@Column('enum', { enum: OrderStage, default: OrderStage.Ordered })
	status!: OrderStage

	@ManyToOne(type => Item, { eager: true })
	item!: Item

	@CreateDateColumn()
	createdAt!: Date
}