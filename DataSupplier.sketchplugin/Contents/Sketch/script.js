var onStartup = function(context) {
  log('In DataSupplier onStartup');
  var sketch = context.api();
  
  var dataManager = sketch.dataManager();
  
  // Register some static data available for random use.
  var staticListOfPeople = ['Lucy', 'John'];
  dataManager.registerStaticSupplier('First Names', 'public.text', staticListOfPeople);
  
  // Register a method to supply random data on request.
  dataManager.registerDynamicSupplier('UK Regions', 'public.text', 'ukRegionsKey');
}

var onSupplyData = function(context) {
  log('In DataSupplier onSupplyData'); 
  var dynamicData = ['Scotland', 'North East', 'Northern Ireland', 'North West', 'Yorkshire and the Humber', 'East Midlands', 'Wales', 'West Midlands', 'East of England', 'South East', 'South West', 'London'];
  
  context.api().dataManager().supplyRandomDataForKey(context.randomDataKey, dynamicData);
}

var onShutdown = function(context) {
  log('In DataSupplier onShutdown');
  context.api().dataManager().deregisterDataSuppliers();
}
