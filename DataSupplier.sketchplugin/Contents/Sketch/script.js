var onStartup = function(context) {
  log('In DataSupplier onStartup');
  var sketch = context.api();
  
  var dataManager = sketch.dataManager();
  
  // Register some static data available for random use.
  var staticListOfPeople = ['Lucy', 'Johnnie', 'Petie', 'Jamie', 'Tina', 'Gillie', 'Tania', 'Peta', 'Rudolpho', 'Jellie', 'Ricki', 'Lori', 'Jorgi', 'Marki'];
  dataManager.registerStaticSupplier('public.text', 'First Names', staticListOfPeople);
  
  // Register a method to supply random data on request.
  dataManager.registerDynamicSupplier('public.text', 'UK Regions', 'ukRegionsKey');
  
  log(context);
}

var onSupplyData = function(context) {
  log('In DataSupplier onSupplyData');
  var dataKey = context.randomDataKey;
  var dynamicData = ['Scotland', 'North East', 'Northern Ireland', 'North West', 'Yorkshire and the Humber', 'East Midlands', 'Wales', 'West Midlands', 'East of England', 'South East', 'South West', 'London'];
  
  context.api().dataManager().supplyRandomDataForKey(dataKey, dynamicData);
}

var onShutdown = function(context) {
  log('In DataSupplier onShutdown');
  context.api().dataManager().deregisterDataSuppliers();
  log(context);
}
