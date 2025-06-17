import { Component, computed, inject } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Character } from "./model/Character";
import { CharactersListService } from "./characters-list.service";
import { Router } from "@angular/router";
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
} from "@angular/forms";
import { debounceTime, distinctUntilChanged, tap } from "rxjs";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { API_URL } from "../../app.config";

const customMinLength = (min: number) => {
  return ((control) => {
    return control.value.length >= min
      ? null
      : {
          customMinLength: {
            length: control.value.length,
            minLength: min,
          },
        };
  }) as ValidatorFn;
};

@Component({
  selector: "app-characters-list",
  providers: [
    CharactersListService,
    {
      provide: API_URL,
      useValue: "https://mortyandrickapi.com/api",
    },
  ],
  imports: [
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  template: `
    <!-- <button (click)="navigate()">go to locations</button> -->
    <p>Alive count: {{ alive() }}</p>
    <form [formGroup]="filtersForm" class="flex gap-4 pb-4">
      <div>
        <input
          formControlName="name"
          placeholder="Enter name..."
          class="border-b border-black"
        />
        <p>{{ filtersForm.controls.name.invalid }}</p>
      </div>

      <mat-form-field>
        <mat-label>Gender:</mat-label>
        <mat-select formControlName="gender" name="gender">
          @for (option of genderOptions; track option.value) {
            <mat-option [value]="option.value">{{
              option.viewValue
            }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Status:</mat-label>
        <mat-select formControlName="status" name="status">
          @for (option of statusOptions; track option.value) {
            <mat-option [value]="option.value">{{
              option.viewValue
            }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
    </form>
    @if (!loading() && !error()) {
      @for (character of characters(); track character.id) {
        <div class="flex gap-2 items-center">
          <img class="h-16" [src]="character.image" />
          <p>{{ character.name }}</p>

          @if (character.status === "Alive") {
            <button class="bg-green-500 h-fit" (click)="markAsDead(character)">
              Mark as dead
            </button>
          }
        </div>
      }
    } @else if (loading()) {
      <mat-spinner [diameter]="20" />
    } @else {
      <p>{{ error()?.code }}</p>
    }
  `,
})
export class CharactersList {
  fb = inject(NonNullableFormBuilder);

  filtersForm = this.fb.group({
    name: this.fb.control({ value: "", disabled: false }, [
      // Validators.minLength(3),
      // customMinLength(5),
      // Validators.required,
    ]),
    gender: this.fb.control<Character["gender"] | "">(""),
    status: this.fb.control<Character["status"] | "">(""),
    collection: this.fb.array([]),
  });

  genderOptions: { value: Character["gender"] | ""; viewValue: string }[] = [
    {
      value: "",
      viewValue: "-",
    },
    {
      value: "Female",
      viewValue: "Female",
    },
    {
      value: "Male",
      viewValue: "Male",
    },
    {
      value: "Genderless",
      viewValue: "Genderless",
    },
  ];

  statusOptions: { value: Character["status"] | ""; viewValue: string }[] = [
    {
      value: "",
      viewValue: "-",
    },
    {
      value: "Alive",
      viewValue: "Alive",
    },
    {
      value: "Dead",
      viewValue: "Dead",
    },
    {
      value: "unknown",
      viewValue: "Unknown",
    },
  ];

  service = inject(CharactersListService);
  router = inject(Router);
  characters = this.service.characters;
  loading = this.service.loading;
  error = this.service.error;

  alive = computed(() => {
    const characters = this.characters();

    if (!characters) {
      return null;
    }

    return characters.filter((character) => character.status === "Alive")
      .length;
  });

  url = inject(API_URL);

  ngOnInit() {
    this.filtersForm.controls.name.enable();

    console.log(this.url);
    this.filtersForm.valueChanges
      .pipe(
        debounceTime(400),
        // distinctUntilChanged((prev, curr) => {
        //   return prev.name === curr.name;
        // }),
      )
      .subscribe((value) => {
        console.log(this.filtersForm.controls.name);

        if (this.filtersForm.controls.name.invalid) {
          return;
        }

        this.service.updateParams({
          name: value.name,
          gender: value.gender,
          status: value.status,
        });
      });

    this.filtersForm.markAllAsTouched();
    this.filtersForm.valid;

    this.filtersForm.value;
    this.filtersForm.getRawValue();
  }

  navigate() {
    this.router.navigate(["/locations"]);
  }

  markAsDead(character: Character) {
    this.service.markAsDead(character);
  }
}
