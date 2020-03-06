import "../scss/complete.scss";
import "Modules/@fortawesome/fontawesome-free/scss/fontawesome.scss";
import "Modules/@fortawesome/fontawesome-free/scss/regular.scss";
import "Modules/@fortawesome/fontawesome-free/scss/solid.scss";
import "core-js/modules/es.promise";
import axios from "axios";
import Clipboard from "clipboard";
import store from "./Store";

const {design, colors, message} = store.getData([`design`, `colors`, `message`]);
const FieldOreoCode = document.querySelector(`.oreo-code__copy-field`);

const generateCode = async () => {
  return axios({
    url: `https://5e60b2d9cbbe0600146cbc2f.mockapi.io/oreo/generate`,
    method: `post`,
    data: {
      design,
      colors,
      message,
    }
  })
  .then(({data}) => data.code)
  .catch(err => {
    alert(`코드 발급에 실패하였습니다.\n잠시 후 다시 시도해주세요`);
    console.log(err);
  });
};

const CopyCode = (el) => {
  if(!el) throw new Error(`[CopyCode] code filed is not defined`);
  const button = el.querySelector(`.oreo-code__copy-button`);
  const textfield = el.querySelector(`.oreo-code__textfield`);
  const copiedIcon = button.querySelector(`.copied`)

  return {
    async init() {
      const code = await generateCode();
      const clipboard = new Clipboard(button);
      textfield.value = code;
      clipboard.on(`success`, event => {
        copiedIcon.classList.remove(`copied--not`);
      });
    }
  }
};

CopyCode(FieldOreoCode).init();