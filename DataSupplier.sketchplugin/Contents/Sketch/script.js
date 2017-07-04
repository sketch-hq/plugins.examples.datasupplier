var onStartup = function(context) {
  log('In RandomData onStartup');
  var sketch = context.api();
  
  var dataManager = sketch.randomDataManager();
  log('### Is context.plugin what I need');
  log(context.plugin);
  
  var pluginIdentifier = context.plugin.identifier();
  log(pluginIdentifier);
  
  // Register some static data available for random use.
  var staticListOfPeople = ['Lucy', 'John'];
  dataManager.registerStaticSupplier('First Names', staticListOfPeople, pluginIdentifier);
  
  // Register a method to supply random data on request.
  dataManager.registerDynamicSupplier('UK Regions', 'ukRegionsKey', pluginIdentifier);
}

var onSupplyDynamicRandomData = function(context) {
  log('In RandomData onStartup'); 
  var dynamicData = ['Scotland', 'North East', 'Northern Ireland', 'North West', 'Yorkshire and the Humber', 'East Midlands', 'Wales', 'West Midlands', 'East of England', 'South East', 'South West', 'London'];
  
  context.randomDataManager().supplyRandomDataForKey(context.randomDataKey, dynamicData);
}

var onShutdown = function(context) {
  log('In RandomData onStartup');
  context.api().randomDataManager().deregisterDataSuppliers(context.plugin.identifier());
}
