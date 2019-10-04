import { Constant, InjectorService, OnDestroy, OnInit, Service } from '@tsed/common'
import { ConnectionOptions } from 'typeorm'
import { TypeORMService } from './services/TypeORMService'

@Service()
export class TypeORMModule implements OnInit, OnDestroy {
	@Constant('typeorm', {})
	private settings!: {[key: string]: ConnectionOptions};

	constructor(private typeORMService: TypeORMService, private injectorService: InjectorService) {}

	async $onInit(): Promise<any> {
		const promises = Object.keys(this.settings).map(key => this.typeORMService.createConnection(key, this.settings[key]))

		const result = await Promise.all(promises)

		if (result.length > 0) {
			await this.injectorService.emit('$afterDBInit')
		}
		return result
	}

	$onDestroy(): Promise<any> | void {
		return this.typeORMService.closeConnections()
	}
}
