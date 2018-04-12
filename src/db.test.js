const {
  dbConnect,
  saveDependency,
  getDependencies,
  deleteDependency,
  COLLECTION_NAME,
} = require('./db');

const MongoClient = require('mongodb').MongoClient;

const MOCK_COLLECTION = [
  { _id: 'react', version: '16.2.1' },
  { _id: 'react-dom', version: 'latest' },
  { _id: 'recompose', version: '6.5.4' },
];

describe('db', () => {
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__);
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  beforeEach(async () => {
    await db.collection(COLLECTION_NAME).insertMany(MOCK_COLLECTION);
  });

  afterEach(async () => {
    await db.collection(COLLECTION_NAME).remove();
  });

  describe('saveDependency', () => {
    it('should resolve with the record', async () => {
      const record = { _id: 'react', version: '16.3.0' };
      const resolved = await saveDependency(record)(db);

      expect(resolved).toEqual(record);
    });

    it('should add the record to the db', async () => {
      const record = { _id: 'angular', version: '2.0.0' };
      await saveDependency(record)(db);
      const dbEntry = await db
        .collection(COLLECTION_NAME)
        .find({})
        .toArray();

      expect(dbEntry).toEqual([...MOCK_COLLECTION, record]);
    });
  });

  describe('getDependencies', () => {
    it('returns all the records', async () => {
      const resolved = await getDependencies()(db);
      expect(resolved).toEqual(MOCK_COLLECTION);
    });

    it('returns a single dependency', async () => {
      const resolved = await getDependencies(MOCK_COLLECTION[0])(db);
      expect(resolved).toEqual([MOCK_COLLECTION[0]]);
    });
  });

  describe('deleteDependency', () => {
    it('removes a record', async () => {
      await deleteDependency(MOCK_COLLECTION[0])(db);
      const records = await db
        .collection(COLLECTION_NAME)
        .find({})
        .toArray();
      expect(records).toEqual(MOCK_COLLECTION.slice(1));
    });
  });
});
