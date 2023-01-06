---
slug: angular-14-standalone-components
title: Angular 14 - Standalone Components, Directives, and Pipes
authors: [kgajera]
image: ./image.png
tags: [angular, tailwind]
---

Angular standalone components! This is a feature that I've been wanting for a while. After reading the [RFC](https://github.com/angular/angular/discussions/43784) last year, it's great to see this feature come to fruition in Angular 14. It's a huge improvement to developer experience because we no longer need [`NgModule`](https://angular.io/api/core/NgModule) which reduces a lot of boilerplate, and in turn eliminates common errors that occur like forgetting to declare components.

<!--truncate-->

Full source code for this example can be found here:
https://github.com/kgajera/javascript-examples/tree/master/examples/angular-standalone

## Generate an Angular 14 app

Let's create a new Angular 14 app by running the following command:

```
npx @angular/cli@next new angular-standalone
```

### Refactor `AppComponent` to be standalone

There isn't a way to generate an Angular app with a standalone root `AppComponent`, so let's refactor it to be standalone by deleting all the `src/app/app.*` files except for the component file.

We can then add the `standalone` flag to it and define a simple `template`:

```ts title="src/app/app.component.ts"
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  standalone: true,
  template: `<h1>Angular Standalone Example</h1>`,
})
export class AppComponent {
  title = "angular-standalone";
}
```

By having done this, you should already start to see the simplification happening. Now, we need to bootstrap our application using the standalone `AppComponent` instead of the `AppModule`:

```ts title="src/main.ts"
import { enableProdMode, importProvidersFrom } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app/app.component";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

const routes: Routes = [];

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(RouterModule.forRoot(routes))],
});
```

We won't dive into routing in this post, but this where you would define the routes for you application as well.

## Generating components, directives, and pipes

We generated our app using the [Angular CLI](https://angular.io/cli), and we're also going to use it to generate our component, directive, and pipe files. My opinionated approach is to set the following generation options in the `angular.json` file:

```json title=angular.json
{
  "schematics": {
    "@schematics/angular:component": {
      "flat": true,
      "inlineStyle": true,
      "inlineTemplate": true,
      "standalone": true,
      "style": "none"
    },
    "@schematics/angular:directive": {
      "flat": true,
      "standalone": true
    },
    "@schematics/angular:pipe": {
      "standalone": true
    },
    "@schematics/angular:service": {
      "flat": true
    }
  }
}
```

- For components, I prefer:
  - `--style=none` - this prevents the generation of a style file. It's not the focus of this blog, but this example uses Tailwind, so we generally won't need any component specific styles.
  - `--inline-template` - this prevents the generation of an `.html` file so we can define our template in the component decorator
- `--flat` - this prevents nesting generated files in a new folder
- `--standalone` - this creates `standalone` components, directives, and pipes

## Generate a standalone `CardComponent`

Run the following command to create a new "card" component:

```
ng generate component card
```

This will generate the following component and we've added simple template to display content in within a styled `div` element:

```ts title="src/app/card.component.ts"
import { Component } from "@angular/core";

@Component({
  selector: "app-card",
  standalone: true,
  template: `
    <div class="m-3 p-3 border rounded-lg shadow-lg">
      <h2 class="mb-4 text-2xl">Card Component</h2>
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {}
```

And that's it! We don't need to declare or export the `CardComponent` in an `NgModule`.

## Generate `appButton` standalone directive

Run the following command to create a new directive that we'll use to style our `button` elements:

```
ng generate directive button
```

This will generate the following directive and we've added implementation to add Tailwind classes to the host element:

```ts title="src/app/button.directive.ts"
import { Directive, HostBinding } from "@angular/core";

@Directive({
  selector: "[appButton]",
  standalone: true,
})
export class ButtonDirective {
  @HostBinding("class")
  elementClass = "text-base font-medium rounded-lg p-3 bg-sky-500 text-white";
}
```

## Generate `uppercase` standalone pipe

Run the following command to create a new pipe that we'll use to transform a string to uppercase:

```
ng generate pipe uppercase
```

This will generate the following pipe and we've implemented the `transform` method to simply uppercase a string:

```ts title="src/app/uppercase.pipe.ts"
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "uppercase",
  standalone: true,
})
export class UppercasePipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}
```

## Putting it all together

Now that we've implemented these standalone features, how do we use them? We can directly add them to the `imports` array in the component decorator where we want to use them:

```ts title="src/app/app.component.ts"
import { Component } from "@angular/core";
import { ButtonDirective } from "./button.directive";
import { CardComponent } from "./card.component";
import { UppercasePipe } from "./uppercase.pipe";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [ButtonDirective, CardComponent, UppercasePipe],
  template: `
    <h1 class="m-4 text-3xl">Angular Standalone</h1>
    <app-card>
      <button appButton type="button">
        {{ "Button Directive" | uppercase }}
      </button>
    </app-card>
  `,
})
export class AppComponent {
  title = "angular-standalone";
}
```

The `imports` array in the component decorator should feel similar to defining imports using `NgModule`.

This is a lot less code! I'm a big believer in solutions that involve writing less code due to abstraction or generation because it makes it that much easier to maintain. We've just scratched the surface of exploring standalone components. In a future post, we'll explore routing and providers.
