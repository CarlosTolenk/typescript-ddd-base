import { HttpErrorBase } from '../../../Shared/domain/expcetion/HttpError';
import httpStatus from 'http-status';

export class OrderStatisticNotExist extends HttpErrorBase {
  constructor(details: string, constructorName: string) {
    super(details, httpStatus.NOT_FOUND, 'OrderStatisticFinder', constructorName, 'run', 2000);
  }
}
