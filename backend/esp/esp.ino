#include <WiFi.h>
#include <HTTPClient.h>

const String IP = "192.168.177.229";
unsigned long timeout = 1000;

char WifiOn();
void conectar();
String EsperarResposta();
void ProcessarResposta(int httpResposta, HTTPClient& http);

//==================== SETUP ====================//
void setup(){
	Serial.begin(115200);
	pinMode(2,OUTPUT);
	Serial.println("Manda o timeout em 5s !");
	delay(5000);
	if(Serial.available()){
		String stringTimeout = Serial.readStringUntil('\n');
		if(stringTimeout != ""){
			timeout = strtoul(stringTimeout.c_str(), NULL, 10);
			Serial.print("Timeout recebido: ");
			Serial.println(timeout);
		}
	}
	conectar();
}
void loop(){
	if (Serial.available() > 0 && Serial.readStringUntil('\n') == "on") {
		if (WifiOn()) {
			Serial.println("WiFi ON");
			String resp = "";
			resp = EsperarResposta();
			if (resp!="") {
				int httpResposta;
				HTTPClient http;
				String payload="", estado="", id="";
				if (resp[0] == '0') {// PATCH para tabela sensor PATCH:ID_SENSOR:ESTADO
					id = resp.substring(2, resp.indexOf(':', 2)); // Extrai id
					estado = resp.substring(resp.indexOf(':', 2) + 1); // Extrai estado
					Serial.print(id);
					Serial.print(" / ");
					Serial.println(estado);
					http.begin("http://" + IP + ":5000/api/sensores/"+id+"/"+estado);
					httpResposta = http.PUT("");
					ProcessarResposta(httpResposta, http);
				}
				else if (resp[0] == '1') {// PATCH para tabela ocupacao PATCH:ID_Ocupacao
					id = resp.substring(resp.indexOf(':') + 1);
					Serial.println(id);
					http.begin("http://" + IP + ":5000/api/ocupacoes/" + id);
					httpResposta = http.PUT("");
					ProcessarResposta(httpResposta, http);
				}
				else if (resp[0] == '2') {// POST para tabela ocupacao POST:ID_SENSOR
					id = resp.substring(resp.indexOf(':') + 1);
					Serial.println(id);
					http.begin("http://" + IP + ":5000/api/ocupacoes/" + id);
					httpResposta = http.POST("");
					ProcessarResposta(httpResposta, http);
				}
				http.end();
			}
			else{
				Serial.println("Sem Resposta !!!");
			}
		}
		else {
			Serial.println("Reconectando ao WiFi...");
			conectar();
		}
	}
	else if (!WifiOn()) {
		Serial.println("Reconectando ao WiFi...");
		conectar();
	}
	else{
		digitalWrite(2,HIGH);
	}
	delay(900);
	digitalWrite(2,LOW);
	delay(100);
}
//===============================================//

//-----------------------------------------------//

//===============================================//
void ProcessarResposta(int httpResposta, HTTPClient& http){
	if (httpResposta > 0) {
		Serial.print("RESP Servidor: ");
		Serial.println(http.getString());
	}
	else if(httpResposta == -1){
		Serial.print("Servidor Offline!, ERRO: " + String(httpResposta));
	}
	else{
		Serial.print("ERRO!: " + String(httpResposta) + " : ");
		Serial.println(http.getString());
	}
}
String EsperarResposta() {
  String resposta = "";
  unsigned long startTime = millis();
  Serial.println("Aguardando resposta...");
  while (millis() - startTime < timeout) {
    if (Serial.available()){
      resposta = Serial.readStringUntil('\n');
      Serial.print("Resposta recebida: ");
      Serial.println(resposta);
      break;  // Sai do loop se receber a resposta
    }
  }
  return resposta;
}
char WifiOn(){
	return WiFi.status() == WL_CONNECTED;
}
void conectar(){
	WiFi.mode(WIFI_OFF);
	delay(1000);
	int t = 10;
	WiFi.mode(WIFI_STA);
	delay(500);
	WiFi.begin("N5", "desconhecido123");
	while (WiFi.status() != WL_CONNECTED && t > 0) {
		delay(1000);
		Serial.print(".");
		t--;
	}
	if (WiFi.status() == WL_CONNECTED) {
		Serial.println("Conectado...yeey :)");
	}
	else {
		Serial.println("Falha ao conectar ao WiFi");
	}
}