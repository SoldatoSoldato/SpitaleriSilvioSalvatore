import { Component, Inject } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';

@Component({
    selector: 'students',
    templateUrl: './vetture.component.html',
    styleUrls: ['./vetture.component.css']
})
export class VettureComponent {
    public vetture: Vettura[];
    public selectedVettura: Vettura | undefined;

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        this.refreshData();
    }

    async refreshData() {
        this.http.get(this.baseUrl + 'api/vetture').subscribe(result => {
            let vetturaList = [];

            for (let vett of result.json() as Vettura[]) {

                let vettura = new Vettura();
                vettura.ID = vett.ID;
                vettura.marca = vett.marca;
                vettura.modello = vett.modello;
                vettura.colore = vett.colore;
                vettura.numPorte = vett.numPorte;
                vettura.numTelaio = vett.numTelaio;
                vettura.targa = vett.targa;
                vettura.prezzo = vett.prezzo;
                vettura.IDRivenditoreAuto = vett.IDRivenditoreAuto;
                vettura.IDCliente = vett.IDCliente;
                vettura.hasChanges = false;
                vetturaList.push(vettura);
            }

            console.log("ok");

            this.vetture = vetturaList;

            this.selectVettura();
        }, error => console.error(error));
    }


    selectVettura(): void {

        this.selectedVettura = undefined;

        for (let vett of this.vetture) {
            if (vett.deleted == false) {
                this.selectedVettura = vett;
                break;
            }

        }
    }


    async putData(): Promise<void> {
        let headers = new Headers({ 'Content-Type': 'application/json' });

        let serverCalls = [];

        for (let vettura of this.vetture) {
            if (vettura.hasChanges == true || vettura.deleted) {

                let json = JSON.stringify(vettura.toJSON());

                if (!vettura.ID) { //create
                    if (!vettura.deleted) {
                        let call = this.http.put(this.baseUrl + 'api/vetture', json, { headers: headers });
                        serverCalls.push(call);
                    }
                }
                else {
                    if (vettura.deleted) {
                        let url = this.baseUrl + 'api/vetture?id=' + vettura.ID;
                        let call = this.http.delete(url, { headers: headers });
                        serverCalls.push(call);
                    }
                    else {
                        let call = this.http.post(this.baseUrl + 'api/vetture', json, { headers: headers });
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

    onSelect(vettura: Vettura): void {

        if (vettura.deleted == false) {
            this.selectedVettura = vettura;
        }
    }

    addNewVettura(): void {
        this.selectedVettura = new Vettura();
        this.selectedVettura.hasChanges = true;
        this.vetture.push(this.selectedVettura);
    }

    async saveChanges(): Promise<void> {
        await this.putData();
        //console.log("update completed");
        //await this.refreshData();
    }

    delete(vettura: Vettura): void {
        vettura.deleted = true;
        this.selectVettura();
    }
}

class Vettura {
    ID: number;
    private _marca: string = "";
    private _modello: string = "";
    private _colore: string = "";
    private _numPorte: Int16Array;
    private _numTelaio: Int16Array;
    private _targa: string = "";
    private _prezzo: DoubleRange;
    private _IDRivenditoreAuto: Int16Array;
    private _IDCliente: Int16Array;
    public hasChanges: boolean;
    public deleted: boolean = false;

    //Metodi get
    get marca(): string {
        return this._marca;
    }
    get modello(): string {
        return this._modello;
    }
    get colore(): string {
        return this._colore;
    }
    get numPorte(): Int16Array {
        return this._numPorte;
    }
    get numTelaio(): Int16Array {
        return this._numTelaio;
    }
    get targa(): string {
        return this._targa;
    }
    get prezzo(): DoubleRange{
        return this._prezzo;
    }
    get IDRivenditoreAuto(): Int16Array {
        return this._IDRivenditoreAuto;
    }
    get IDCliente(): Int16Array {
        return this._IDCliente;
    }
    //Metodi set
    set marca(marca: string) {
        this._marca = marca;
        this.hasChanges = true;
        console.log("set marca");
    }
    set modello(modello: string) {
        this._modello= modello;
        this.hasChanges = true;
        console.log("set modello");
    }
    set colore(colore: string) {
        this._colore= colore;
        this.hasChanges = true;
        console.log("set colore");
    }
    set numPorte(numPorte: Int16Array) {
        this._numPorte = numPorte;
        this.hasChanges = true;
        console.log("set numPorte");
    }
    set numTelaio(numTelaio: Int16Array) {
        this._numTelaio= numTelaio;
        this.hasChanges = true;
        console.log("set numTelaio");
    }
    set targa(targa: string) {
        this._targa = targa;
        this.hasChanges = true;
        console.log("set targa");
    }
    set prezzo(prezzo: DoubleRange) {
        this._prezzo = prezzo;
        this.hasChanges = true;
        console.log("set prezzo");
    }
    set IDRivenditoreAuto(IDRivenditoreAuto: Int16Array) {
        this._IDRivenditoreAuto = IDRivenditoreAuto;
        this.hasChanges = true;
        console.log("set IDRivenditoreAuto");
    }
    set IDCliente(IDCliente: Int16Array) {
        this._IDCliente = IDCliente;
        this.hasChanges = true;
        console.log("set IDCliente");
    }
    //JSON
    public toJSON() {
        return {
            ID: this.ID,
            marca: this._marca,
            modello: this._modello,
            colore: this._colore,
            numPorte: this._numPorte,
            numTelaio: this._numTelaio,
            targa: this._targa,
            prezzo: this._prezzo,
            IDRivenditoreAuto: this._IDRivenditoreAuto,
            IDCliente: this._IDCliente,
        };
    };
}
