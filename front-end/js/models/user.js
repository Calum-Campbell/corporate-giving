angular
  .module('cause-app')
  .factory('User', User)

User.$inject = ['$resource', 'API']
function User($resource, API){

  return $resource(
    API+'/users/:id', 
    {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: false},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
      'addProject': { 
        url: API + '/users/:id/addproject',
        method: 'PUT'
      },
      'removeProject': { 
        url: API + '/users/:id/removeproject',
        method: 'PUT'
      },
      'register': {
        url: API +'/register',
        method: "POST"
      },
      'login':      {
        url: API + '/login',
        method: "POST"
      }
    }
  );
}