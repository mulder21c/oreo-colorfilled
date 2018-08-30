let popedHistory = false;
define(
  [
    'Models/GlobalModel',
    'Models/StepTitleModel',
    'Models/DrawColorModel',
    'Views/PageView',
    'Views/StepTitleView',
    'Views/SliderView',
    'Views/PageControlView',
    'Views/DrawColorView',
    'Views/AccordionView',
    'Views/WriteMessageView',
    'Views/AwardOrderView'
  ],
  (GlobalModel, StepTitleModel, DrawColorModel,
    PageView, StepTitleView, SliderView, PageControlView,
    DrawColorView, AccordionView, WriteMessageView, AwardOrderView) => {
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

        new AccordionView({
          el: '.coloring-accordion',
          tabSelector: '.coloring-accordion-tab > button',
          panelSelector: '.color-list'
        }).on('@activated', (event) => {this.onAccordionActivate(event)}, false);

        DrawColorView.setup(document.querySelector('.select-color'))
          .bindChangeEvent()
          .on('@change', (event) => {this.onColorChange(event)}, false);

        WriteMessageView.setup(document.querySelector('.write-message'));

        AwardOrderView.setup(document.querySelector('.award-order'));

        PageView.setup(document.querySelector('.content'))
          .fetchPages('.step-container')
          .change(0);

        PageControlView.setup(document.querySelector('.page-controller'))
          .fetchControls('.page-controls')
          .on('@nextpage', (event) => {this.onNextPage()}, false)
          .on('@prevpage', (event) => {this.onPrevPage()}, false)
          .on('@pageChanged', (event) => {this.onPageChanged(event)}, false)
          .onChangePage(0);
      },
      onPrevPage () {
        PageView.change(GlobalModel.getPage() - 1);
        PageControlView.onChangePage(GlobalModel.getPage() - 1);

        StepTitleView.setup(document.querySelector(`.step${GlobalModel.getPage() - 2}-subject`))
          .setTitle(StepTitleModel.get(GlobalModel.getPage() - 1))

        GlobalModel.decreasePage();
      },
      onNextPage () {
        if(!popedHistory) {
          history.pushState({page: GlobalModel.getPage() + 1}, 'OREO COLOREFILLED', '?step' + (GlobalModel.getPage() + 1));
        }

        switch (GlobalModel.getPage()) {
          case 0:
            GlobalModel.increasePage();
            break;
          case 1:
            GlobalModel.setSelectedDesign(selectedDesign);
            DrawColorView.loadDefaultSketchs(selectedDesign)
              .setColorList(DrawColorModel.getColorList(selectedDesign));
            GlobalModel.increasePage();

            if (selectedDesign > 1){
              WriteMessageView.initialize(GlobalModel.getSelectedDesign(), GlobalModel.getSelectedColor());
              GlobalModel.increasePage();
            }
            break;
          case 2:
            if( !DrawColorView.validate() ) return;
            GlobalModel.setSelectedColor(DrawColorView.getDrawnColor());
            WriteMessageView.initialize(GlobalModel.getSelectedDesign(), GlobalModel.getSelectedColor());
            GlobalModel.increasePage();
            break;
          case 3:
            GlobalModel.setPostMessage(WriteMessageView.getMessage());
            AwardOrderView.getOreoCode({
              design: GlobalModel.getSelectedDesign(),
              colors: GlobalModel.getSelectedColor(),
              msg: GlobalModel.getPostMessage()
            });
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
      },
      onPageChanged (event) {
        if(event.detail.page === 4) {
          AwardOrderView.startVideo();
        }else{
          AwardOrderView.stopVideo();
        }
      },
      onAccordionActivate (event) {
        DrawColorView.highlightLayer(event.detail || {});
      },
      onColorChange (event) {
        DrawColorView.onCheckColor(event.detail || {});
      }
    };
    return exports;
});
