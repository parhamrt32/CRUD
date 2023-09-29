const express = require("express");
const Controller = require("./Controller");
const controller = new Controller();
const app = express();
const port = 3000;

// Middleware to parse JSON data in the request body
app.use(express.json());
// Middleware to parse URL-encoded data in the request body
app.use(express.urlencoded({ extended: true }));

/**
 * Route: /
 * Method: GET
 * Description: Handles the root route and retrieves all records.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/", (req, res) => {
  try {
    controller.readAllData().then((records) => {
      const responseHTML = controller.getView(records);

      res.send(responseHTML);
    });
  } catch (error) {
    console.error("Error occurred while reading the dataset:", error);
    res.status(500).send("An error occurred while reading the dataset.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

/**
 * Route: /edit/:id
 * Method: GET
 * Description: Retrieves a specific record for editing based on the provided ID parameter.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/edit/:id", async (req, res) => {
  // Retrieve the ID parameter from the request
  const recordId = req.params.id.toString();

  // Read the specific record from the controller
  const record = await controller.readSpecificRow(recordId);

  if (!record) {
    res.status(404).send("Record not found");
  } else {
    // Get the HTML content for the record
    const responseHTML = await controller.readSpecificRow(recordId);

    // Send the HTML content as the response
    res.send(responseHTML);
  }
});

/**
 * Route: /edit/:id
 * Method: POST
 * Description: Updates a specific record with the provided data based on the ID parameter.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.post("/edit/:id", async (req, res) => {
  // Retrieve the record ID from the URL parameter

  const recordId = req.params.id.toString();
  console.log(req.params.id);
  console.log(req.body);

  // Edit the specified record with the provided data
  await controller.editRow(recordId, req.body);

  // Redirect to the home page
  res.redirect("/");
});

/**
 * Route: /add
 * Method: GET
 * Description: Retrieves the HTML form for adding a new record.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/add", (req, res) => {
  // Get the HTML content for the add form
  const addForm = controller.getForm();

  // Send the add form as the response
  res.send(addForm);
});

/**
 * Route: /search
 * Method: GET
 * Description: Retrieves the HTML form for searching records.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/search", (req, res) => {
  // Get the HTML content for the add form

  controller
    .getFormOptions()
    .then((result) => {
      const addForm = controller.getSearchForm(result);
      res.send(addForm);
    })
    .catch((error) => {
      console.error("Error:", error);
      res
        .status(500)
        .send("An error occurred while generating the search form.");
    });

  // Send the add form as the response
});

/**
 * Route: /search/submit
 * Method: POST
 * Description: Performs a search based on the submitted form data.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.post("/search/submit", async (req, res) => {
  // Access the form data submitted in the request body
  const formData = req.body;

  controller.getResultOfSearch(formData).then((records) => {
    const responseHTML = controller.getView(records);
    res.send(responseHTML);
  });
});

/**
 * Route: /add/submit
 * Method: POST
 * Description: Adds a new record with the provided form data.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.post("/add/submit", async (req, res) => {
  // Access the form data submitted in the request body
  const formData = req.body;
  console.log(formData);
  // Add a new record with the provided data
  await controller.addRow(formData);

  //Redirect to the home page
  res.redirect("/");
});

/**
 * Route: /delete/:id
 * Method: GET
 * Description: Deletes a specific record based on the provided ID parameter.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/delete/:id", (req, res) => {
  // Retrieve the record ID from the URL parameter
  const recordId = req.params.id.toString();

  // Delete the specified record
  controller.deleteRow(recordId);

  // Redirect to the home page
  res.redirect("/");
});

/**
 * Route: /save
 * Method: GET
 * Description: Saves the records to a CSV file.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/save", (req, res) => {
  // Write the records to CSV
  controller.writeRecordsToCSV();

  res.send(`
    <html>
      <head>
      <style>
      body{
        display : flex;
        justify-content: center;
        align-items: center;
        flex-direction : Column;
        height : 100vh;
      }
      </style>
        <script>
          // JavaScript code to show the alert and redirect after a delay
          window.onload = function() {
      
            setTimeout(function() {
              window.location.href = '/';
            }, 5000); // Redirect after 5 seconds (5000 milliseconds)
          }
        </script>
      </head>
      <body>
        <h1>File Saved</h1>
        <h2> Parham Barati </h2>
      </body>
    </html>
  `);
});

/**
 * Route: /reload
 * Method: GET
 * Description: Clears the data and reloads the page.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/reload", (req, res) => {
  // Clear the data and reload
  controller.clearData();

  res.send(`
    <html>
      <head>
      <style>
      body{
        display : flex;
        justify-content: center;
        align-items: center;
        flex-direction : Column;
        height : 100vh;
      }
      </style>
        <script>
          // JavaScript code to show the alert and redirect after a delay
          window.onload = function() {
      
            setTimeout(function() {
              window.location.href = '/';
            }, 5000); // Redirect after 5 seconds (5000 milliseconds)
          }
        </script>
      </head>
      <body>
        <h1>File Reloaded</h1>
        <h2> Parham Barati </h2>
      </body>
    </html>
  `);

  // Redirect to the home page
  res.redirect("/");
});
