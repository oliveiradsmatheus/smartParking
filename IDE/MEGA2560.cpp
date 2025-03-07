// Baixar no gerenciador de bibliotecas 'NewPing by Tim Eckel'
#include <NewPing.h>
#include <Arduino.h>

#define TRIG_1 24 // OK
#define ECHO_1 26 // OK

#define TRIG_2 28 // OK
#define ECHO_2 30 // OK

#define TRIG_3 32 // OK
#define ECHO_3 34 // OK

#define LED_1G 47 // OK
#define LED_1Y 45 // OK
#define LED_1R 43 // OK

#define LED_2G 41 // OK
#define LED_2Y 39 // OK
#define LED_2R 37 // OK

#define LED_3G 35 // OK
#define LED_3Y 33 // OK
#define LED_3R 31 // OK

#define MAX_DISTANCIA 256 // em cm

NewPing sonar3 (TRIG_1, ECHO_1, MAX_DISTANCIA);
NewPing sonar2 (TRIG_2, ECHO_2, MAX_DISTANCIA);
NewPing sonar1 (TRIG_3, ECHO_3, MAX_DISTANCIA);

int Dist_MAX = 30, Dist_MIN = 5, TempoAnalise = 4; // cm , seg
unsigned long timeout = 5000;

char Estado[3] = {'D', 'D', 'D'};
int idSensor[3] = {1, 2, 3}, idOcupacao[3] = {0, 0, 0}, TempoVaga[3] = {0, 0, 0};

void SetLed(int LED_R, int LED_Y, int LED_G, int TempoVaga[], int Distancia, const int idSensor[], int index);
void ExibirDistancia(long Distancia, int num);

void setup() {
	Serial.begin(115200);
	Serial1.begin(115200); // Serial de comunicao do ESP32, n precisa definir o RX1 e TX1 pq ja é padrao o nome Serial1 pra ele;

	// Configurar pinos como saída e entrada
	pinMode(TRIG_1, OUTPUT);
	pinMode(ECHO_1, INPUT);
	pinMode(TRIG_2, OUTPUT);
	pinMode(ECHO_2, INPUT);
	pinMode(TRIG_3, OUTPUT);
	pinMode(ECHO_3, INPUT);

	// Configurar LED's de saída
	pinMode(LED_1R, OUTPUT);
	pinMode(LED_1Y, OUTPUT);
	pinMode(LED_1G, OUTPUT);
	pinMode(LED_2R, OUTPUT);
	pinMode(LED_2Y, OUTPUT);
	pinMode(LED_2G, OUTPUT);
	pinMode(LED_3R, OUTPUT);
	pinMode(LED_3Y, OUTPUT);
	pinMode(LED_3G, OUTPUT);

	digitalWrite(LED_1G, HIGH);
	digitalWrite(LED_2G, HIGH);
	digitalWrite(LED_3G, HIGH);

	delay(1000);
}

void loop() {
	int Distancia1 = sonar1.ping_cm(); 
	int Distancia2 = sonar2.ping_cm();
	int Distancia3 = sonar3.ping_cm();
   
	ExibirDistancia(Distancia1, 1);
	ExibirDistancia(Distancia2, 2);
	ExibirDistancia(Distancia3, 3);
	Serial.println("");

	SetLed(LED_1R, LED_1Y, LED_1G, TempoVaga, Distancia1, idSensor, 0);
	SetLed(LED_2R, LED_2Y, LED_2G, TempoVaga, Distancia2, idSensor, 1);
	SetLed(LED_3R, LED_3Y, LED_3G, TempoVaga, Distancia3, idSensor, 2);

	delay(1000);
}

//=============== Funcao Principal ===================//
bool Processar_ESTADO(String msg, int index, char novoEstado);
void Processar_POST(String msg, int index);
void Processar_PUT(String msg, int index);
String EsperarRespostaESP_API();

