export interface UseCase<T, R> {
  run(params: T): Promise<R> | void;
}
