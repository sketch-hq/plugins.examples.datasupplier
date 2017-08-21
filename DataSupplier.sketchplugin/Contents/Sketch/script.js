
var onStartup = function(context) {
  log('In com.bohemiancoding.datasupplier.example onStartup');
  var sketch = context.api();
  
  var dataManager = sketch.dataManager();
  
  // Register some static data available for use.
  var staticListOfPeople = ['Lucy', 'Johnnie', 'Petie', 'Jamie', 'Tina', 'Gillie', 'Tania', 'Peta', 'Rudolpho', 'Jellie', 'Ricki', 'Lori', 'Jorgi', 'Marki'];
  dataManager.registerStaticSupplier('public.text', 'First Names', staticListOfPeople);

  // Register some static image data available for use.
  var staticListOfPersonPicturesNames = ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg'];
  var arrayLength = staticListOfPersonPicturesNames.length;
  var paths = [];
  for (var i = 0 ; i < arrayLength ; i++) {
    paths.push(sketch.resourceNamed(staticListOfPersonPicturesNames[i]).path())
  }

  dataManager.registerStaticSupplier('public.image', 'Faces', paths);
  
  // Register a method to supply random data on request.
  dataManager.registerDynamicSupplier('public.text', 'UK Regions', 'onSupplyUKRegions');
  
  log(context);
}

var onSupplyUKRegions = function(context) {
  log('In com.bohemiancoding.datasupplier.example onSupplyUKRegions');
  var dataKey = context.data.key;
  var dataCount = context.data.count;
  
  var theData = ['Scotland', 'North East', 'Northern Ireland', 'North West', 'Yorkshire and the Humber', 'East Midlands', 'Wales', 'West Midlands', 'East of England', 'South East', 'South West', 'London'];
  
  var dynamicData = theData;
  while (dynamicData.length < dataCount) {
    dynamicData.push.apply(dynamicData, theData);
  }
  
  context.api().dataManager().supplyDataForKey(dynamicData, dataKey);
}

var onShutdown = function(context) {
  log('In com.bohemiancoding.datasupplier.example onShutdown');
  context.api().dataManager().deregisterDataSuppliers();
  log(context);
}
