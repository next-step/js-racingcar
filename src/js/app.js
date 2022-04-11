import MainController from './controller/controller.js';

const App = () => {
  const controller = new MainController();
  controller.initFirstView();
};

App();
