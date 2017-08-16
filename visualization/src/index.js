import angular from 'angular';

import './app/codeCharta/module';
import 'angular-ui-router';
import routesConfig from './routes';

angular
  .module("app", ['ui.router', 'app.codeCharta'])
  .config(routesConfig);
