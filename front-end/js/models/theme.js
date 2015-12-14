angular
  .module('cause-app')
  .factory('Theme', Theme)

Theme.$inject = ['$resource', 'API']
function Theme($resource, API){


  return $resource(
    API+'/themes/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
    }
  );
}