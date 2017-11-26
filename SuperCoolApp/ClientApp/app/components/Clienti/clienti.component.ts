import { Component, Inject } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';

@Component({
    selector: 'students',
    templateUrl: './clienti.component.html',
    styleUrls: ['./clienti.component.css']
})
export class ClientiComponent {
    public Clienti: Cliente[];
    public selectedCliente: Cliente | undefined;

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        this.refreshData();
    }

    async refreshData() {
        this.http.get(this.baseUrl + 'api/Clienti').subscribe(result => {
            let clienteList = [];

            for (let clt of result.json() as Cliente[]) {

                let cliente = new Cliente();
                cliente.ID = clt.ID;
                cliente.nome = clt.nome;
                cliente.cognome = clt.cognome;
                cliente.sesso = clt.sesso;
                cliente.indirizzo = clt.indirizzo;
                cliente.dataNascita = clt.dataNascita;
                cliente.telefono = clt.telefono;
                cliente.email = clt.email;
                cliente.hasChanges = false;
                clienteList.push(cliente);
            }

            console.log("ok");

            this.Clienti = clienteList;

            this.selectStudent();
        }, error => console.error(error));
    }


    selectStudent(): void {

        this.selectedCliente= undefined;

        for (let clt of this.Clienti) {
            if (clt.deleted == false) {
                this.selectedCliente = clt;
                break;
            }

        }
    }


    async putData(): Promise<void> {
        let headers = new Headers({ 'Content-Type': 'application/json' });

        let serverCalls = [];

        for (let cliente of this.Clienti) {
            if (cliente.hasChanges == true || cliente.deleted) {

                let json = JSON.stringify(cliente.toJSON());

                if (!cliente.ID) { //create
                    if (!cliente.deleted) {
                        let call = this.http.put(this.baseUrl + 'api/Clienti', json, { headers: headers });
                        serverCalls.push(call);
                    }
                }
                else {
                    if (cliente.deleted) {
                        let url = this.baseUrl + 'api/Clienti?id=' + cliente.ID;
                        let call = this.http.delete(url, { headers: headers });
                        serverCalls.push(call);
                    }
                    else {
                        let call = this.http.post(this.baseUrl + 'api/Clienti', json, { headers: headers });
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

    onSelect(cliente: Cliente): void {

        if (cliente.deleted == false) {
            this.selectedCliente = cliente;
        }
    }

    addNewCliente(): void {
        this.selectedCliente= new Cliente();
        this.selectedCliente.hasChanges = true;
        this.Clienti.push(this.selectedCliente);
    }

    async saveChanges(): Promise<void> {
        await this.putData();
        //console.log("update completed");
        //await this.refreshData();
    }

    delete(cliente: Cliente): void {
        cliente.deleted = true;
        this.selectStudent();
    }
}

class Cliente {
    ID: number;

    private _cf: string = "";
    private _nome: string = "";
    private _cognome: string = "";
    private _sesso: string = "";
    private _indirizzo: string = "";
    private _dataNascita: Date;
    private _telefono: Int16Array;
    private _email: string = "";
    public hasChanges: boolean;
    public deleted: boolean = false;

    //Metodi get degli attributi
    get cf(): string {
        return this._cf;
    }
    get nome(): string {
        return this._nome;
    }
    get cognome(): string {
        return this._cognome;
    }
    get sesso(): string {
        return this._sesso;
    }
    get indirizzo(): string {
        return this._indirizzo;
    }
    get dataNascita(): Date {
        return this._dataNascita;
    }
    get telefono(): Int16Array {
        return this._telefono;
    }
    get email(): string {
        return this._email;
    }
    //Metodi set degli attributi

    set cf(cf: string) {
        this._cf=cf;
        this.hasChanges = true;
        console.log("set cf");
    }
    set nome(nome: string) {
        this._nome = nome;
        this.hasChanges = true;
        console.log("set nome");
    }
    set cognome(cognome: string) {
        this._cognome = cognome;
        this.hasChanges = true;
        console.log("set cognome");
    }
    set sesso(sesso: string) {
        this._sesso= sesso;
        this.hasChanges = true;
        console.log("set sesso");
    }
    set indirizzo(indirizzo: string) {
        this._indirizzo= indirizzo;
        this.hasChanges = true;
        console.log("set indirizzo");
    }
    set dataNascita(d: Date) {
        this._dataNascita= d;
        this.hasChanges = true;
        console.log("set dataNascita");
    }
    set telefono(telefono: Int16Array) {
        this._telefono = telefono;
        this.hasChanges = true;
        console.log("set telefono");
    }
    set email(email: string) {
        this._email = email;
        this.hasChanges = true;
        console.log("set email");
    }
    //JSON
    public toJSON() {
        return {
            ID: this.ID,
            nome: this._nome,
            cognome: this._cognome,
            sesso: this._sesso,
            indirizzo: this._indirizzo,
            dataNascita: this._dataNascita,
            telefono: this._email,
            email: this._email,
        };
    };
}
