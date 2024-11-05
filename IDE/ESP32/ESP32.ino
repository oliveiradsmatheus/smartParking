#include <WiFi.h>
#include <HTTPClient.h>

const String IP = "192.168.252.229";
unsigned long timeout = 3000;
const char *REDE = "N5";
const char *SENHA = "desconhecido123";

bool WifiOn();
void conectar();
String EsperarRespostaMEGA();
void ProcessarResposta(int httpResposta, HTTPClient &http);

//==================== SETUP ====================//
void setup()
{
	Serial.begin(115200);
	Serial1.begin(115200, SERIAL_8N1, 16, 17);
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
	conectar();
}

void loop()
{
	if (Serial1.available() && Serial1.readString() == "on")
	{
		if (WifiOn())
		{
			Serial1.write("on"); // Wifi ON
			String resp = "";
			resp = EsperarRespostaMEGA();
			if (resp != "")
			{
				int httpResposta;
				HTTPClient http;
				String payload = "", estado = "", id = "";
				if (resp[0] == '0')
				{													   // PATCH para tabela sensor PATCH:ID_SENSOR:ESTADO
					id = resp.substring(2, resp.indexOf(':', 2));	   // Extrai id
					estado = resp.substring(resp.indexOf(':', 2) + 1); // Extrai estado
					Serial.print(id);
					Serial.print(" / ");
					Serial.println(estado);
					http.begin("http://" + IP + ":5000/sensores/" + id + "/" + estado);
					httpResposta = http.PUT("");
					ProcessarResposta(httpResposta, http);
				}
				else if (resp[0] == '1')
				{ // PATCH para tabela ocupacao PATCH:ID_Ocupacao
					id = resp.substring(resp.indexOf(':') + 1);
					Serial.println(id);
					http.begin("http://" + IP + ":5000/ocupacoes/" + id);
					httpResposta = http.PUT("");
					ProcessarResposta(httpResposta, http);
				}
				else if (resp[0] == '2')
				{ // POST para tabela ocupacao POST:ID_SENSOR
					id = resp.substring(resp.indexOf(':') + 1);
					Serial.println(id);
					http.begin("http://" + IP + ":5000/ocupacoes/" + id);
					httpResposta = http.POST("");
					ProcessarResposta(httpResposta, http);
				}
				else
				{
					Serial.println("Mensagem Vazia !!!");
				}
				http.end();
			}
		}
		else
		{
			Serial1.print("off"); // Wifi OFF
			Serial.println("Reconectando ao WiFi...");
			conectar();
		}
	}
	else if (!WifiOn())
	{
		Serial.println("Reconectando ao WiFi...");
		conectar();
	}
}
//===============================================//

//-----------------------------------------------//

//===============================================//
String EsperarRespostaMEGA()
{
	String resposta = "";
	unsigned long startTime = millis();
	Serial.println("\nAguardando resposta MEGA...");

	while (millis() - startTime < timeout)
	{
		if (Serial1.available())
		{
			resposta = Serial1.readString();
			Serial.println("Resposta recebida MEGA: " + resposta);
			break;
		}
	}
	if (resposta == "")
		Serial.println("Sem Resposta MEGA!!!");
	return resposta;
}

void ProcessarResposta(int httpResposta, HTTPClient &http)
{
	String resp = "", resp2 = "";
	if (httpResposta > 0)
	{
		resp = http.getString();
		Serial.print("RESP Servidor: " + resp);
		Serial1.print(resp);
	}
	else if (httpResposta == -1)
	{
		resp = String(httpResposta);
		Serial.print("Servidor Offline!, ERRO: " + resp);
		Serial1.print(resp);
	}
	else
	{
		resp = String(httpResposta);
		resp2 = String(http.getString());
		Serial.print("ERRO!: " + resp + " : " + resp2);
		Serial1.print(resp2);
	}
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
	while (WiFi.status() != WL_CONNECTED && t > 0)
	{
		delay(1000);
		Serial.print(".");
		t--;
	}
	if (WiFi.status() == WL_CONNECTED)
	{
		Serial.println("\nConectado...yeey :)");
	}
	else
	{
		Serial.println("\nFalha ao conectar ao WiFi");
	}
}