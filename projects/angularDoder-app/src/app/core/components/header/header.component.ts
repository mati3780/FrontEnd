import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged, map } from 'rxjs/operators';
import { Header } from '../../model/header';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() { }

  header = this.router.events
                      .pipe(filter(event => event instanceof NavigationEnd),
                            distinctUntilChanged(),
                            map(event => this.buildHeader(this.activatedRoute)));

  private buildHeader(activatedRoute: ActivatedRoute) : Header {
    var currentRoute = activatedRoute;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }
    if (currentRoute.routeConfig.data) {
      var header = currentRoute.routeConfig.data.header;
      if (header) {
        return new Header(header.title, header.subtitle);
      }
    }
    return null;
  }
}