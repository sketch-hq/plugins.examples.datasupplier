var onStartup = function(context) {
  log('In DataSupplier onStartup');
  var sketch = context.api();
  
  var dataManager = sketch.dataManager();
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

var onSupplyData = function(context) {
  log('In DataSupplier onSupplyData'); 
  var dynamicData = ['Scotland', 'North East', 'Northern Ireland', 'North West', 'Yorkshire and the Humber', 'East Midlands', 'Wales', 'West Midlands', 'East of England', 'South East', 'South West', 'London'];
  
  context.api().dataManager().supplyRandomDataForKey(context.randomDataKey, dynamicData);
}

var onShutdown = function(context) {
  log('In DataSupplier onShutdown');
  context.api().dataManager().deregisterDataSuppliers(context.plugin.identifier());
}
