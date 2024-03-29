import {Component, Input, OnChanges} from '@angular/core';
import {Team} from '../../../Model/team';
import {ChartElement} from '../../../Interface/chart-element';
import {TeamService} from '../../../Service/team.service';
import {NameService} from '../../../Service/name.service';

@Component({
  selector: 'app-team-charts-role',
  templateUrl: './team-charts-role.component.html',
  styleUrls: ['./team-charts-role.component.css']
})
export class TeamChartsRoleComponent implements OnChanges {
  @Input() team: Team;
  @Input() role: string;
  names: Array<string> = [];
  spAqualifierBacAffinnage: Array<number> = [];
  spAfaire: Array<number> = [];
  spEnAttente: Array<number> = [];
  spRefuseEnRecette: Array<number> = [];
  spEncoursDevTermineTestCroise: Array<number> = [];
  spAlivrer: Array<number> = [];
  spATester: Array<number> = [];
  spValideEnRecetteLivreTermine: Array<number> = [];

  constructor(){}

  ngOnChanges(): void {
    if (typeof this.team !== 'undefined' && typeof this.role !== 'undefined') {
      this.resetValues();
      const all: ChartElement = TeamService.generateEmptyChartElement(NameService.prettyString(this.role));
      for (const c of this.team.collaborators) {
        if (c.role.toUpperCase().includes(this.role.toUpperCase())) {
          const elem = TeamService.generateChartElement(c);
          this.pushElement(elem);
          TeamService.updateChartElement(c, all);
        }
      }
      this.unshiftElement(all);
    }
  }

  pushElement(elem: ChartElement): void{
    this.names.push(elem.name);
    this.spAqualifierBacAffinnage.push(elem.aQualifierBacAffinnage);
    this.spAfaire.push(elem.aFaire);
    this.spEnAttente.push(elem.enAttente);
    this.spRefuseEnRecette.push(elem.refuseEnRecette);
    this.spEncoursDevTermineTestCroise.push(elem.enCoursDevTermineTestCroise);
    this.spAlivrer.push(elem.aLivrer);
    this.spATester.push(elem.aTester);
    this.spValideEnRecetteLivreTermine.push(elem.valideEnRecetteLivreTermine);
  }

  unshiftElement(elem: ChartElement): void{
    this.names.unshift(elem.name);
    this.spAqualifierBacAffinnage.unshift(elem.aQualifierBacAffinnage);
    this.spAfaire.unshift(elem.aFaire);
    this.spEnAttente.unshift(elem.enAttente);
    this.spRefuseEnRecette.unshift(elem.refuseEnRecette);
    this.spEncoursDevTermineTestCroise.unshift(elem.enCoursDevTermineTestCroise);
    this.spAlivrer.unshift(elem.aLivrer);
    this.spATester.unshift(elem.aTester);
    this.spValideEnRecetteLivreTermine.unshift(elem.valideEnRecetteLivreTermine);
  }

  resetValues(): void{
    this.names = [];
    this.spAqualifierBacAffinnage = [];
    this.spAfaire = [];
    this.spEnAttente = [];
    this.spRefuseEnRecette = [];
    this.spEncoursDevTermineTestCroise = [];
    this.spAlivrer = [];
    this.spATester = [];
    this.spValideEnRecetteLivreTermine = [];
  }
}

