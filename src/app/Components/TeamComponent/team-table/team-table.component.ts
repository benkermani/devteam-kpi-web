import {Component, Input, OnChanges} from '@angular/core';
import {Team} from '../../../Model/team';
import {TableElement} from '../../../Interface/table-element';
import {TeamService} from '../../../Service/team.service';
import {Config} from '../../../Model/config';

@Component({
    selector: 'app-team-table',
    templateUrl: './team-table.component.html',
    styleUrls: ['./team-table.component.css']
})
export class TeamTableComponent implements OnChanges {
    @Input() team: Team;
    ELEMENT_DATA: TableElement[];
    dataSource: TableElement[];
    SCRUM: string;
    LEAD_DEV: string;
    UNASSIGNED_NAME: string;
    UNASSIGNED_ROLE;

    constructor() {
        this.ELEMENT_DATA = [];
        this.dataSource = [];
        this.SCRUM = Config.scrum;
        this.LEAD_DEV = Config.leadDev;
        this.UNASSIGNED_NAME = Config.unassignedName;
        this.UNASSIGNED_ROLE = Config.unassignedRole;
    }

    ngOnChanges(): void {
        if (typeof this.team !== 'undefined') {
            this.resetValues();
            let unassigned: TableElement;
            const total = TeamService.generateEmptyTableElement('Total', 'none');
            for (const c of this.team.collaborators) {
                if (c.getFullName().includes(this.UNASSIGNED_NAME)) {
                    unassigned = TeamService.generateTableElement(c, 0);
                    TeamService.updateTableElement(c, total, 0);
                } else {
                    const velocity = c.getVelocity(this.SCRUM, this.LEAD_DEV);
                    const elem = TeamService.generateTableElement(c, velocity);
                    TeamService.updateTableElement(c, total, velocity);
                    this.ELEMENT_DATA.push(elem);
                }

            }
            this.ELEMENT_DATA.push(unassigned);
            this.ELEMENT_DATA.push(total);
            this.dataSource = this.ELEMENT_DATA;
            console.log(this.dataSource);
        }
    }

    resetValues(): void{
        this.ELEMENT_DATA = [];
        this.dataSource = [];
    }
}
