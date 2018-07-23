define(() => {
  const tag = '[StepTiteModel]';
  return {
    data: {
      step0: '',
      step1: '디자인을 선택하세요',
      step2: '원하는 컬러를 채워주세요',
      step3: '메세지를 전달하세요',
      step4: '소중한 이에게 선물하세요'
    },
    get(step) {
      return this.data['step' + step];
    }
  }
});