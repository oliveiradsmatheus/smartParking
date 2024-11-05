// Conectando Sensor Ultrassonico HC-SR04 ao Arduino
// Autor: Matheus Oliveira da Silva

// Define os pinos para o trigger e echo
#define TRIG_PIN1 2
#define ECHO_PIN1 3

#define TRIG_PIN2 4
#define ECHO_PIN2 5

#define TRIG_PIN3 6
#define ECHO_PIN3 7

#define LED1_G 32
#define LED1_Y 30
#define LED1_R 28

#define LED2_G 42
#define LED2_Y 40
#define LED2_R 38

#define LED3_G 52
#define LED3_Y 50
#define LED3_R 48

int DistanciaAtivacao = 30; // cm
int TempoAnalise = 6;		// segundos
unsigned long timeout = 1000;

// Variáveis globais
int TempoVaga1 = 0, TempoVaga2 = 0, TempoVaga3 = 0;
char Estado[3] = {'D', 'D', 'D'};
int idSensor[3] = {1, 2, 3}, idOcupacao[3] = {0, 0, 0};

void setup()
{
	Serial.begin(115200);
	Serial1.begin(115200); // Serial de comunicao do ESP32, n precisa definir o RX1 e TX1 pq ja é padrao o nome Serial1 pra ele;

	// Configurar pinos como saída e entrada
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

	delay(1000);
}

//=============== Processar Distancias ===============//
long MedirDistancia(int TRIG, int ECHO)
{
	digitalWrite(TRIG, LOW);
	delayMicroseconds(2);
	digitalWrite(TRIG, HIGH);
	delayMicroseconds(10);
	digitalWrite(TRIG, LOW);
	long Duracao = pulseIn(ECHO, HIGH);
	long Distancia = Duracao * 0.034 / 2; // Conversão para cm
	return Distancia;
}
void ExibirDistancia(long Distancia, int num)
{
	Serial.print("Sensor [ ");
	Serial.print(num);
	Serial.print(" ]:  ");
	Serial.print(Distancia);
	Serial.println("cm");
}
//====================================================//

//----------------------------------------------------//

//=============== Processar Respostas ================//
void Processar_ESTADO(String msg, int index)
{
	if (msg != "" && msg == "Estado Atualizado")
	{
		Serial.println("TRUE: req Update Estado Sensor: " + String(Estado[index]));
	}
	else
	{
		Serial.println("FALSE: req Update Estado Sensor: " + msg);
	}
}
void Processar_POST(String msg, int index)
{
	int id;
	String aux;
	if (msg != "" && msg[0] == 'O' && msg[1] == 'K')
	{ // Verifica se a resposta começa com "OK"
		aux = msg.substring(msg.indexOf(':') + 1);
		id = atoi(aux.c_str());
		idOcupacao[index] = id;
		Serial.println("TRUE: req POST Da Ocupacao, ID_Ocupacao: " + String(idOcupacao[index]));
	}
	else
	{
		Serial.println("FALSE: req POST Da Ocupacao, ERRO: " + msg);
	}
}
void Processar_PUT(String msg, int index)
{
	if (msg != "" && msg == "Ocupacao Atualizada")
	{ // Espera-se a resp = "S:ID_Ocupacao" ou "mensagem de erro do banco"
		Serial.println("TRUE: req PUT para Ocupacao");
		idOcupacao[index] = 0;
	}
	else
	{
		Serial.println("FALSE: req PUT para Ocupacao, ERRO: " + msg);
	}
}
//====================================================//

//----------------------------------------------------//

