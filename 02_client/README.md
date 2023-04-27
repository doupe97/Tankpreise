# Project: Web-Technologie

# Schritte zum Aufsetzen der React-App:
1. Download + Installation von NodeJS inkl. NPM (Was ist NodeJS bzw. NPM überhaupt?)
2. Erstellen eines neuen Verzeichnisses für das Aufsetzen einer neuen React-App
3. Über VS-Code ein Terminal öffnen und in den neu erstellten Ordner navigieren
4. Nun über das Terminal den folgenden Befehl ausführen zum Anlegen einer neuen React-App:
        - npx create-react-app web-tech-project
5. Mit den folgenden Befehlen wurden zusätzlich benötigte React-Module für das Projekt nachinstalliert:
        - npm install axios               --> API Aufrufe bei Tankerkönig & Google Maps
        - npm install react-bootstrap     --> Designelemente
        - npm install react-geocode       --> Für Konvertierung lat / lng zu Adressen


# Tankerkönig API
API-Key: be6630ee-79b4-3deb-aa2b-8d4e66b1924f

# URL für Tankstellenliste:
https://creativecommons.tankerkoenig.de/json/list.php?lat=52.52099975265203&lng=13.43803882598877&rad=4&sort=price&type=diesel&apikey=be6630ee-79b4-3deb-aa2b-8d4e66b1924f

# URL für Details einer Tankstelle:
https://creativecommons.tankerkoenig.de/json/detail.php?id=005056ba-7cb6-1ed2-bceb-90e59ad2cd35&apikey=be6630ee-79b4-3deb-aa2b-8d4e66b1924f

Response:
{
        "id": "51d4b660-a095-1aa0-e100-80009459e03a",
        "name": "JET BERLIN HERZBERGSTR. 27",
        "brand": "JET",
        "street": "HERZBERGSTR.",
        "place": "BERLIN",
        "lat": 52.5262,
        "lng": 13.4886,
        "dist": 3.5,
        "price": 1.509,
        "isOpen": true,
        "houseNumber": "27",
        "postCode": 10365
}

# API-Doku
https://creativecommons.tankerkoenig.de/?page=info

# Overview response properties 
lat     float, geographische Breite                             z.B. 52.53083
lng     float, geographische Länge                              z.B. 13.440946
dist    float, Entfernung zum Suchstandort in km                z.B. 1.1
rad     float, Suchradius in km (max 25 km)                     z.B. 5
type    enum, Spritsorte                                        z.B. 'e5', 'e10', 'diesel', 'all'
sort    enum, Sortierung der Ergebnisse                         z.B. price, dist


# Google Maps API
Erneuerung des API-Keys, wenn Testversion abgelaufen: https://www.friendventure.de/blog/faq/google-maps-api-key-erstellen-schritt-fuer-schritt-anleitung/
API-Key: AIzaSyCAAkDnHxm3Cg_n2Wsh31E0i49RsXTvI9s (aktuell genutzt)
API-Key: AIzaSyBAMy51nbUSVgGAn-9_0HboywdQF138Yk8 (abgelaufen)


# Deployment / Hosting
Anleitung für Hosting in XAMPP:
https://medium.com/@nutanbhogendrasharma/create-simple-reactjs-application-and-host-in-xampp-4dae8e466c50

# Frontend starten (React)
1. Unter "web-tech-project/02_client" wechseln
2. Befehl: "npm start" absetzen

# Backend starten (node.js)
1. Unter "web-tech-project/03_server" wechseln
2. Befehl: "npm run devStart" absetzen

# XAMPP-Dienste
XAMPP-Version (MacOS) = 7.4.27-1
1. Dienst: "Apache Web Server" starten
2. Dienst: "MySQL Database" über Port 3306 starten


# Dokumentation der Schritte zum XAMPP Deployment unter MacOS Monterey 12.0.1

# Part 1 - Vorbereitung des Programmcodes für lokales Apache Hosting (Deployment)
1. Unter "web-tech-project/02_client/public" wechseln
2. Neue Datei mit Namen ".htaccess" anlegen und folgendes in die Datei einfügen:
        Options -MultiViews
        RewriteEngine On
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteRule ^ index.html [QSA,L]
3. Unter "web-tech-project/02_client" wechseln
4. Datei "package.json" öffnen und folgendes Attribut einfügen:
        "homepage": "https://tankstellenpreise.de"
