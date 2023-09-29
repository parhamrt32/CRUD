const Controller = require("./Controller");
const View = require("./View");
const Model = require("./Model");
const Record = require("./Record");

/**
 * Test suite for the CRUD Functionality'.
 * @test {CRUD Functionality'}
 */
describe("CRUD Functionality'", () => {
  let model;
  let controller;
  let view;

  /**
   * Set up the necessary components before each test case.
   */
  beforeEach( async  () => {
    model = new Model();
    await model.readData(); // Read initial data from the database
  });


  /**
   *  Clear the data after each test to ensure a clean state
   */
  afterEach(() => {
   
    model.clearData();
  })

  /**
   * Test case: Adding a row.
   * @test {Adding a row}
   */
  test('Add a new row to the records', async () => {
    // Create a sample data object to add to the records

    const initialRecords = model.getRecords();
    const initialRecordCount = initialRecords.size;


    const newRecord = {
      REF_DATE: '2023-07-21',
      GEO: 'Canada',
      DGUID: '12345',
      TypeOfProduct: 'Product A',
      TypeOfStorage: 'Storage Type A',
      UOM: 'Unit A',
      UOM_ID: 1,
      SCALAR_FACTOR: 'Factor A',
      SCALAR_ID: 2,
      VECTOR: 'Vector A',
      COORDINATE: 'Coordinate A',
      VALUE: 100,
      STATUS: 'Active',
      SYMBOL: 'Symbol A',
      TERMINATED: false,
      DECIMALS: 2,
    };

    // Add the new record to the records
    await model.addRow(newRecord);

  // Read the data again to ensure the new record is added
  await model.readData();

  // Get the updated records
  const updatedRecords = model.getRecords();
  const updatedRecordCount = updatedRecords.size;

  // Verify the number of records increased by 1 after adding
  expect(updatedRecordCount).toBe(initialRecordCount + 1);

  // Find the newly added record in the updated records
  const addedRecord = Array.from(updatedRecords.values()).find(
    (record) => record.REF_DATE === newRecord.REF_DATE
  );

  // Ensure the newly added record is found in the updated records
  expect(addedRecord).toBeTruthy();

  // Verify the data of the newly added record matches the input data
  expect(addedRecord).toEqual(expect.objectContaining(newRecord));
  console.log("Parham Barati");
  });
});
