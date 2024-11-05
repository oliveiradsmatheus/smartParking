#include <WiFi.h>
#include <HTTPClient.h>
#include <SocketIoClient.h>

const char *REDE = "N5";
const char *SENHA = "desconhecido123";
const char* IP = "192.168.131.229";  // IP do servidor Socket.IO
const uint16_t PORTA = 5000;          // Porta do servidor

unsigned long timeout = 3000;
SocketIoClient socketIO;

// Funções Prototipadas
void lidarEvento(const char* payload, size_t length);
void ProcessarResposta(int httpResposta, HTTPClient &http);
String EsperarRespostaMega();
void ProcessarRequisicaoHTTP(String resp);
bool WifiOn();
void conectar();

//==================== SETUP ====================//
void setup()
{
	Serial.begin(115200);
	Serial1.begin(115200, SERIAL_8N1, 16, 17); // Serial para comunicação com o Arduino Mega
	pinMode(2, OUTPUT);

	// Serial.println("Manda o timeout em 5s !");
	// delay(5000);
	// if(Serial.available()){
	// 	String stringTimeout = Serial.readStringUntil('\n');
	// 	if(stringTimeout != ""){
	// 		timeout = strtoul(stringTimeout.c_str(), NULL, 10);
	// 		Serial.print("Timeout recebido: ");
	// 		Serial.println(timeout);
	// 	}
	// }

	// Conectar ao WiFi
	conectar();

	// Configurar o Socket.IO
	socketIO.begin(IP, PORTA);
	socketIO.on("event", lidarEvento); // Configurar o evento de callback
}

void loop()
{
	socketIO.loop(); // Atualizar estado do Socket.IO

	// Verificar se há uma requisição do Mega na Serial1 e processá-la
	if (Serial1.available() && Serial1.readString() == "on") {
		if (WifiOn()) {
			Serial1.write("on"); // Wifi ON
			String resp = EsperarRespostaMega();
			if (resp != "") {
				ProcessarRequisicaoHTTP(resp); // Executa a requisição HTTP com base na resposta
			}
		}
		else {
			Serial1.print("off"); // Wifi OFF
			Serial.println("Reconectando ao WiFi...");
			conectar();
		}
	}

	// Reconectar ao WiFi se desconectado
	if (!WifiOn()) {
		Serial.println("Reconectando ao WiFi...");
		conectar();
	}
}

// Função de evento para o Socket.IO
void lidarEvento(const char* payload, size_t length)
{
	String message = String((char*)payload).substring(0, length);
	Serial.print("Mensagem do banco de dados: ");
	Serial.println(message);

	// Enviar atualização para o Mega via Serial1
	Serial1.print(message);
}

void ProcessarResposta(int httpResposta, HTTPClient &http)
{
	String resp = "", resp2 = "";
	if (httpResposta > 0) {
		resp = http.getString();
		Serial.print("RESP Servidor: " + resp);
		Serial1.print(resp);
	}
	else if (httpResposta == -1) {
		resp = String(httpResposta);
		Serial.print("Servidor Offline!, ERRO: " + resp);
		Serial1.print(resp);
	}
	else {
		resp = String(httpResposta);
		resp2 = String(http.getString());
		Serial.print("ERRO!: " + resp + " : " + resp2);
		Serial1.print(resp2);
	}
}

// Função para ler resposta do Mega pela Serial1
String EsperarRespostaMega()
{
	String resposta = "";
	unsigned long startTime = millis();
	Serial.println("\nAguardando resposta Mega...");

	while (millis() - startTime < timeout) {
		if (Serial1.available()) {
			resposta = Serial1.readString();
			Serial.println("Resposta recebida Mega: " + resposta);
			break;
		}
	}
	if (resposta == "")
		Serial.println("Sem Resposta Mega!!!");
	return resposta;
}

// Função para processar requisições HTTP baseadas nas mensagens do Mega
void ProcessarRequisicaoHTTP(String resp)
{
	HTTPClient http;
	int httpResposta;
	String id, estado;

	if (resp[0] == '0') {   // PATCH para tabela sensor PATCH:ID_SENSOR:ESTADO
		id = resp.substring(2, resp.indexOf(':', 2));       // Extrai id
		estado = resp.substring(resp.indexOf(':', 2) + 1);  // Extrai estado
		Serial.print(id);
		Serial.print(" / ");
		Serial.println(estado);
		http.begin("http://" + String(IP) + ":5000/sensores/" + id + "/" + estado);
		httpResposta = http.PUT("");
		ProcessarResposta(httpResposta, http);
	}
	else if (resp[0] == '1') {  // PATCH para tabela ocupacao PATCH:ID_Ocupacao
		id = resp.substring(resp.indexOf(':') + 1);
		Serial.println(id);
		http.begin("http://" + String(IP) + ":5000/ocupacoes/" + id);
		httpResposta = http.PUT("");
		ProcessarResposta(httpResposta, http);
	}
	else if (resp[0] == '2') {  // POST para tabela ocupacao POST:ID_SENSOR
		id = resp.substring(resp.indexOf(':') + 1);
		Serial.println(id);
		http.begin("http://" + String(IP) + ":5000/ocupacoes/" + id);
		httpResposta = http.POST("");
		ProcessarResposta(httpResposta, http);
	}
	else {
		Serial.println("Mensagem Vazia !!!");
	}
	http.end();
}

bool WifiOn()
{
	return WiFi.status() == WL_CONNECTED;
}

void conectar()
{
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
		Serial.println("\nConectado...yeey :) !!!");
	}
	else {
		Serial.println("\nFalha ao conectar ao WiFi !!!");
	}
}
