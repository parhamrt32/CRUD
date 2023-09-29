/**
 * Represents a View for displaying data and forms.
 * @class
 */
class View {
  /**
   * Display the data records in an HTML table format.
   * @param {Map} records - The map of records to be displayed.
   * @returns {string} The HTML representation of the data table.
   */
  displayData(records) {
    let responseHTML = "";

    responseHTML += `
    <head>
    <style>

    body{
      display : flex;
      flex-direction : column;
    }

    .reloadbtn{
      background-color : #000;
      color : #fff;
      width : fit-content;
      margin-bottom : 10px;
    }

    .dltbtns:link{
    
      color : #fff;
      background-color : #b30508;
      
    }
    .dltbtns:visited{
      color : #fff;
    

    }

    .addbtns{
      background-color : #0dd106;
      color : #000;
      width : fit-content;
      margin-bottom : 10px;
    }

    .btns:link {
      text-decoration : none;
      padding : 5px;
      border-radius : 5px;
    }

    .editbtns:link{
    
      color : #fff;
      background-color : #2b38f0;
      
    }
    .editbtns:visited{
      color : #fff;
    

    }
table {
  width: 100%;
  background-color: #FFFFFF;
  border-collapse: collapse;
  color: #000000;
}

table td, table th {
  border-width: 1px;
  border-color: #000;
  border-style: solid;
  padding: 9px;
}

table thead {
  background-color: #e0e0e0;
  color: #313030;
}

tr:nth-child(even) {
  background-color:#807f7e;
  color: #fff;
}

img{
  width : 20px;
}
</style>

    </heade>`;

    responseHTML += `

    <body>

    <h1> Parham Barati </h1>
    <a href='/add' class='btns addbtns' > Add new </a>
    <a href='/reload' class='btns reloadbtn' > Reload </a>
    <a href='/save' class='btns reloadbtn' > Save </a>
    <a href='/search' class='btns reloadbtn' > Search </a>
    <table style='text-align: center;font-family : Monospace'>
    <thead>
      <tr>
        <th> ID </th>
        <th>REF DATE</th>
        <th>GEO</th>
        <th>DGU ID</th>
        <th>TypeOfProduct</th>
        <th>TypeOfStorage</th>
        <th>UOM</th>
        <th>UOM_ID</th>
        <th>SCALAR_FACTOR</th>
        <th>SCALAR_ID</th>
        <th>VECTOR</th>
        <th>COORDINATE</th>
        <th>VALUE</th>
        <th>STATUS</th>
        <th>SYMBOL</th>
        <th>TERMINATED</th>
        <th>DECIMALS</th>
        <th> </th>
        <th> </th>
      </tr>
      </thead>
    `;

    for (const record of records.values()) {
      responseHTML += `
        <tr>
          <td> ${record.id} </td>
          <td>  ${record.REF_DATE}  </td>
          <td>  ${record.GEO}  </td>
          <td>  ${record.DGUID}  </td>
          <td>  ${record.TypeOfProduct}  </td>
          <td>  ${record.TypeOfStorage}  </td>
          <td>  ${record.UOM}  </td>
          <td>  ${record.UOM_ID}  </td>
          <td>  ${record.SCALAR_FACTOR}  </td>
          <td>  ${record.SCALAR_ID}  </td>
          <td>  ${record.VECTOR}  </td>
          <td>  ${record.COORDINATE}  </td>
          <td>  ${record.VALUE}  </td>
          <td>  ${record.STATUS}  </td>
          <td>  ${record.SYMBOL}  </td>
          <td>  ${record.TERMINATED}  </td>
          <td>  ${record.DECIMALS}  </td>
          <td><a class='btns editbtns' href='/edit/${record.id}'>EDIT</a></td>
          <td><a class='btns dltbtns' onClick='confirm("Are you sure you want to delete this row?");' href='/delete/${record.id}'>DELETE</a></td>
        </tr>
        
        `;
    }

    responseHTML += `
    </table>
    <h1> Parham Barati </h1>
    </body>
    
  
    `;

    return responseHTML;
  }

