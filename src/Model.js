const fs = require("fs");
const Record = require("./Record");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://parhambarati32:JowwlL5YJ4AzhUkD@language.aoykclp.mongodb.net/?retryWrites=true&w=majority";
const dbName = "CST8333";
const collectionName = "test";

const client = new MongoClient(uri);
const databaseCollection = client.db(dbName).collection(collectionName);

/**
 * Function to establish a connection to the MongoDB database.
 * @async
 */

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("CST8333").command({ ping: 1 });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}

const records = new Map();

/**
 * Function to process the MongoDB documents and create Record objects.
 * @async
 * @param {Array} documents - Array of MongoDB documents.
 * @returns {Map} - A Map object containing the records.
 */
const getData = async (documents) => {
  records.clear();

  documents.forEach((document) => {
    // Process the document and create a new Record object
    const record = new Record(
      document._id,
      document.REF_DATE,
      document.GEO,
      document.DGUID,
      document.TypeOfProduct,
      document.TypeOfStorage,
      document.UOM,
      document.UOM_ID,
      document.SCALAR_FACTOR,
      document.SCALAR_ID,
      document.VECTOR,
      document.COORDINATE,
      document.VALUE,
      document.STATUS,
      document.SYMBOL,
      document.TERMINATED,
      document.DECIMALS
    );

    // Add the record to the records array
    records.set(document._id, record);
  });

  // Return the array of Record objects
  return records;
};

/**
 * Represents a data model that manages records.
 * @class
 */
class Model {
  /**
   * Get all the records in the model.
   * @returns {Map} - A Map object containing the records.
   */
  getRecords() {
    return records;
  }

  /**
   * Get options for the form from the MongoDB collection.
   * @async
   * @returns {Promise<Object>} - A promise containing form options.
   */
  async getOptions() {
    const options = {};
    const objectId = new ObjectId("64bc8942d53c9052eadf7637");

    const query = { _id: objectId }; // Replace with the document's "_id" value
    const projection = { _id: 0, fieldName: 1 }; // Include only the "fieldName" field and exclude the
    const document = await databaseCollection.findOne(query, projection);
    let keys = Object.keys(document);
    keys = keys.filter((key) => key !== "_id");
    const distinctPromises = keys.map(async (key) => {
      options[key] = await databaseCollection.distinct(key);
    });

    await Promise.all(distinctPromises);

    return options;
  }

  /**
   * Read data from the MongoDB collection and populate the records.
   * @async
   * @returns {Map} - A Map object containing the records.
   */

  async readData() {
    try {
      await run();
      const cursor = await databaseCollection.find({});
      const documents = await cursor.toArray();

      return await getData(documents);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Get search results based on the form data submitted by the user.
   * @async
   * @param {Object} formData - The form data submitted for searching.
   * @returns {Map} - A Map object containing the search results.
   */
  async getResultOfSearch(formData) {
    const filter = {};

    for (const key in formData) {
      // Check if the value is an array. If so, apply $in operator.
      if (Array.isArray(formData[key])) {
        filter[key] = { $in: formData[key] };
      } else {
        filter[key] = formData[key];
      }
    }

    try {
      const searchResult = await databaseCollection.find(filter).toArray();
      return await getData(searchResult);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Get a specific record based on its ID from the MongoDB collection.
   * @async
   * @param {string} rowID - The ID of the record to retrieve.
   * @returns {Object} - The document representing the specific record.
   */
  async readSpecifiRow(rowID) {
    try {
      const objectId = new ObjectId(rowID);
      console.log(objectId);
      const cursor = await databaseCollection.findOne({ _id: objectId });

      console.log(cursor);

      return cursor;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Add a new row to the records.
   * @async
   * @param {object} formData - The form data representing the new record.
   */
  async addRow(object) {
    try {
      const insertData = {
        REF_DATE: object.REF_DATE,
        GEO: object.GEO,
        DGUID: object.DGUID,
        TypeOfProduct: object.TypeOfProduct,
        TypeOfStorage: object.TypeOfStorage,
        UOM: object.UOM,
        UOM_ID: object.UOM_ID,
        SCALAR_FACTOR: object.SCALAR_FACTOR,
        SCALAR_ID: object.SCALAR_ID,
        VECTOR: object.VECTOR,
        COORDINATE: object.COORDINATE,
        VALUE: object.VALUE,
        STATUS: object.STATUS,
        SYMBOL: object.SYMBOL,
        TERMINATED: object.TERMINATED,
        DECIMALS: object.DECIMALS,
      };

      const result = await databaseCollection.insertOne(insertData);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Delete a row from the records.
   * @async
   * @param {string} rowID - The ID of the record to delete.
   */
  async deleteRow(rowID) {
    try {
      const objectId = new ObjectId(rowID);
      await databaseCollection.deleteOne({ _id: objectId });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Edit a row in the records.
   * @async
   * @param {string} rowID - The ID of the record to edit.
   * @param {object} object - The updated record data.
   */
  async editRow(rowID, object) {
    try {
      const objectId = new ObjectId(rowID);
      const updateData = {
        $set: {
          REF_DATE: object.REF_DATE,
          GEO: object.GEO,
          DGUID: object.DGUID,
          TypeOfProduct: object.TypeOfProduct,
          TypeOfStorage: object.TypeOfStorage,
          UOM: object.UOM,
          UOM_ID: object.UOM_ID,
          SCALAR_FACTOR: object.SCALAR_FACTOR,
          SCALAR_ID: object.SCALAR_ID,
          VECTOR: object.VECTOR,
          COORDINATE: object.COORDINATE,
          VALUE: object.VALUE,
          STATUS: object.STATUS,
          SYMBOL: object.SYMBOL,
          TERMINATED: object.TERMINATED,
          DECIMALS: object.DECIMALS,
        },
      };

      let result = await databaseCollection.updateOne(
        { _id: objectId },
        updateData
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Clear all records from the model.
   */
  clearData() {
    records.clear();
  }

  /**
   * Write the records to a CSV file.
   */
  writeRecordsToCSV() {
    let csvData = "";

    // Generate the CSV data
    for (const [key, record] of records.entries()) {
      const values = Object.values(record);
      const row = values.map((value) => `${value}`).join(",");
      csvData += row + "\n";
    }

    // Write the CSV data to a file
    fs.writeFileSync("newFIle.csv", csvData, "utf8");

    console.log(`CSV file  created successfully.`);
  }
}

module.exports = Model;
