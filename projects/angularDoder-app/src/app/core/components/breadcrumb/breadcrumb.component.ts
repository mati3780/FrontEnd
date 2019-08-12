import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, distinctUntilChanged, map } from 'rxjs/operators';
import { Breadcrumb } from '../../model/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  breadcrumbs$ = this.router.events
                            .pipe(filter(event => event instanceof NavigationEnd),
                                  distinctUntilChanged(),
                                  map(event => {
                                    var res = this.buildBreadcrumb(this.activatedRoute.root.firstChild);
                                    return res;
                                  }));

  private buildBreadcrumb(route: ActivatedRoute, url: string = "", breadcrumbs: Array<Breadcrumb> = []) : Array<Breadcrumb> {
    var newBreadcrumbs = [...breadcrumbs];
    
    if (route.routeConfig && route.routeConfig.data && route.routeConfig.data.breadcrumb) {
      var label: string = route.routeConfig.data.breadcrumb;
      var path = route.routeConfig.path;
      var nextUrl = `${url}${path}/`;
      var breadcrumb: Breadcrumb = {
        label: label,
        link: route.firstChild ? nextUrl : null
      }
      newBreadcrumbs.push(breadcrumb);
      if (route.firstChild){
        return this.buildBreadcrumb(route.firstChild, nextUrl, newBreadcrumbs);
      }      
    } else {
      if (route.firstChild){
        return this.buildBreadcrumb(route.firstChild, "", newBreadcrumbs);
      }
    }

    return newBreadcrumbs;
  }
}