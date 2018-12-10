var report_header = [
  "Driver Id",
  "Driver Name",
  "Week",
  "Del Date",
  "Delling Terminal",
  "Dntrl",
  "Fsu",
  "Acct",
  "Customer",
  "Ref",
  "Inv Date",
  "Inv",
  "Hauling Terminal",
  "Chg Code",
  "Driver Terminal",
  "Amount Billed",
  "Dr",
  "Cust Type",
  "Line Haul",
  "Line Haul Pay",
  "Imputted Fuel",
  "Imputted Insurance",
  "Total Pay",
  "Selling Terminal Pay",
  "Shipper",
  "Pu City",
  "Pu State",
  "Consignee",
  "De City",
  "De State"
];

var driver_header = [
  "Driver Id",
  "First Name",
  "Last Name",
  "Email",
  "Address",
  "City",
  "Phone"
]


/**
 * Data to CSV
 * @param {*} dataList 
 * @param {*} headers 
 */
exports.reportdataToCSV = function (dataList) {
  var allObjects = [];
  allObjects.push(report_header);
  dataList.forEach(function (object, key) {
    var arr = [];
    arr.push(object.driver_id);
    arr.push(object.drivername);
    arr.push(object.week);
    arr.push(object.del_date);
    arr.push(object.selling_terminal);
    arr.push(object.cntrl);
    arr.push(object.fsu);
    arr.push(object.acct);
    arr.push(object.customer);
    arr.push(object.ref);
    arr.push(object.inv_date);
    arr.push(object.inv);
    arr.push(object.hauling_terminal);
    arr.push(object.chg_code);
    arr.push(object.driverterminal);
    arr.push(object.amount_billed);
    arr.push(object.dr);
    arr.push(object.cust_type);
    arr.push(object.line_haul);
    arr.push(object.line_haul_pay);
    arr.push(object.imputted_fuel);
    arr.push(object.imputted_insurance);
    arr.push(object.total_pay);
    arr.push(object.selling_terminal_pay);
    arr.push(object.shipper);
    arr.push(object.pu_city);
    arr.push(object.pu_state);
    arr.push(object.consignee);
    arr.push(object.de_city);
    arr.push(object.de_state);
    allObjects.push(arr)
  });
  var csvContent = "";
  allObjects.forEach(function (infoArray, index) {
    var dataString = infoArray.join(",");
    csvContent += index < allObjects.length ? dataString + "\n" : dataString;
  });
  return csvContent;
}

/**
 * Data to CSV
 * @param {*} dataList 
 * @param {*} headers 
 */
exports.driverToCSV = function (dataList) {
  var allObjects = [];
  allObjects.push(driver_header);
  dataList.forEach(function (object, key) {
    var arr = [];
    arr.push(object.driver_id);
    arr.push(object.first_name);
    arr.push(object.last_name);
    arr.push(object.email);
    arr.push(object.address);
    arr.push(object.city);
    arr.push(object.phone);
    allObjects.push(arr)
  });
  var csvContent = "";
  allObjects.forEach(function (infoArray, index) {
    var dataString = infoArray.join(",");
    csvContent += index < allObjects.length ? dataString + "\n" : dataString;
  });
  return csvContent;
}