import { Component, computed, input, Input } from "@angular/core";

@Component({
  selector: "app-first",
  template: ` <h1>{{ text() }}</h1> `,
})
export class FirstComponent {
  // @Input() text = "Example...";
  text = input("Example...");
  //   a = input.required();

  text2 = computed(() => {
    return this.text();
  });
}
