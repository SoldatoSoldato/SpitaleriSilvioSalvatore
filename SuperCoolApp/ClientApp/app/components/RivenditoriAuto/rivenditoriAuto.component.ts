import { Component, Inject } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';

@Component({
    selector: 'students',
    templateUrl: './rivenditoriAuto.component.html',
    styleUrls: ['./rivenditoriAuto.component.css']
})
export class RivenditoriAutoComponent {
    public rivenditoriAuto: RivenditoreAuto[];
    public selectedRivenditoreAuto: RivenditoreAuto | undefined;

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        this.refreshData();
    }

    async refreshData() {
        this.http.get(this.baseUrl + 'api/RivenditoriAuto').subscribe(result => {
            let rivenditoreAutoList = [];

            for (let rivAuto of result.json() as RivenditoreAuto[]) {

                let rivenditoreAuto = new RivenditoreAuto();
                rivenditoreAuto.ID = rivAuto.ID;
                rivenditoreAuto.nome = rivAuto.nome;
                rivenditoreAuto.PIva = rivAuto.PIva;
                rivenditoreAuto.indirizzo = rivAuto.indirizzo;
                rivenditoreAuto.email = rivAuto.email;
                rivenditoreAuto.telefono = rivAuto.telefono;
                rivenditoreAuto.descrizione = rivAuto.descrizione;
                rivenditoreAuto.hasChanges = false;
                rivenditoreAutoList.push(rivenditoreAuto);
            }

            console.log("ok");

            this.rivenditoriAuto = rivenditoreAutoList;

            this.selectRivenditoreAuto();
        }, error => console.error(error));
    }


    selectRivenditoreAuto(): void {

        this.selectedRivenditoreAuto = undefined;

        for (let rivAuto of this.rivenditoriAuto) {
            if (rivAuto.deleted == false) {
                this.selectedRivenditoreAuto = rivAuto;
                break;
            }

        }
    }


    async putData(): Promise<void> {
        let headers = new Headers({ 'Content-Type': 'application/json' });

        let serverCalls = [];

        for (let rivenditoreAuto of this.rivenditoriAuto) {
            if (rivenditoreAuto.hasChanges == true || rivenditoreAuto.deleted) {

                let json = JSON.stringify(rivenditoreAuto.toJSON());

                if (!rivenditoreAuto.ID) { //create
                    if (!rivenditoreAuto.deleted) {
                        let call = this.http.put(this.baseUrl + 'api/RivenditoriAuto', json, { headers: headers });
                        serverCalls.push(call);
                    }
                }
                else {
                    if (rivenditoreAuto.deleted) {
                        let url = this.baseUrl + 'api/RivenditoriAuto?id=' + rivenditoreAuto.ID;
                        let call = this.http.delete(url, { headers: headers });
                        serverCalls.push(call);
                    }
                    else {
                        let call = this.http.post(this.baseUrl + 'api/RivenditoriAuto', json, { headers: headers });
                        serverCalls.push(call);
                    }

                }
            }
        }
        Observable.forkJoin(serverCalls)
            .subscribe(data => {
                this.refreshData();
            }, error => console.error(error));


    }

    onSelect(rivenditoreAuto: RivenditoreAuto): void {

        if (rivenditoreAuto.deleted == false) {
            this.selectedRivenditoreAuto = rivenditoreAuto;
        }
    }

    addNewRivenditoreAuto(): void {
        this.selectedRivenditoreAuto = new RivenditoreAuto();
        this.selectedRivenditoreAuto.hasChanges = true;
        this.rivenditoriAuto.push(this.selectedRivenditoreAuto);
    }

    async saveChanges(): Promise<void> {
        await this.putData();
        //console.log("update completed");
        //await this.refreshData();
    }

    delete(rivenditoreAuto: RivenditoreAuto): void {
        rivenditoreAuto.deleted = true;
        this.selectRivenditoreAuto();
    }
}

class RivenditoreAuto {
    ID: number;
    private _nome: string = "";
    private _PIva: string = "";
    private _indirizzo: string = "";
    private _email: string = "";
    private _telefono: Int16Array;
    private _descrizione: string = "";
    public hasChanges: boolean;
    public deleted: boolean = false;

    //Metodi get
    get nome(): string {
        return this._nome;
    }
    get PIva(): string {
        return this._PIva;
    }
    get indirizzo(): string {
        return this._indirizzo;
    }
    get email(): string {
        return this._email;
    }
    get telefono(): Int16Array {
        return this._telefono;
    }
    get descrizione(): string {
        return this._descrizione;
    }
    //Metodi set
    set nome(nome: string) {
        this._nome = nome;
        this.hasChanges = true;
        console.log("set nome");
    }
    set PIva(PIva: string) {
        this._PIva = PIva;
        this.hasChanges = true;
        console.log("set PIva");
    }
    set indirizzo(indirizzo: string) {
        this._indirizzo = indirizzo;
        this.hasChanges = true;
        console.log("set indirizzo");
    }
    set email(email: string) {
        this._email = email;
        this.hasChanges = true;
        console.log("set email");
    }
    set telefono(telefono: Int16Array) {
        this._telefono = telefono;
        this.hasChanges = true;
        console.log("set telefono");
    }
    set descrizione(descrizione: string) {
        this._descrizione = descrizione;
        this.hasChanges = true;
        console.log("set desccrizione");
    }
    //JSON
    public toJSON() {
        return {
            ID: this.ID,
            nome: this._nome,
            PIva: this._PIva,
            indirizzo: this._indirizzo,
            email: this._email,
            telefono: this._telefono,
            descrizione: this._descrizione,
        };
    };
}
