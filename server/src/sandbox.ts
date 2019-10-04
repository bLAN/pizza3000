import { createConnection } from 'typeorm'
import { typeorm } from './TypeOrm'
import { Item } from './entities/Item'
import { Order } from './entities/Order'
import { ItemWithAvailability } from './entities/ItemWithAvailability'

async function func () {
	const connection = await createConnection(typeorm)

	const qb = connection.createEntityManager()

	const items = await qb.findOne(ItemWithAvailability)
}

func()
