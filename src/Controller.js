const Model = require("./Model");
const View = require("./View");
const model = new Model("32100260.csv");
const view = new View();

/**
 * Controller class that acts as a mediator between the Model and View.
 * @class
 */
class Controller {
  /**
   * Reads all the data from the data file.
   * @returns {Map} - A map containing all the records.
   */
  readAllData() {
    return model.readData();
  }

  /**
   * Reads a specific row from the data file.
   * @param {string} rowID - The ID of the row to read.
   * @returns {Object} - The specific row data.
   */
  async readSpecificRow(rowID) {
    const value = await model.readSpecifiRow(rowID);
    return view.displaySpecificRow(value);
  }

  /**
   * Retrieves the view with the data.
   * @param {Map} records - A map containing the records.
   * @returns {string} - The view with the data.
   */
  getView(records) {
    return view.displayData(records);
  }

  /**
   * Retrieves the add form.
   * @returns {string} - The add form HTML.
   */
  getForm() {
    return view.addForm();
  }

  /**
   * Retrieves options for the form.
   * @returns {Promise<Object>} - A promise containing form options.
   */
  async getFormOptions() {
    return await model.getOptions();
  }

  /**
   * Retrieves search form.
   * @param {Object} object - An object containing data for the form.
   * @returns {string} - The search form HTML.
   */
  getSearchForm(object) {
    return view.searchForm(object);
  }

  /**
   * Retrieves search result based on the form data.
   * @param {Object} formData - The data from the search form.
   * @returns {Object[]} - An array of search result data.
   */
  getResultOfSearch(formData) {
    return model.getResultOfSearch(formData);
  }

  /**
   * Retrieves all the records.
   * @returns {Map} - A map containing all the records.
   */
  getRecords() {
    console.log(model.records);
    return model.records;
  }

  /**
   * Adds a new row to the data.
   * @param {Object} formData - The data of the new row.
   */
  addRow(formData) {
    model.addRow(formData);
  }

  /**
   * Edits an existing row in the data.
   * @param {string} rowID - The ID of the row to edit.
   * @param {Object} record - The updated data for the row.
   */
  editRow(rowID, record) {
    model.editRow(rowID, record);
  }

  /**
   * Deletes a row from the data.
   * @param {string} rowID - The ID of the row to delete.
   */
  deleteRow(rowID) {
    model.deleteRow(rowID);
  }

  /**
   * Clears all the data.
   */
  clearData() {
    model.clearData();
  }

  /**
   * Writes the records to a CSV file.
   */
  writeRecordsToCSV() {
    model.writeRecordsToCSV();
  }
}

module.exports = Controller;