  /**
   * Display a specific row of data in an HTML form for editing.
   * @param {Object} record - The record to be displayed in the form.
   * @returns {string} The HTML representation of the edit form.
   */
  displaySpecificRow(record) {
    let editresponseHTML = "";
    editresponseHTML += `
    <head>
      <style>
        body{
          display : flex;
          justify-content : center;
          align-items : center;
        }
        input{
          margin-left : auto;
        }
        form{
          background-color : #42b6f5;
          border-radius : 5px;
          padding : 10px;
          
        }

        .form-row{
          display : flex;
          justify-content : space-between;
          margin:8px;
        }
        .formBtns{
          display : flex;
          justify-content : flex-end;
          gap:5px;
        }
      </style>
    </head>
    <body>
    
    <form action="/edit/${record._id}" method="POST">
    <h1> Parham Barati </h1>

    <div class="form-row" >
  <label for="REF_DATE">REF DATE:</label>
  <input type="text" name="REF_DATE" value="${record.REF_DATE}" /><br>
   </div>

  <div class="form-row" >
  <label for="GEO">GEO:</label>
  <input type="text" name="GEO" value="${record.GEO}" /><br>
</div>

  <div class="form-row" >
  <label for="DGU_ID">DGU ID:</label>
  <input type="text" name="DGUID" value="${record.DGUID}" /><br>
</div>

  <div class="form-row" >
  <label for="TypeOfProduct">TypeOfProduct:</label>
  <input type="text" name="TypeOfProduct" value="${record.TypeOfProduct}" /><br>
</div>

  <div class="form-row" >
  <label for="TypeOfStorage">TypeOfStorage:</label>
  <input type="text" name="TypeOfStorage" value="${record.TypeOfStorage}" /><br>
</div>

  <div class="form-row" >
  <label for="UOM">UOM:</label>
  <input type="text" name="UOM" value="${record.UOM}" /><br>
</div>

  <div class="form-row" >
  <label for="UOM_ID">UOM_ID:</label>
  <input type="text" name="UOM_ID" value="${record.UOM_ID}" /><br>
</div>

  <div class="form-row" >
  <label for="SCALAR_FACTOR">SCALAR_FACTOR:</label>
  <input type="text" name="SCALAR_FACTOR" value="${record.SCALAR_FACTOR}" /><br>
</div>

  <div class="form-row" >
  <label for="SCALAR_ID">SCALAR_ID:</label>
  <input type="text" name="SCALAR_ID" value="${record.SCALAR_ID}" /><br>
</div>

  <div class="form-row" >
  <label for="VECTOR">VECTOR:</label>
  <input type="text" name="VECTOR" value="${record.VECTOR}" /><br>
</div>

  <div class="form-row" >
  <label for="COORDINATE">COORDINATE:</label>
  <input type="text" name="COORDINATE" value="${record.COORDINATE}" /><br>
</div>

  <div class="form-row" >
  <label for="VALUE">VALUE:</label>
  <input type="text" name="VALUE" value="${record.VALUE}" /><br>
</div>

  <div class="form-row" >
  <label for="STATUS">STATUS:</label>
  <input type="text" name="STATUS" value="${record.STATUS}" /><br>
</div>

  <div class="form-row" >
  <label for="SYMBOL">SYMBOL:</label>
  <input type="text" name="SYMBOL" value="${record.SYMBOL}" /><br>
</div>

  <div class="form-row" >
  <label for="TERMINATED">TERMINATED:</label>
  <input type="text" name="TERMINATED" value="${record.TERMINATED}" /><br>
</div>

  <div class="form-row" >
  <label for="DECIMALS">DECIMALS:</label>
  <input type="text" name="DECIMALS" value="${record.DECIMALS}" /><br>
</div>

<div class='formBtns'>
  <button type="submit">Submit</button>
  <input style='margin : 0;' type="button" value="Cancel" onclick="history.back()"/>
</div>
  
</form>
</body>
  `;

    return editresponseHTML;
  }

