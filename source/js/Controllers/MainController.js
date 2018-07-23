define(
  [
    'Models/GlobalModel',
    'Models/StepTitleModel',
    'Views/PageView',
    'Views/StepTitleView',
    'Views/SliderView',
    'Views/PageControlView'
  ],
  (GlobalModel, StepTitleModel, PageView, StepTitleView, SliderView, PageControlView) => {
    const tag = '[MainController]';
    const exports = {
      init () {
        window.addEventListener('popstate', (event) => {
          event = event || window.event;
        });

        PageView.setup(document.querySelector('.content'))
          .fetchPages('.step-container')
          .change(0);

        PageControlView.setup(document.querySelector('.page-controller'))
          .fetchControls('.page-controls')
          .on('@nextpage', (event) => {this.onNextPage()})
          .on('@prevpage', (event) => {this.onPrevPage()})
          .onChangePage(0);

        new SliderView({
          el: '.oreo-introduce',
          useSRNotation: true
        });
      },
      onPrevPage () {
        PageView.change(GlobalModel.getPage() - 1);
        PageControlView.onChangePage(GlobalModel.getPage() - 1);
      },
      onNextPage () {
        history.pushState({page: GlobalModel.getPage() + 1}, 'OREO COLOREFILLED', '/step' + (GlobalModel.getPage() + 1));
        PageView.change(GlobalModel.getPage() + 1);
        PageControlView.onChangePage(GlobalModel.getPage() + 1);
      }
    };
    return exports;
});
