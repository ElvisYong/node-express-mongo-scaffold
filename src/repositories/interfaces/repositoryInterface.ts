/* *
  This interface should be changed for our own use case as I've just scaffolded from
  https://github.com/shihabmridha/nodejs-repository-pattern-and-ioc/blob/master/src/repositories/repository.ts
*/
import { Collection, FilterQuery, ObjectID } from 'mongodb';

/**
 * Fields you want to select. For mongodb it is a key-value pair.
 * Key is the name of the field and Value is 0 (exclude) or 1 (include).
 * Example: { username: 1, email: 1 } (Select only username and email)
 */
export interface Select {
  [key: string]: 1 | 0;
}

/**
 * Fields you want to order by. For mongodb it is a key-value pair.
 * Key is the name of the field and Value is 1 (ascending) or -1 (descending).
 * Example: { username: 1 } (Sort result by username in ascending order)
 */
export interface Sort {
  [key: string]: 1 | -1;
}

export default interface RepositoryInterface<T> {
  /**
   * Receives an ID and fetch data from database by an objectID
   * @param Id of the document
   * @param select field to project properties. This is optional.
   */
  get(id: ObjectID, select?: Select): Promise<T>;

  /**
   * Get documents from collection.
   *
   * @param filter Filter query
   * @param page Current page number
   * @param [select] Fields to select
   * @param [sort] Sort order
   *
   * @returns Array of documents
   */
  find(filter: FilterQuery<T>, select?: Select, sort?: Sort): Promise<T[]>;

  /**
   * Insert one item in the collection.
   *
   * @param data Object that you want to store
   */
  create(data: Partial<T>): Promise<T>;

  // Insert many items into the collection
  // createMany(data: Partial<T[]>): Promise<T[]>;

  // update(
  //   filter: FilterQuery<T>,
  //   data: Partial<T>,
  //   multi: boolean
  // ): Promise<void>;

  updateById(ids: ObjectID | ObjectID[], data: Partial<T>): Promise<void>;

  /**
   * It finds all the matching documents by the given filter and removes them.
   *
   * @param filter FilterQuery
   */
  remove(filter: FilterQuery<T>, multi: boolean): Promise<void>;

  /**
   * Remove documents from database by given IDs. This method receives one or more
   * IDs. Checks if the IDs are valid and proceed to delete.
   *
   * @param ids ObjectID | ObjectID[]
   */
  removeById(id: ObjectID | ObjectID[]): Promise<void>;

  /**
   * Get the collection instance of the repository.
   *
   * @returns MongoDB collection instance
   */
  getCollection(): Collection;
}