5. Befehl: "npm run build" absetzen
        --> jetzt sollte unter "web-tech-project/02_client" ein neuer Ordner mit dem Namen "build" erstellt worden sein
        --> ebenfalls sollte im "build"-Ordner die Datei ".htaccess" (versteckte Datei) zu finden sein
6. Alle Dateien unter "web-tech-project/02_client/build" nach "/Applications/XAMPP/xamppfiles/tankstellenpreise" kopieren
        --> WICHTIG: darauf achten, dass auch die versteckte Datei ".htaccess" mit kopiert wird!


# Part 2 - Lokalen DNS-Eintrag setzen
1. Befehl: "sudo nano /etc/hosts" absetzen und folgenden Eintrag in der Datei ergänzen für lokale DNS-Auflösung der Domäne:
        127.0.0.1	tankstellenpreise.de


# Part 3 - Erstellen eines eigenen SSL-Zertifikats für HTTPS-Hosting
Bereits erstellte Zertifikatsdateien im Repo unter "02_client/cert"
--> Diese müssen nur noch in den lokalen Zertifikatsspeicher hinzugefügt werden!
Die nachfolgenden Schritte müssen nur ausgeführt werden, wenn das Zertifikat neu erstellt werden muss 

1. Unter "/Applications/XAMPP/xamppfiles/etc/ssl" wechseln
2. Befehl ausführen: openssl req -new -newkey rsa:4096 -nodes -keyout cert_wtp.key -out cert_wtp.csr
        Folgende Informationen angeben:
        Country Name (2 letter code):DE
        State or Province Name (full name):NRW
        Locality Name (eg, city):Bonn
        Organization Name (eg, company):WebTechProjectTeam
        Organizational Unit Name (eg, section):DEV
        Common Name (e.g. server FQDN or YOUR name): tankstellenpreise.de
        Email Address:506932@fom-net.de
3. Befehl ausführen: touch vhosts_dns.ext
        In die erzeugte Datei folgenden Inhalt schreiben:
        authorityKeyIdentifier=keyid,issuer
        basicConstraints=CA:FALSE
        keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
        subjectAltName = @alt_names
        [alt_names]
        DNS.1 = tankstellenpreise.de
4. Befehl ausführen: openssl x509 -req -sha256 -extfile vhosts_dns.ext -days 365 -in cert_wtp.csr -signkey cert_wtp.key -out cert_wtp.crt
        --> Nun sollten im aktuellen Verzeichnis "cert_wtp.key" und "cert_wtp.crt" erstellt worden sein
5. Doppelklick auf "cert_wtp.crt" zum Hinzufügen in den lokalen Zertifikatsspeicher --> immer vertrauen wählen unter Vertrauen


# Part 4 - Einrichtung Virtual Host mit SSL für https-Verbindungen (HTTPS)
1. "/Applications/XAMPP/xamppfiles/etc/httpd.conf" öffnen
2. Folgende Zeile einkommentieren zum Aktivieren (der Funktionalität):
        Include etc/extra/httpd-vhosts.conf
3. "/Applications/XAMPP/xamppfiles/etc/extra/httpd-ssl.conf" öffnen
4. Folgenden Eintrag am Ende der Datei hinzufügen:
        <VirtualHost *:443>
                ServerName tankstellenpreise.de
                DocumentRoot "/Applications/XAMPP/xamppfiles/tankstellenpreise"
                SSLEngine on
                SSLCertificateFile "/Applications/XAMPP/xamppfiles/etc/ssl/cert_wtp.crt"
                SSLCertificateKeyFile "/Applications/XAMPP/xamppfiles/etc/ssl/cert_wtp.key"
                <Directory "/Applications/XAMPP/xamppfiles/tankstellenpreise">
                        Options Indexes FollowSymLinks Includes ExecCGI
                        AllowOverride All
                        Require all granted
                </Directory>
                ErrorLog "logs/tankstellenpreise_SSL.de-error_log"
        </VirtualHost>