  /**
   * Display an HTML form for adding a new record.
   * @returns {string} The HTML representation of the add form.
   */
  addForm() {
    let addForm = "";
    addForm += `
    <head>
      <style>
        body{
          display : flex;
          justify-content : center;
          align-items : center;
        }
        input{
          margin-left : auto;
        }
        form{
          background-color : #42b6f5;
          border-radius : 5px;
          padding : 10px;
          
        }

        .form-row{
          display : flex;
          justify-content : space-between;
          margin:8px;
        }
        .formBtns{
          display : flex;
          justify-content : flex-end;
          gap:5px;
        }
      </style>
    </head>
    <body>
    
    <form action="/add/submit" method="POST">
    <h1> Parham Barati </h1>
    <div class="form-row" >
  <label for="REF_DATE">REF DATE:</label>
  <input type="text" name="REF_DATE" value="" /><br>
   </div>

  <div class="form-row" >
  <label for="GEO">GEO:</label>
  <input type="text" name="GEO" value="" /><br>
</div>

  <div class="form-row" >
  <label for="DGU_ID">DGU ID:</label>
  <input type="text" name="DGUID" value="" /><br>
</div>

  <div class="form-row" >
  <label for="TypeOfProduct">TypeOfProduct:</label>
  <input type="text" name="TypeOfProduct" value="" /><br>
</div>

  <div class="form-row" >
  <label for="TypeOfStorage">TypeOfStorage:</label>
  <input type="text" name="TypeOfStorage" value="" /><br>
</div>

  <div class="form-row" >
  <label for="UOM">UOM:</label>
  <input type="text" name="UOM" value="" /><br>
</div>

  <div class="form-row" >
  <label for="UOM_ID">UOM_ID:</label>
  <input type="text" name="UOM_ID" value="" /><br>
</div>

  <div class="form-row" >
  <label for="SCALAR_FACTOR">SCALAR_FACTOR:</label>
  <input type="text" name="SCALAR_FACTOR" value="" /><br>
</div>

  <div class="form-row" >
  <label for="SCALAR_ID">SCALAR_ID:</label>
  <input type="text" name="SCALAR_ID" value="" /><br>
</div>

  <div class="form-row" >
  <label for="VECTOR">VECTOR:</label>
  <input type="text" name="VECTOR" value="" /><br>
</div>

  <div class="form-row" >
  <label for="COORDINATE">COORDINATE:</label>
  <input type="text" name="COORDINATE" value="" /><br>
</div>

  <div class="form-row" >
  <label for="VALUE">VALUE:</label>
  <input type="text" name="VALUE" value="" /><br>
</div>

  <div class="form-row" >
  <label for="STATUS">STATUS:</label>
  <input type="text" name="STATUS" value="" /><br>
</div>

  <div class="form-row" >
  <label for="SYMBOL">SYMBOL:</label>
  <input type="text" name="SYMBOL" value="" /><br>
</div>

  <div class="form-row" >
  <label for="TERMINATED">TERMINATED:</label>
  <input type="text" name="TERMINATED" value="" /><br>
</div>

  <div class="form-row" >
  <label for="DECIMALS">DECIMALS:</label>
  <input type="text" name="DECIMALS" value="" /><br>
</div>

<div class='formBtns'>
  <button type="submit">Submit</button>
  <input style='margin : 0;' type="button" value="Cancel" onclick="history.back()"/>
</div>
  
</form>
</body>
  `;

    return addForm;
  }

  /**
 * Generates an HTML search form based on the provided object containing form options.
 * @param {Object} object - The object containing form options.
 * @returns {string} - The HTML code representing the search form.
 */
  searchForm(object) {
    console.log(object);
    let searchForm = "";
    searchForm += `

    <head>
      <style>
        body{
          display : flex;
          justify-content : center;
          align-items : center;
        }
        input{
          margin-left : auto;
        }
        form{
          background-color : #42b6f5;
          border-radius : 5px;
          padding : 10px;
          width : 95vw;
          
        }

        .form-row{
          display : flex;
          flex-direction : column;
          justify-content : space-between;
          margin:8px;
          width : 300px;
        }
        .formBtns{
          display : flex;
          justify-content : flex-end;
          gap:5px;
        }
        .inputs{
          display : flex;
          justify-content : center;
          flex-wrap : wrap;
        }
        select{
          width : 300px;
          height : 100px;
        }
      </style>
      <script> 
     
      </script>
    </head>
    <body>
    
    <form action="/search/submit" method="POST">
    <h1> Parham Barati </h1>
    <span> (For multiselecting and deselect any option hold "ctrl" )
    <div class="inputs">
    `;

    // Loop through the keys of the object
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        // Check if the value is an array (for select inputs)
        if (Array.isArray(object[key]) && object[key].length > 0) {
          // Create the select input with options
          searchForm += `
     
      <div class="form-row">
      <label for="${key}">${key}:</label>
      <select multiple name="${key}">
        ${object[key]
          .map((value) => {
            if (value && value !== "null") {
              return `<option value="${value}">${value}</option>`;
            }
          })
          .join("")}
      </select>
    </div>
       
      `;
        } else {
          // Create the regular text input
          searchForm += `
        <div class="form-row">
          <label for="${key}">${key}:</label>
          <input type="text" name="${key}" value="" /><br>
        </div>
      `;
        }
      }
    }

    // Add the submit and cancel buttons
    searchForm += `
</div>
  <div class='formBtns'>
    <button type="submit">Submit</button>
    <input style='margin : 0;' type="button" value="Cancel" onclick="history.back()"/>
  </div>
</form>
</body>
`;

    return searchForm;
  }
}

module.exports = View;
