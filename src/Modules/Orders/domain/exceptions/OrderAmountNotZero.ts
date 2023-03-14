import { HttpErrorBase } from '../../../Shared/domain/expcetion/HttpError';
import httpStatus from 'http-status';

export class OrderAmountNotZero extends HttpErrorBase {
  constructor(details: string, constructorName: string) {
    super(details, httpStatus.BAD_REQUEST, 'ValueObject', constructorName, 'ensureAmountLess0Amount', 1000);
  }
}
