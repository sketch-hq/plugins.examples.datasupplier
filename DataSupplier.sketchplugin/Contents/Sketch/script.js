var DataSupplier = require('sketch/data-supplier')

var onStartup = function() {
  console.log('*************** In com.bohemiancoding.datasupplier.example Start: onStartup');

  // Register a method to supply a random list of first names.
  DataSupplier.registerDataSupplier('public.text', 'First Names', 'SupplyNames');
  console.log('*************** In com.bohemiancoding.datasupplier.example After First Names: onStartup');

  // Register a method to supply a random list of pictures of faces on request.
  DataSupplier.registerDataSupplier('public.image', 'Faces', 'SupplyFaces');

  // Register a method to supply a random list of pictures of faces on request.
  DataSupplier.registerDataSupplier('public.image', 'Female Faces', 'SupplyFemaleFaces');

  // Register a method to supply a random list of pictures of faces on request.
  DataSupplier.registerDataSupplier('public.image', 'Male Faces', 'SupplyMaleFaces');
  
  // Register a method to supply a random list of UK regions on request.
  DataSupplier.registerDataSupplier('public.text', 'UK Regions', 'SupplyUKRegions');
  
  console.log("*************** In com.bohemiancoding.datasupplier.example End: onStartup");
}

var onShutdown = function() {
  console.log('*************** In com.bohemiancoding.datasupplier.example onShutdown');
  
  DataSupplier.deregisterDataSuppliers();
}

var onSupplyNames = function(context) {
  console.log('*************** In onSupplyNames');
  console.log('*************** Data description: ' + context.data.description)
  console.log('*************** isSymbolInstanceOverride: ' + context.data.isSymbolInstanceOverride)
  var dataKey = context.data.key;
  var dataCount = context.data.requestedCount;
  
  var theData = ['Lucy', 'Johnnie', 'Petie', 'Jamie', 'Tina', 'Gillie', 'Tania', 'Peta', 'Rudolpho', 'Jellie', 'Ricki', 'Lori', 'Jorgi', 'Marki'];
  
  // Start the data to be provided at a random position in the array.
  var dynamicData = theData.slice(Math.floor(Math.random() * theData.length));
  dynamicData.push.apply(dynamicData, theData);
  while (dynamicData.length < dataCount) {
    dynamicData.push.apply(dynamicData, theData);
  }

  shuffle(dynamicData);
  dynamicData = dynamicData.slice(0, dataCount);
  var dataIndex = 0;
  while (dataIndex < dataCount) {
    DataSupplier.supplyDataAtIndex(dataKey, dynamicData[dataIndex], dataIndex);
    dataIndex++;  
  } 
  // DataSupplier.supplyData(dataKey, dynamicData);  
}

var onSupplyFaces = function(context) {
  console.log('*************** In onSupplyFaces');
  // console.log(context.data);
  var sketch = context.api();
  var dataKey = context.data.key;
  var dataCount = context.data.requestedCount;
  var pictureNames = ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg'];
  var arrayLength = pictureNames.length;
  var paths = [];
  for (var i = 0 ; i < arrayLength ; i++) {
    paths.push(sketch.resourceNamed(pictureNames[i]).path())
  }
  
  // Start the data to be provided at a random position in the array.
  var theData = paths.slice(Math.floor(Math.random() * paths.length));
  theData.push.apply(theData, paths)
  while (theData.length < dataCount) {
    theData.push.apply(theData, paths);
  }
  
  shuffle(theData);
  theData = theData.slice(0, dataCount);
  DataSupplier.supplyData(dataKey, theData);
}

var onSupplyFemaleFaces = function(context) {
  console.log('*************** In onSupplyFemaleFaces');
  var sketch = context.api();
  var dataKey = context.data.key;
  var dataCount = context.data.requestedCount;
  var pictureNames = ['1.jpg', '3.jpg', '5.jpg', '7.jpg', '9.jpg'];
  var arrayLength = pictureNames.length;
  var paths = [];
  for (var i = 0 ; i < arrayLength ; i++) {
    paths.push(sketch.resourceNamed(pictureNames[i]).path())
  }
  
  // Start the data to be provided at a random position in the array.
  var theData = paths.slice(Math.floor(Math.random() * paths.length));
  theData.push.apply(theData, paths)
  while (theData.length < dataCount) {
    theData.push.apply(theData, paths)
  }
  
  shuffle(theData)
  theData = theData.slice(0, dataCount);
  DataSupplier.supplyData(dataKey, theData);
}

var onSupplyMaleFaces = function(context) {
  console.log('*************** In onSupplyMaleFaces');
  var sketch = context.api();
  var dataKey = context.data.key;
  var dataCount = context.data.requestedCount;
  var pictureNames = ['0.jpg', '2.jpg', '4.jpg', '6.jpg', '8.jpg'];
  var arrayLength = pictureNames.length;
  var paths = [];
  for (var i = 0 ; i < arrayLength ; i++) {
    paths.push(sketch.resourceNamed(pictureNames[i]).path())
  }
  
  // Start the data to be provided at a random position in the array.
  var theData = paths.slice(Math.floor(Math.random() * paths.length));
  theData.push.apply(theData, paths)
  while (theData.length < dataCount) {
    theData.push.apply(theData, paths)
  }
  
  shuffle(theData)
  theData = theData.slice(0, dataCount);
  DataSupplier.supplyData(dataKey, theData);
}

var onSupplyUKRegions = function(context) {
  console.log('*************** In com.bohemiancoding.datasupplier.example onSupplyUKRegions');
  var dataKey = context.data.key;
  var dataCount = context.data.requestedCount;
  var theData = ['Scotland', 'North East', 'Northern Ireland', 'North West', 'Yorkshire and the Humber', 'East Midlands', 'Wales', 'West Midlands', 'East of England', 'South East', 'South West', 'London'];
  
  // Start the data to be provided at a random position in the array.
  var dynamicData = theData.slice(Math.floor(Math.random() * theData.length));
  dynamicData.push.apply(dynamicData, theData);
  while (dynamicData.length < dataCount) {
    dynamicData.push.apply(dynamicData, theData);
  }
  dynamicData = dynamicData.slice(0, dataCount)
  shuffle(dynamicData);
  DataSupplier.supplyData(dataKey, dynamicData);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

