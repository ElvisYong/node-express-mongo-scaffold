import { MongoClient, Db, Collection } from 'mongodb';
import config from '../config';
import Logger from '../loaders/logger';

// This will do all the connection related stuff.
class Database {
  private connectionUri: string;
  private dbClient: MongoClient;
  private databaseInstance: Db;

  constructor() {
    this.connectionUri = config.databaseURL;
  }

  public async connect(): Promise<void> {
    if (this.dbClient) {
      Logger.error('Connection already exists');
    }

    const client = new MongoClient(this.connectionUri, {
      useUnifiedTopology: true,
    });
    this.dbClient = await client.connect();
    this.databaseInstance = this.dbClient.db('LunchieM0');
    Logger.info('database connected');
  }

  public async disconnect() {
    if (this.dbClient.isConnected()) {
      await this.dbClient.close();
    }
  }

  public isDbConnected() {
    return this.dbClient && this.dbClient.isConnected();
  }

  /**
   * For MongoDB there is no table. It is called collection
   * If you are using SQL database then this should be something like getTable()
   *
   * @param name MongoDB Collection name
   */
  public getCollection(name: string): Collection {
    if (!this.databaseInstance) {
      throw new Error('Database not initialized');
    }

    return this.databaseInstance.collection(name);
  }
}

const db = new Database();

export default db;
