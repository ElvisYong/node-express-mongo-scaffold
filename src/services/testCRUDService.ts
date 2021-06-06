import { injectable } from 'tsyringe';
import TestRepository from '../repositories/testRepository';

// Just an example service for future reference
@injectable()
export default class TestCRUDService {
  constructor(private testRepository: TestRepository) {}

  public async create(data): Promise<boolean> {
    const result = await this.testRepository.create(data);

    if (result !== null) {
      return true;
    }
    return false;
  }
}
