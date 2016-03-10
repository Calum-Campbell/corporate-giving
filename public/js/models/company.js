angular
  .module('corporate-giving')
  .factory('Company', Company)

Company.$inject = ['$resource', 'API']
function Company($resource, API){

  return $resource(
    API+'/companies/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
  }
  );
}