/**
 * Represents a record object.
 * Parham Barati
 * @class
 */
class Record {

    /**
       * Create a new Record instance.
       * @constructor
       
       * @param {string} REF_DATE - The reference date of the record.
       * @param {string} GEO - The geographic location of the record.
       * @param {string} DGUID - The data guide of the record.
       * @param {string} TypeOfProduct - The type of product of the record.
       * @param {string} TypeOfStorage - The type of storage of the record.
       * @param {string} UOM - The unit of measurement of the record.
       * @param {string} UOM_ID - The unit of measurement ID of the record.
       * @param {string} SCALAR_FACTOR - The scalar factor of the record.
       * @param {string} SCALAR_ID - The scalar ID of the record.
       * @param {string} VECTOR - The vector of the record.
       * @param {string} COORDINATE - The coordinate of the record.
       * @param {string} VALUE - The value of the record.
       * @param {string} STATUS - The status of the record.
       * @param {string} SYMBOL - The symbol of the record.
       * @param {string} TERMINATED - The termination status of the record.
       * @param {string} DECIMALS - The decimal places of the record.
       */
        constructor(
            id,REF_DATE, GEO, DGUID , TypeOfProduct,TypeOfStorage,UOM , UOM_ID , SCALAR_FACTOR,SCALAR_ID,
            VECTOR,COORDINATE,VALUE,STATUS , SYMBOL , TERMINATED , DECIMALS ) {
          this.id = id
          this.REF_DATE = REF_DATE;
          this.GEO = GEO;
          this.DGUID = DGUID;
          this.TypeOfProduct = TypeOfProduct;
          this.TypeOfStorage = TypeOfStorage;
          this.UOM = UOM;
          this.UOM_ID = UOM_ID
          this.SCALAR_FACTOR = SCALAR_FACTOR;
          this.SCALAR_ID = SCALAR_ID;
          this.VECTOR = VECTOR;
          this.COORDINATE = COORDINATE;
          this.VALUE = VALUE;
          this.STATUS = STATUS;
          this.SYMBOL = SYMBOL;
          this.TERMINATED = TERMINATED;
          this.DECIMALS = DECIMALS;
    
    
          
    
        }

      }

      module.exports = Record;