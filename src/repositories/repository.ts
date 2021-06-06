import { injectable } from 'tsyringe';
import { Collection, FilterQuery, ObjectID } from 'mongodb';
import IRepository, { Select, Sort } from './interfaces/repositoryInterface';
import database from './database';

/**
 * Note that none of the crud functions have been tested yet
 * May need to rewrite this.
 */
@injectable()
export default class Repository<T> implements IRepository<T> {
  private readonly collection: Collection;

  constructor(collection: string) {
    this.collection = database.getCollection(collection);
  }

  public async get(id: ObjectID, select: Select = {}): Promise<T> {
    const collection: Collection = this.collection;

    const doc: T = await collection.findOne<T>({ _id: id }, select);

    return doc;
  }

  public async find(
    filter: FilterQuery<Partial<T>> = {},
    select?: Select,
    sort?: Sort
  ): Promise<T[]> {
    const collection = this.collection;
    const query = collection.find<T>(filter, select);

    if (sort) {
      query.sort(sort);
    }

    const docs = await query.toArray();

    return docs;
  }

  public async create(data: Partial<T>): Promise<T> {
    if (!data) {
      throw new Error('Empty object provided');
    }

    const collection = this.collection;
    const doc = (await collection.insertOne(data)).ops[0] as T;

    return doc;
  }

  public async updateById(ids: ObjectID | ObjectID[], data: Partial<T>) {
    let objectIds = [];

    if (Array.isArray(ids)) {
      objectIds = ids.map((id) => id);
    } else {
      objectIds = [ids as ObjectID];
    }

    const collection = this.collection;
    await collection.update({ _id: { $in: objectIds } }, data);
  }

  public async remove(filter: FilterQuery<T>, multi: boolean): Promise<void> {
    const collection = this.collection;
    if (multi) {
      await collection.deleteMany(filter);
    } else {
      await collection.deleteOne(filter);
    }
  }

  public async removeById(ids: ObjectID | ObjectID[]): Promise<void> {
    let objectIds = [];

    if (Array.isArray(ids)) {
      objectIds = ids.map((id) => id);
    } else {
      objectIds = [ids as ObjectID];
    }

    const collection = this.collection;
    await collection.deleteMany({ _id: { $in: objectIds } });
  }

  public getCollection(): Collection {
    return this.collection;
  }
}
