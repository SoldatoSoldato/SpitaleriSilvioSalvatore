using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceAPI.Dal
{

    public class Cliente
    {
        public int ID { get; set; }
        public string CF { get; set; }
        public string Nome { get; set; }
        public string Cognome { get; set; }
        public string Sesso { get; set; }//M per maschio e F per femmina
        public string Indirizzo { get; set; }
        public DateTime DataNascita { get; set; }
        public int Telefono { get; set; }
        public string Email { get; set; }
    }

    public class Vettura
    {
        public int ID { get; set; }
        public string Marca { get; set; }
        public string Modello { get; set; }
        public string Colore { get; set; }
        public int NumPorte { get; set; }
        public int NumTelaio { get; set; } 
        public string Targa { get; set; }
        public double Prezzo { get; set; }
        public int IDRivenditoreAuto { get; set; }
        public int IDCliente { get; set; }
    }
    public class RivenditoreAuto
    {
        public int ID { get; set; }
        public string Nome { get; set; }
        public string PIva { get; set; }
        public string Indirizzo { get; set; }
        public string Email { get; set; }
        public int Telefono { get; set; }
        public string Descrizione { get; set; }
    }
}
