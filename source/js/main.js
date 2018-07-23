require.config({
  baseUrl: 'js',
  paths: {
    MainController: 'Controllers/MainController'
  }
});

require(['MainController'], (MainController) => {
  MainController.init();
});
