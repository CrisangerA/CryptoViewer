import {
  SQLiteDatabase,
  openDatabase,
  enablePromise,
} from 'react-native-sqlite-storage';

export default class SQLiteRepository {
  private db: SQLiteDatabase | null = null;
  private GetConnection() {
    if (this.db) {
      return this.db;
    }
    throw new Error('Database unresolved');
  }
  private initialize(db: SQLiteDatabase) {
    function createTableOrders() {
      db.executeSql(
        `CREATE TABLE IF NOT EXISTS ORDERS (
          id VARCHAR(50) NOT NULL,
          coin VARCHAR(10) NOT NULL,
          priceCoin REAL NOT NULL,
          valueMoney REAL NOT NULL,
          quantity INTEGER NOT NULL,
          type VARCHAR(6) NOT NULL,
          date TEXT
        );`,
      );
    }
    createTableOrders();
  }

  constructor() {
    enablePromise(true);
    openDatabase({
      name: 'CryptoViewer.db',
      location: 'default',
    }).then(db => {
      this.db = db;
      this.initialize(this.db);
    });
  }

  Read<T>(query: string, args: any[] = []) {
    return new Promise<T>((resolve, reject) => {
      this.GetConnection().transaction(
        tx => {
          tx.executeSql(
            query,
            args,
            (_, results) => {
              resolve(results.rows.raw() as T);
            },
            (__, e) => reject(e),
          );
        },
        e => reject(e),
        _ => {},
      );
    });
  }
  Write<T>(query: string, args: any[] = []) {
    return new Promise<T>((resolve, reject) => {
      this.GetConnection().transaction(
        tx => {
          tx.executeSql(
            query,
            args,
            (_, results) => {
              if (query.includes('DELETE FROM')) {
                resolve(results.rowsAffected as T);
              }
              resolve(results.rows.raw() as T);
            },
            (__, e) => reject(e),
          );
        },
        e => reject(e),
        _ => {},
      );
    });
  }
}
