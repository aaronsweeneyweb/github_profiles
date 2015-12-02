describe('factory: Search', function() {

  var search;

  beforeEach(module('GitUserSearch'));

  beforeEach(inject(function(Search) {
    search = Search;
  }));

  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend;
    httpBackend
      .when("GET", "https://api.github.com/search/users?q=hello")
      .respond(
        { items: items }
      );
  }));

  var items = [
    {
      "login": "tansaku",
      "avatar_url": "https://avatars.githubusercontent.com/u/30216?v=3",
      "html_url": "https://github.com/tansaku"
    },
    {
      "login": "stephenlloyd",
      "avatar_url": "https://avatars.githubusercontent.com/u/196474?v=3",
      "html_url": "https://github.com/stephenlloyd"
    }
  ];

  it('returns search results', function() {
  search.query('hello')
    .then(function(response) {
      expect(response.data.items).toEqual(items);
  });
    httpBackend.flush();
    });

  it('responds to query', function() {
    expect(search.query).toBeDefined();
  });

});


//
// Although our tests pass, the website doesn't work. Why might that be?
// We have some duplications in the tests, as we are now testing the same thing (calling out to an API) in two places - how could we refactor that? Should we start mocking more things?
// Notice how when you clear the text box you're still trying to search.
// Add a label to let the user know what they have just searched for.
// Do you have a bug where some of the avatars are blown up really huge?