//=============== Esperar Respostas ==================//
String EsperarRespostaESP_Wifi()
{
	String resposta = "";
	unsigned long startTime = millis();
	Serial.println("Aguardando resposta ESP p/ Wifi...");

	while (millis() - startTime < timeout)
	{
		if (Serial1.available())
		{
			resposta = Serial1.readString();
			Serial.println("Resposta recebida ESP p/ Wifi: " + resposta);
			break;
		}
	}
	if (resposta == "")
		Serial.println("Sem Resposta do ESP p/ Wifi !!!");
	return resposta;
}
bool WifiOn()
{
	Serial1.write("on"); // envia ON pra ver se o wifi esta online
	return EsperarRespostaESP_Wifi() == "on";
}
String EsperarRespostaESP_API()
{
	String resposta = "";
	unsigned long startTime = millis();
	Serial.println("Aguardando resposta API...");

	while (millis() - startTime < timeout)
	{
		if (Serial1.available())
		{
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

//----------------------------------------------------//

//=============== Funcao Principal ===================//
void SetLed(int LED_R, int LED_Y, int LED_G, int &TempoVaga, int Distancia, int idSensor[], int index)
{
	String MSG_ENVIAR = "", RESPOSTA = "";
	if (TempoVaga <= 0 && Distancia > DistanciaAtivacao)
	{ // Vaga Disponivel
		digitalWrite(LED_R, LOW);
		digitalWrite(LED_Y, LOW);
		digitalWrite(LED_G, HIGH);
		if (Estado[index] == 'O' && WifiOn())
		{ // req UPDATE para a tabela de sensores ESTADO 'Disponivel'
			Estado[index] = 'D';
			MSG_ENVIAR = "0:" + String(idSensor[index]) + ":D"; // Formato: PATCH:ID_SENSOR:ESTADO
			Serial1.print(MSG_ENVIAR);							// manda Mensagem para o ESP32
			RESPOSTA = EsperarRespostaESP_API();
			Processar_ESTADO(RESPOSTA, index);
			if (WifiOn())
			{
				MSG_ENVIAR = "1:" + String(idOcupacao[index]); // Formato: PATCH:ID_Ocupacao
				Serial1.print(MSG_ENVIAR);
				RESPOSTA = EsperarRespostaESP_API();
				Processar_PUT(RESPOSTA, index); // dentro da func ele ja zera o valor do idOcupacao[index]
			}
		}
		else if (Estado[index] == 'A' && WifiOn())
		{ // req UPDATE para a tabela de sensores ESTADO 'Disponivel'
			Estado[index] = 'D';
			MSG_ENVIAR = "0:" + String(idSensor[index]) + ":D"; // Formato: PATCH:ID_SENSOR:ESTADO
			Serial1.print(MSG_ENVIAR);
			RESPOSTA = EsperarRespostaESP_API();
			Processar_ESTADO(RESPOSTA, index);
		}
	}
	else if (TempoVaga < TempoAnalise && Distancia < DistanciaAtivacao)
	{ // Vaga em Analise
		if (TempoVaga > 2)
		{ // Vaga esta para Analise  e pode sinalizar para o ESP32
			digitalWrite(LED_R, LOW);
			digitalWrite(LED_Y, HIGH);
			digitalWrite(LED_G, LOW);
			if (Estado[index] == 'D' && WifiOn())
			{ // req UPDATE para a tabela de sensores ESTADO 'Analise'
				Estado[index] = 'A';
				MSG_ENVIAR = "0:" + String(idSensor[index]) + ":A"; // Formato: PATCH:ID_SENSOR:ESTADO
				Serial1.print(MSG_ENVIAR);
				RESPOSTA = EsperarRespostaESP_API();
				Processar_ESTADO(RESPOSTA, index);
			}
		}
		if (TempoVaga < TempoAnalise)
		{
			TempoVaga++;
		}
	}
	else if (Distancia < DistanciaAtivacao)
	{ // Vaga Ocupada
		if (TempoVaga > (TempoAnalise + 2))
		{ // Vaga esta para Ocupada e pode sinalizar para o ESP32
			digitalWrite(LED_R, HIGH);
			digitalWrite(LED_Y, LOW);
			digitalWrite(LED_G, LOW);
			if (Estado[index] == 'A' && WifiOn())
			{ // req UPDATE para a tabela de sensores ESTADO 'Ocupado'
				Estado[index] = 'O';
				MSG_ENVIAR = "0:" + String(idSensor[index]) + ":O"; // Formato: PATCH:ID_SENSOR:ESTADO
				Serial1.print(MSG_ENVIAR);							// Enviar mensagem para o ESP32
				RESPOSTA = EsperarRespostaESP_API();
				Processar_ESTADO(RESPOSTA, index);
				if (idOcupacao[index] == 0 && WifiOn())
				{												 // mandar idSensor[index], req POST para a tabela de ocupaçoes & idOcupacao[index] = resposta API
					MSG_ENVIAR = "2:" + String(idSensor[index]); // Formato: POST:ID_SENSOR
					Serial.println(MSG_ENVIAR);
					Serial1.print(MSG_ENVIAR);
					RESPOSTA = EsperarRespostaESP_API();
					Processar_POST(RESPOSTA, index);
				}
			}
		}
		else
		{
			TempoVaga++;
		}
	}
	else
	{
		if (Estado[index] == 'O')
		{ // TempoVaga chegar em 0 então pode sinalizar para o ESP32
			TempoVaga -= 2;
		}
		else
		{
			TempoVaga = 0; // passou de analise para disponivel
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

	SetLed(LED1_R, LED1_Y, LED1_G, TempoVaga1, Distancia1, idSensor, 0);
	SetLed(LED2_R, LED2_Y, LED2_G, TempoVaga2, Distancia2, idSensor, 1);
	SetLed(LED3_R, LED3_Y, LED3_G, TempoVaga3, Distancia3, idSensor, 2);

	delay(500); // Aguarda 1 segundo antes de ler novamente
}