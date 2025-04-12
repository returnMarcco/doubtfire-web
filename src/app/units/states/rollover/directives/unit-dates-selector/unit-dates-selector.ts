import { Component } from "@angular/core";
import { DoubtfireConstants } from "src/app/config/constants/doubtfire-constants";
import { AlertService } from "src/app/common/services/alert.service";
import { TeachingPeriodService } from "src/app/api/services/teaching-period.service";

// Todo @Jason: Set types for everything
// Todo @Jason: Write docblocks
// Todo @Jason: Test this code - currently untested
@Component({
  selector: 'unit-dates-selector',
  templateUrl: 'units/states/rollover/directives/unit-dates-selector/unit-dates-selector.tpl.html',
})
export class UnitDatesSelector {
  calOptions = { startOpened: false,endOpened: false };
  dateOptions = { formatYear: 'yy', startingDay: 1 };
  externalName;
  saveData;
  teachingPeriodValues;

  // Inject the following into this component.
  constructor(
    private alertService: AlertService,
    private doubtfireConstants: DoubtfireConstants,
    private teachingPeriodService: TeachingPeriodService
  ) {
    this.externalName = doubtfireConstants.ExternalName;

    this.saveData = {
      // id: $scope.unit.id, // Todo @Jason: Find where this comes from and set it here.
      toPeriod: null,
      startDate: null,
      endDate: null
    };

    this.teachingPeriodService.cache.values.subscribe((periods) => {
      this.teachingPeriodValues = [{ value: undefined, text: "None" }]

      const other = periods.filter((tp: object) => {
        return tp.endDate > Date.now()
      }).map(p => ({ value: p, text: `${p.year} ${p.period}` }));

      other.forEach(date => this.teachingPeriodValues.push(date));
    });
  }

  teachingPeriodSelected(event) {
    this.saveData.toPeriod = event;
  }

  open(event, pickerData) {
    event.preventDefault();
    event.stopPropogation();

    if (pickerData === 'start') {
      this.calOptions.startOpened = !this.calOptions.startOpened;
      this.calOptions.endOpened = false;
    } else {
      this.calOptions.startOpened = false;
      this.calOptions.endOpened = !this.calOptions.endOpened;
    }
  }

  saveUnit() {
    let body = null;

    if (this.saveData.toPeriod) {
      body = { teaching_period_id: this.saveData.toPeriod.id }
    } else {
      body = {
        start_date: this.saveData.startDate,
        end_date: this.saveData.endDate
      }
    }

    this.unit.rolloverTo(body).subscribe({
      next(response) {
        this.alertService.success("Unit created.", 2000);
        this.state.go("units/admin", { unitId: response.id }); // Todo @Jason: Find where this comes from and set it here.
        toPeriod: null,
      },

      error(response) {
        return `${this.alertService.error} "Error creating unit - ${response}`
      }
    });
  }
}