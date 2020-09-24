import { Component, HostBinding, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { SampleDialogComponent } from "./sample-dialog/sample-dialog.component";
import { OverlayContainer } from "@angular/cdk/overlay";
import { fromEvent } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "Angular material dark mode";

  @HostBinding("class") className = "";

  toggleControl = new FormControl(false);

  constructor(private dialog: MatDialog, private overlay: OverlayContainer) {}

  ngOnInit(): void {
    if (window.matchMedia) {
      this.setColorScheme(this.getPreferredColorScheme());
      const colorSchemeQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      const changes = fromEvent(colorSchemeQuery, "change");
      changes.subscribe(event => {
        console.log(event);
        this.setColorScheme(this.getPreferredColorScheme());
      });
    }
  }

  showDialog(): void {
    this.dialog.open(SampleDialogComponent, {
      width: "500px"
    });
  }

  setColorScheme(scheme: string): void {
    this.className = scheme;
  }

  getPreferredColorScheme(): string {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "darkMode";
    } else {
      return "";
    }
  }
}
