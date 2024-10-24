// Conectando Sensor Ultrassonico HC-SR04 ao Arduino
// Autor: Matheus Oliveira da Silva

// Define os pinos para o trigger e echo
#define TRIG_PIN1 2
#define ECHO_PIN1 3
#define TRIG_PIN2 4
#define ECHO_PIN2 5
#define TRIG_PIN3 6
#define ECHO_PIN3 7

#define LED1_G 52
#define LED1_Y 50
#define LED1_R 48
#define LED2_G 42
#define LED2_Y 40
#define LED2_R 38
#define LED3_G 30
#define LED3_Y 28
#define LED3_R 26

const int DistanciaAtivacao = 30;  // cm
const int TempoAnalise = 7;        // segundos
unsigned long timeout = 1000

// Variáveis globais
int TempoVaga1 = 0, TempoVaga2 = 0, TempoVaga3 = 0;
char Estado[3] = { 'D', 'D', 'D' };
int idSensor[3] = { 1, 2, 3 }, idOcupacao[3] = { 0, 0, 0 };

void setup()
{
	// Configurar pinos como saída e entrada
	Serial.begin(9600);
	Serial1.begin(115200);  // Serial do ESP32
	pinMode(TRIG_PIN1, OUTPUT);
	pinMode(ECHO_PIN1, INPUT);
	pinMode(TRIG_PIN2, OUTPUT);
	pinMode(ECHO_PIN2, INPUT);
	pinMode(TRIG_PIN3, OUTPUT);
	pinMode(ECHO_PIN3, INPUT);

	// Configurar LED's de saída
	pinMode(LED1_R, OUTPUT);
	pinMode(LED1_Y, OUTPUT);
	pinMode(LED1_G, OUTPUT);
	pinMode(LED2_R, OUTPUT);
	pinMode(LED2_Y, OUTPUT);
	pinMode(LED2_G, OUTPUT);
	pinMode(LED3_R, OUTPUT);
	pinMode(LED3_Y, OUTPUT);
	pinMode(LED3_G, OUTPUT);

	Serial.println("Lendo dados do sensor...");
}

long MedirDistancia(int TRIG, int ECHO)
{
	digitalWrite(TRIG, LOW);
	delayMicroseconds(2);
	digitalWrite(TRIG, HIGH);
	delayMicroseconds(10);
	digitalWrite(TRIG, LOW);

	long Duracao = pulseIn(ECHO, HIGH);
	long Distancia = Duracao * 0.034 / 2;  // Conversão para cm
	return Distancia;
}

void ExibirDistancia(long Distancia, int num)
{
	Serial.println("Distancia do Sensor [" + num + "]:  " + Distancia + "cm\n");
}

void ProcessarRespostaEstado(String msg, int index)
{
	if (msg != "" && msg == "Estado Atualizado!") // Espera-se a resp = "OK" ou "mensagem de erro do banco"
		Serial.println("req de UPDATE para Estado Sensor <BEM> sucessida!" + " EstadoDB: " + Estado[index]);
	else
		Serial.println("req de UPDATE para Estado Sensor <MAL> sucessida!, ERRO: " + msg);
}

void ProcessarRespostaPOST(String msg, int index)
{
	int id;
	String aux;
	if (msg != "" && msg[0]=='O' && msg[0]=='K'){ // Espera-se a resp = "S:ID_Ocupacao" ou "mensagem de erro do banco"
		aux = msg.substring(msg.indexOf(':') + 1);
		id = atoi(aux.c_str());
		idOcupacao[index] = id;
		Serial.println("req de POST para Ocupacao do Sensor <BEM> sucessida!" + " ID_Ocupacao: " + idOcupacao[index]);
	}
	else
		Serial.println("req de POST para Ocupacao do Sensor <MAL> sucessida!, ERRO: " + msg);
}

void ProcessarRespostaPUT(String msg, int index){
	if (msg != "" && msg=="Ocupacao Atualizada!"){ // Espera-se a resp = "S:ID_Ocupacao" ou "mensagem de erro do banco"
		idOcupacao[index] = 0;
		Serial.println("req de PUT para Ocupacao do Sensor <BEM> sucessida!" + " ID_Ocupacao: " + idOcupacao[index]);
	}
	else
		Serial.println("req de PUT para Ocupacao do Sensor <MAL> sucessida!, ERRO: " + msg);
}

String EsperarResposta() {
    String resposta = "";
    unsigned long startTime = millis();
    Serial.println("Aguardando resposta...");
    while (millis() - startTime < timeout) {
        if (Serial1.available()) {
            resposta = Serial1.readStringUntil('\n');
            Serial.print("Resposta recebida: ");
            Serial.println(resposta);
            break;  // Sai do loop se receber a resposta
        }
    }
    return resposta;
}

char WifiOn()
{
	Serial1.println("on"); //envia ON pra ver se o wifi esta online
	return EsperarResposta() == "WiFi ON";
}

