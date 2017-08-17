import angular from 'angular';

import './app/codeCharta/codeCharta';
import 'angular-ui-router';
import routesConfig from './routes';

angular
  .module("app", ['ui.router', 'app.codeCharta'])
  .config(routesConfig);
