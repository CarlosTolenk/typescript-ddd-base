import httpStatus from 'http-status';

import { HttpErrorBase } from '../../../Shared/domain/expcetion/HttpError';

export class OrderDescriptionLengthExceeded extends HttpErrorBase {
	constructor(details: string, constructorName: string) {
		super(
			details,
			httpStatus.BAD_REQUEST,
			'ValueObject',
			constructorName,
			'ensureLengthIsLessThan30Characters',
			1100
		);
	}
}
