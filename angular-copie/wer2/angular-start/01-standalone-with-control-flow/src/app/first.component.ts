import { Component, input, Input } from "@angular/core";

@Component({
  selector: "app-first",
  //template: `<p>{{ text }}</p>`,
  template: `<p>{{ text() }}</p>`,
})
export class FirstComponent {
  // tak można
  //@Input() text = "Example..";
  // alnbo przez sygnal
  text = input("Example..");
  //input.required();
}
