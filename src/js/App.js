export default class App {
 constructor(Model, views) {
  const model = new Model();
  views.forEach(({ view, target }) => {
   new view(target, model);
  });
 }
}
