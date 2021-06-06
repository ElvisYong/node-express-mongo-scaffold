import { injectable } from 'tsyringe';
import Repository from './repository';

// Just an example test repo for future reference

/**
 * The schema definition. In other word,
 * A Document of the test collection contains following fields.
 */
export interface TestDocument {
  id: string;
  username: string;
  email: string;
}

@injectable()
export default class TestRepository extends Repository<TestDocument> {
  constructor() {
    super('test'); // Pass in collection name
  }
}
