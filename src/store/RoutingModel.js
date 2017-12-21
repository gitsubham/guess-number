import { observable, action } from 'mobx'

export default class RoutingModel {
  @observable route = '';

  @action
  clearRoute() {
    this.route = ''
  }

  @action
  setRoute(route) {
    this.route = route
  }
}
