angular
  .module('corporate-giving')
  .factory('Charity', Charity)

Charity.$inject = ['$resource', 'API']
function Charity($resource, API){

  return $resource(
    API+'/charities/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
    }
  );
}