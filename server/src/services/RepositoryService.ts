import { Service } from '@tsed/common'
import { Connection, EntitySchema, ObjectType, Repository } from 'typeorm'
import { TypeORMService } from '../extensions/typeorm'
import { AfterDBInit } from '../extensions/typeorm/interfaces/AfterDBInit'

@Service()
export class RepositoryService implements AfterDBInit {
	private connection!: Connection

	constructor(private typeORMService: TypeORMService) {}

	$afterDBInit(): void | Promise<any> {
		this.connection = this.typeORMService.get() as Connection
	}

	getRepository<Entity>(target: ObjectType<Entity> | EntitySchema<Entity> | string): Repository<Entity> {
		return this.connection.manager.getRepository(target)
	}
}
