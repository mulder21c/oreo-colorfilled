let popedHistory = false;
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
    let selectedDesign = 0;
    const exports = {
      init () {
        let me = this;
        window.addEventListener('popstate', (event) => {
          event = event || window.event;
          popedHistory = true;
          let page = event.state === null ? 0 : event.state.page;
          if(page <= GlobalModel.getPage())
            me.onPrevPage();
          else{
            me.onNextPage();
          }
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

        new SliderView({
          el: '.select-design',
          indicatorSelector: '.slide-indicator',
          useIndicator: true,
          useSRNotation: false,
          canClickIndicator: true,
          callback: function (event){
            event = event || window.event;
            let idx = event.detail.currIndex;
            this.el.querySelector('.design-guide').setAttribute('data-index', idx);
            selectedDesign = idx;
          }
        });
      },
      onPrevPage () {
        PageView.change(GlobalModel.getPage() - 1);
        PageControlView.onChangePage(GlobalModel.getPage() - 1);

        StepTitleView.setup(document.querySelector(`.step${GlobalModel.getPage() - 2}-subject`))
          .setTitle(StepTitleModel.get(GlobalModel.getPage() - 1))

        GlobalModel.decreasePage();
      },
      onNextPage () {
        if(!popedHistory)
          history.pushState({page: GlobalModel.getPage() + 1}, 'OREO COLOREFILLED', '?step' + (GlobalModel.getPage() + 1));

        switch (GlobalModel.getPage()) {
          case 0:
          case 2:
          case 3:
            GlobalModel.increasePage();
            break;
          case 1:
            GlobalModel.setSelectedDesign(selectedDesign);
            GlobalModel.increasePage();
            if (selectedDesign > 1)
              GlobalModel.increasePage();
            break;
          default:
            break;
        }

        PageView.change(GlobalModel.getPage());
        PageControlView.onChangePage(GlobalModel.getPage());
        StepTitleView.setup(document.querySelector(`.step${GlobalModel.getPage() + 1}-subject`))
          .setTitle(StepTitleModel.get(GlobalModel.getPage()));

        popedHistory = false;
      }
    };
    return exports;
});
