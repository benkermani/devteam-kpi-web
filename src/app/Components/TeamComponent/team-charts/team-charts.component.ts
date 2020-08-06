import {Component, Input, OnChanges} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {Team} from '../../../Model/team';
import {Collaborator} from '../../../Model/collaborator';
// @ts-ignore
import Chart = require('chart.js');
import {ChartElement} from '../../../Interface/chart-element';


@Component({
    selector: 'app-team-charts',
    templateUrl: './team-charts.component.html',
    styleUrls: ['./team-charts.component.css']
})
export class TeamChartsComponent implements OnChanges {
    @Input() team: Team;
    names: Array<string>;
    spAqualifierBacAffinnage: Array<number>;
    spAfaire: Array<number>;
    spEnAttente: Array<number>;
    spRefuseEnRecette: Array<number>;
    spEncoursDevTermineTestCroise: Array<number>;
    spAlivrer: Array<number>;
    spATester: Array<number>;
    spValideEnRecetteLivreTermine: Array<number>;
    UNASSIGNED_ACCOUNT_ID = 'unassigned';
    barChartOptions: ChartOptions;
    barChartLabels: Label[]; // Collaborators identity
    barChartType: ChartType;
    barChartLegend: boolean;
    barChartPlugins = [];
    barChartData: ChartDataSets[];
    barChartColors: Color[];

    constructor(){
        Chart.defaults.global.defaultFontSize = 18;
        Chart.defaults.global.defaultFontColor = 'black';
        Chart.defaults.global.defaultFontStyle = 'bold';
        this.names = [];
        this.spAqualifierBacAffinnage = [];
        this.spAfaire = [];
        this.spEnAttente = [];
        this.spRefuseEnRecette = [];
        this.spEncoursDevTermineTestCroise = [];
        this.spAlivrer = [];
        this.spATester = [];
        this.spValideEnRecetteLivreTermine = [];
        this.barChartLabels = this.names;
        this.barChartType = 'horizontalBar';
        this.barChartLegend = true;
        this.barChartOptions = {
            title: {
                text: 'Etats des Story Points dans le sprint pour l\' équipe ',
                display: true,
                fontSize: 16,
                fontColor: 'black'
            },
            responsive: true,
            legend: {
                labels: {
                    fontColor: 'black',
                    fontSize: 16,
                }

            }
        };
        this.barChartColors = [
            {backgroundColor: '#696969'}, // Dark grey
            {backgroundColor: '#c0c0c0'}, // Light grey
            {backgroundColor: '#f29120'}, // Orange
            {backgroundColor: 'red'}, // Red
            {backgroundColor: '#4682B4'}, // Dark blue
            {backgroundColor: '#87CEFA'}, // Light blue
            {backgroundColor: '#b1c113'}, // Light green
            {backgroundColor: '#7a9823'}, // Dark green
        ];
        this.barChartData = [
            {data: this.spAqualifierBacAffinnage, label: 'A qualifier/Bac d\'affinage', stack: 'a'},
            {data: this.spAfaire, label: 'A faire', stack: 'a'},
            {data: this.spEnAttente, label: 'En Attente', stack: 'a'},
            {data: this.spRefuseEnRecette, label: 'Refusé en recette', stack: 'a'},
            {data: this.spEncoursDevTermineTestCroise, label: 'En cours/Dev terminé/Test croisé', stack: 'a'},
            {data: this.spAlivrer, label: 'A livrer', stack: 'a'},
            {data: this.spATester, label: 'A tester', stack: 'a'},
            {data: this.spValideEnRecetteLivreTermine, label: 'Validé en recette/Livré/Terminé', stack: 'a'},
        ];
    }

    ngOnChanges(): void {
        if (typeof this.team !== 'undefined') {
            const elem = this.generateChartElement(this.team.name);
            const unassignedElem = this.generateChartElement(this.UNASSIGNED_ACCOUNT_ID);
            for (const c of this.team.collaborators) {
                if (c.accountId !== this.UNASSIGNED_ACCOUNT_ID){
                    this.updateChartElement(c, elem);
                }else{
                    this.updateChartElement(c, unassignedElem);
                }
            }
            this.pushElement(elem);
            this.pushElement(unassignedElem);
        }
    }

    generateChartElement(nameAttribute: string): ChartElement{
        return {
            name: nameAttribute,
            aQualifierBacAffinnage: 0,
            aFaire: 0,
            enAttente: 0,
            refuseEnRecette: 0,
            enCoursDevTermineTestCroise: 0,
            aLivrer: 0,
            aTester: 0,
            valideEnRecetteLivreTermine: 0
        };
    }

    /* Method that push ChartElement's data to each Chart attribute
     *
     */
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

    updateChartElement(c: Collaborator, elem: ChartElement): void{
        elem.aQualifierBacAffinnage += c.spAqualifier + c.spBacAffinage;
        elem.aFaire += c.spAfaire;
        elem.enAttente += c.spEnAttente;
        elem.refuseEnRecette += c.spRefuseEnRecette;
        elem.enCoursDevTermineTestCroise += c.spEncours + c.spDevTermine + c.spTestCroise;
        elem.aLivrer += c.spAlivrer;
        elem.aTester += c.spATester;
        elem.valideEnRecetteLivreTermine += c.spValideEnRecette + c.spLivre + c.spTermine;
    }
}