void SetLed(int LED_R, int LED_Y, int LED_G, int *TempoVaga, int Distancia, int idSensor, int index)
{
	if (*TempoVaga == 0 && Distancia > DistanciaAtivacao) {  //Vaga Disponivel
		digitalWrite(LED_R, LOW);
		digitalWrite(LED_Y, LOW);
		digitalWrite(LED_G, HIGH);
		if (Estado[index] == 'O') {
			Estado[index] = 'D';  //req UPDATE para a tabela de sensores ESTADO 'Disponivel'
			if(WifiOn()){
				String msg = "0:" + String(idSensor[index]) + ":A";  // Formato: PATCH:ID_SENSOR:ESTADO
				Serial1.println(msg);                                    // Enviar mensagem para o ESP32
				msg = EsperarResposta(); // Espera-se a resp = "S" ou "mensagem de erro do banco"
				ProcessarRespostaEstado(msg, index);
			}
			if(WifiOn()){//madar o idOcupacao[index] & req PATCH para a tabela de processos
				String msg = "1:" + String(idOcupacao[index]);  // Formato: PATCH:ID_Ocupacao
				Serial1.println(msg);                                    // Enviar mensagem para o ESP32
				msg = EsperarResposta(); // Espera-se a resp = "S" ou "mensagem de erro do banco"
				ProcessarRespostaPUT(msg, index);// dentro da func ele ja zera o valor do idOcupacao[index]
			}
		}
		else if (Estado[index] == 'A') {
			Estado[index] = 'D';  //req UPDATE para a tabela de sensores ESTADO 'Disponivel'
			if(WifiOn()){
				String msg = "0:" + String(idSensor[index]) + ":A";  // Formato: PATCH:ID_SENSOR:ESTADO
				Serial1.println(msg);                                    // Enviar mensagem para o ESP32
				msg = EsperarResposta(); // Espera-se a resp = "S" ou "mensagem de erro do banco"
				ProcessarRespostaEstado(msg, index);
			}
		}
	}
	else if (*TempoVaga < TempoAnalise && Distancia < DistanciaAtivacao) {  //Vaga em Analise
		if (*TempoVaga > 3) {                                                   //Vaga esta para Analise  e pode sinalizar para o ESP32
			digitalWrite(LED_R, LOW);
			digitalWrite(LED_Y, HIGH);
			digitalWrite(LED_G, LOW);
			if (Estado[index] == 'D') {
				Estado[index] = 'A';
				if (WifiOn()){// req UPDATE para a tabela de sensores ESTADO 'Analise'
					String msg = "0:" + String(idSensor[index]) + ":A";  // Formato: PATCH:ID_SENSOR:ESTADO
					Serial1.println(msg);                                    // Enviar mensagem para o ESP32
					msg = EsperarResposta(); // Espera-se a resp = "S" ou "mensagem de erro do banco"
					ProcessarRespostaEstado(msg, index);
				}
			}
		}
		if (*TempoVaga < TempoAnalise)
			(*TempoVaga)++;
	}
	else if (Distancia < DistanciaAtivacao) {  //Vaga Ocupada
		if (TempoVaga == TempoAnalise - 3) {       //Vaga esta para Ocupada e pode sinalizar para o ESP32
			digitalWrite(LED_R, HIGH);
			digitalWrite(LED_Y, LOW);
			digitalWrite(LED_G, LOW);
			if (Estado[index] == 'A') {
				Estado[index] = 'O';
				if(WifiOn()){
					String msg = "0:" + String(idSensor[index]) + ":O";  // Formato: PATCH:ID_SENSOR:ESTADO
					Serial1.println(msg);                                   // Enviar mensagem para o ESP32
					msg = EsperarResposta();
					ProcessarRespostaEstado(msg, index);

					if(idOcupacao[index]==0 && WifiOn()) { //mandar idSensor[index], req POST para a tabela de ocupaçoes & idOcupacao[index] = resposta API
						String msg = "2:" + String(idSensor[index]);  // Formato: POST:ID_SENSOR
						Serial1.println(msg);                            // Enviar mensagem para o ESP32
						msg = EsperarResposta(); //req UPDATE para a tabela de sensores ESTADO 'Ocupado'
						ProcessarRespostaPOST(msg, index);
					}    
				}
			}
		}
		else
			(*TempoVaga)--;
	}
	else {
		if (Estado[index] == 'O') {  //TempoVaga chegar em 0 então pode sinalizar para o ESP32
			(*TempoVaga)--;
		}
		else {
			(*TempoVaga) = 0;  //passou de analise para disponivel
		}
	}
}

void loop()
{
	// Envia um pulso de 10us no pino de trigger
	long Distancia1 = MedirDistancia(TRIG_PIN1, ECHO_PIN1);
	long Distancia2 = MedirDistancia(TRIG_PIN2, ECHO_PIN2);
	long Distancia3 = MedirDistancia(TRIG_PIN3, ECHO_PIN3);

	ExibirDistancia(Distancia1, 1);
	ExibirDistancia(Distancia2, 2);
	ExibirDistancia(Distancia3, 3);

	SetLed(LED1_R, LED1_Y, LED1_G, &TempoVaga1, Distancia1, idSensor[0], 0);
	SetLed(LED2_R, LED2_Y, LED2_G, &TempoVaga2, Distancia2, idSensor[1], 1);
	SetLed(LED3_R, LED3_Y, LED3_G, &TempoVaga3, Distancia3, idSensor[2], 2);

	delay(1000);  // Aguarda 1 segundo antes de ler novamente
}