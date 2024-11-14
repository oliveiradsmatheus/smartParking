#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>

String IP = "192.168.6.229";
unsigned long timeout = 5000;
const char *REDE = "N5";
const char *SENHA = "desconhecido123";

bool WifiOn();
void conectar();
void EsperarRespostaIP();
void ProcessarResposta_API(int httpResposta, HTTPClient &http);

// cppcheck-suppress unusedFunction
void setup() {
    Serial.begin(115200);
    Serial1.begin(115200, SERIAL_8N1, 16, 17);
    pinMode(2, OUTPUT);
    EsperarRespostaIP();
    conectar();
}

// cppcheck-suppress unusedFunction
void loop() {
	if (!WifiOn()) {
		Serial.println("Reconectando ao WiFi...");
		conectar();
	}
	if (Serial1.available()) {
		if (WifiOn()) {
			String resp = Serial1.readString();
			Serial.println("\n\n\nResposta Recebida Mega: " + resp);
			if (resp != "") {
				int httpResposta;
				HTTPClient http;
				String payload = "", estado = "", id = "";
				if (resp[0] == '0') {	// PATCH para tabela sensor PATCH:ID_SENSOR:ESTADO
					id = resp.substring(2, resp.indexOf(':', 2));	   		// Extrai id
					estado = resp.substring(resp.indexOf(':', 2) + 1); 		// Extrai estado
					Serial.println("Msg Mega: "+id+" / "+estado);
					http.begin("http://" + IP + ":5000/sensores/" + id + "/" + estado);
					httpResposta = http.PUT("");
					ProcessarResposta_API(httpResposta, http);
				}
				else if (resp[0] == '1') {		// PATCH para tabela ocupacao PATCH:ID_Ocupacao
					id = resp.substring(resp.indexOf(':') + 1);
					Serial.println("Msg Mega: "+id);
					http.begin("http://" + IP + ":5000/ocupacoes/" + id);
					httpResposta = http.PUT("");
					ProcessarResposta_API(httpResposta, http);
				}
				else if (resp[0] == '2') {		// POST para tabela ocupacao POST:ID_SENSOR
					id = resp.substring(resp.indexOf(':') + 1);
					Serial.println("Msg Mega: "+id);
					http.begin("http://" + IP + ":5000/ocupacoes/" + id);
					httpResposta = http.POST("");
					ProcessarResposta_API(httpResposta, http);
				}
				else {
					Serial.println("Msg Mega Vazia !!!");
				}
				http.end();
			}
		}
		else {
			Serial1.print("WiFi Off");
			Serial.println("Reconectando ao WiFi...");
			conectar();
		}
	}
}
//===============================================//

//-----------------------------------------------//

//===============================================//
void ProcessarResposta_API(int httpResposta, HTTPClient &http) {
	String resp = "", resp2 = "";
	if (httpResposta > 0) {
		resp = http.getString();
		Serial.print("Resposta API: " + resp);
		Serial1.print(resp);
	}
	else if (httpResposta == -1) {
		resp = String(httpResposta);
		Serial.print("API Offline!, ERRO: " + resp);
		Serial1.print(resp);
	}
	else {
		resp = String(httpResposta);
		resp2 = String(http.getString());
		Serial.print("ERRO!: " + resp + " : " + resp2);
		Serial1.print(resp2);
	}
}

void EsperarRespostaIP() {
	String resposta = "";
	unsigned long startTime = millis();
	Serial.println("Digite o IP da req p/ HTTP !");
	while (millis() - startTime < timeout) {
		if (Serial.available()) {
			resposta = Serial.readStringUntil('\n');
			Serial.println("Novo IP p/ req HTTP: " + resposta);
			IP = resposta;
			break;
		}
	}
	if (resposta == ""){
		Serial.println("Sem Resposta do Novo IP p/ req HTTP !!!");
		Serial.println("Alocado: IP Padrao " + IP);
	}
	else{
		Serial.println("Alocado: Novo IP " + IP);
	}
}

bool WifiOn() {
	return WiFi.status() == WL_CONNECTED;
}

void conectar() {
	WiFi.mode(WIFI_OFF);
	delay(1000);
	int t = 10;
	WiFi.mode(WIFI_STA);
	delay(500);
	WiFi.begin(REDE, SENHA);
	while (WiFi.status() != WL_CONNECTED && t > 0) {
		delay(1000);
		Serial.print(".");
		t--;
	}
	if (WiFi.status() == WL_CONNECTED) {
		Serial.println(WiFi.localIP());
		digitalWrite(2, HIGH);
		Serial.println("\nConectado...yeey :)");
	}
	else {
		Serial.println("\nFalha ao conectar ao WiFi");
	}
}