void SetLed(int LED_R, int LED_Y, int LED_G, int TempoVaga[], int Distancia, const int idSensor[], int index) {
	String MSG_ENVIAR = "", RESPOSTA = "";
	if (TempoVaga[index] <= 0 && (Distancia > Dist_MAX || Distancia < Dist_MIN)) {	  // Vaga Disponivel
		if (Estado[index] == 'O') {						// req UPDATE para a tabela de sensores ESTADO 'Disponivel'
			MSG_ENVIAR = "0:" + String(idSensor[index]) + ":D";		// Formato: PATCH:ID_SENSOR:ESTADO
			Serial1.print(MSG_ENVIAR);								// manda Mensagem para o ESP32
			Serial.println("\nMsg Enviada: " + MSG_ENVIAR);
			RESPOSTA = EsperarRespostaESP_API();
			if(Processar_ESTADO(RESPOSTA, index, 'D')){
				digitalWrite(LED_R, LOW);
				digitalWrite(LED_Y, LOW);
				digitalWrite(LED_G, HIGH);
			}

			MSG_ENVIAR = "1:" + String(idOcupacao[index]); 		// Formato: PATCH:ID_Ocupacao
			Serial1.print(MSG_ENVIAR);
			Serial.println("\nMsg Enviada: " + MSG_ENVIAR);
			RESPOSTA = EsperarRespostaESP_API();
			Processar_PUT(RESPOSTA, index); 					// dentro da func ele ja zera o valor do idOcupacao[index]
		}
		else if (Estado[index] == 'A') {				// req UPDATE para a tabela de sensores ESTADO 'Disponivel'
			MSG_ENVIAR = "0:" + String(idSensor[index]) + ":D"; 	// Formato: PATCH:ID_SENSOR:ESTADO
			Serial1.print(MSG_ENVIAR);
			Serial.println("\nMsg Enviada: " + MSG_ENVIAR);;
			RESPOSTA = EsperarRespostaESP_API();
			if(Processar_ESTADO(RESPOSTA, index, 'D')){
				digitalWrite(LED_R, LOW);
				digitalWrite(LED_Y, LOW);
				digitalWrite(LED_G, HIGH);
			}
		}
	}
	else if (TempoVaga[index] < TempoAnalise && Distancia < Dist_MAX && Distancia > Dist_MIN) {	// Vaga em Analise
		if (TempoVaga[index] > 2 && Estado[index] != 'O') {												// Vaga esta para Analise  e pode sinalizar para o ESP32
			if (Estado[index] == 'D') {							// req UPDATE para a tabela de sensores ESTADO 'Analise'
				MSG_ENVIAR = "0:" + String(idSensor[index]) + ":A"; 		// Formato: PATCH:ID_SENSOR:ESTADO
				Serial1.print(MSG_ENVIAR);
				Serial.println("\nMsg Enviada: " + MSG_ENVIAR);
				RESPOSTA = EsperarRespostaESP_API();
				if(Processar_ESTADO(RESPOSTA, index, 'A')){
					digitalWrite(LED_R, LOW);
					digitalWrite(LED_Y, HIGH);
					digitalWrite(LED_G, LOW);
				}
			}
		}
		if (TempoVaga[index] <= TempoAnalise) {
			TempoVaga[index]++;
		}
	}
	else if (Distancia < Dist_MAX && Distancia > Dist_MIN) {	// Vaga Ocupada
		// req UPDATE para a tabela de sensores ESTADO 'Ocupado'
		if (TempoVaga[index] > (TempoAnalise + 2)) {				// Vaga esta para Ocupada e pode sinalizar para o ESP32
			if(Estado[index] == 'A'){
				MSG_ENVIAR = "0:" + String(idSensor[index]) + ":O"; 	// Formato: PATCH:ID_SENSOR:ESTADO
				Serial1.print(MSG_ENVIAR);								// Enviar mensagem para o ESP32
				Serial.println("\nMsg Enviada: " + MSG_ENVIAR);
				RESPOSTA = EsperarRespostaESP_API();
				if(Processar_ESTADO(RESPOSTA, index, 'O')){
					digitalWrite(LED_R, HIGH);
					digitalWrite(LED_Y, LOW);
					digitalWrite(LED_G, LOW);
					if (idOcupacao[index] == 0) {							// mandar idSensor[index], req POST para a tabela de ocupaçoes & idOcupacao[index] = resposta API
						MSG_ENVIAR = "2:" + String(idSensor[index]); 		// Formato: POST:ID_SENSOR
						Serial.println(MSG_ENVIAR);
						Serial1.print(MSG_ENVIAR);
						Serial.println("\nMsg Enviada: " + MSG_ENVIAR);
						RESPOSTA = EsperarRespostaESP_API();
						Processar_POST(RESPOSTA, index);
					}
				}
			}
			else if(Estado[index] == 'D'){
				TempoVaga[index]-=2;
			}
		}
		else {
			TempoVaga[index]++;
		}
	}
	else {
		if (Estado[index] == 'O') {		// TempoVaga[index] chegar em 0 então pode sinalizar para o ESP32
			TempoVaga[index] -= 1;
		}
		else {
			TempoVaga[index] = 0; // passou de analise para disponivel
		}
	}
}
//====================================================//


//=============== Esperar Respostas ==================//
String EsperarRespostaESP_API() {
	String resposta = "";
	unsigned long startTime = millis();
	Serial.println("Aguardando resposta API...");

	while (millis() - startTime < timeout) {
		if (Serial1.available()) {
			resposta = Serial1.readString();
			Serial.println("Resposta recebida API: " + resposta);
			break;
		}
	}
	if (resposta == "")
		Serial.println("Sem Resposta da API !!!");
	return resposta;
}
//====================================================//


//=============== Processar Respostas ================//
bool Processar_ESTADO(String msg, int index, char novoEstado) {
	if (msg != "" && msg == "Estado Atualizado") {
		Estado[index] = novoEstado;
		Serial.println("\nTRUE: req Update Estado Sensor: " + String(Estado[index]));
		return true;
	}
	else {
		Serial.println("\nFALSE: req Update Estado Sensor: " + msg);
		return false;
	}
}
void Processar_POST(String msg, int index) {
	if (msg != "" && msg.startsWith("Ocupacao Gravada")) {
		String aux = msg.substring(msg.indexOf(':') + 1);
		int id = atoi(aux.c_str());
		idOcupacao[index] = id;
		Serial.println("\nTRUE: req POST Da Ocupacao | ID_Ocupacao: " + String(idOcupacao[index]));
	}
	else {
		Serial.println("\nFALSE: req POST Da Ocupacao: " + msg);
	}
}
void Processar_PUT(String msg, int index) {
	if (msg != "" && msg == "Ocupacao Atualizada") {
		Serial.println("\nTRUE: req PUT para Ocupacao");
		idOcupacao[index] = 0;
	}
	else {
		Serial.println("\nFALSE: req PUT para Ocupacao: " + msg);
	}
}
//====================================================//


//=============== Processar Distancias ===============//
void ExibirDistancia(long Distancia, int num) {
	Serial.print("  Sensor [ ");
	Serial.print(num);
	Serial.print(" ]:  ");
	Serial.print(Distancia);
	Serial.println("cm");
}