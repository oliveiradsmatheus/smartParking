# Redefinindo o DataFrame para calcular novamente
import pandas as pd
from datetime import datetime

# Dados de ocupação para os sensores da rua1 (somente sensores 1, 2 e 3)
data = [
    # Sensor 1
    ('2024-10-01 08:00:00', '2024-10-01 09:30:00', 5400, 1),
    ('2024-10-01 10:00:00', '2024-10-01 11:00:00', 3600, 1),
    ('2024-10-02 14:00:00', '2024-10-02 15:30:00', 5400, 1),
    ('2024-10-03 12:00:00', '2024-10-03 13:00:00', 3600, 1),
    ('2024-10-04 09:00:00', '2024-10-04 10:30:00', 5400, 1),
    ('2024-10-05 18:00:00', '2024-10-05 19:00:00', 3600, 1),
    # Sensor 2
    ('2024-10-01 09:30:00', '2024-10-01 11:00:00', 5400, 2),
    ('2024-10-02 16:00:00', '2024-10-02 17:00:00', 3600, 2),
    ('2024-10-03 14:00:00', '2024-10-03 15:30:00', 5400, 2),
    ('2024-10-04 11:00:00', '2024-10-04 12:00:00', 3600, 2),
    ('2024-10-05 10:00:00', '2024-10-05 11:30:00', 5400, 2),
    ('2024-10-06 15:00:00', '2024-10-06 16:00:00', 3600, 2),
    # Sensor 3
    ('2024-10-01 07:00:00', '2024-10-01 09:00:00', 7200, 3),
    ('2024-10-03 08:30:00', '2024-10-03 10:00:00', 5400, 3),
    ('2024-10-04 13:00:00', '2024-10-04 14:30:00', 5400, 3),
    ('2024-10-05 12:00:00', '2024-10-05 13:30:00', 5400, 3),
    ('2024-10-06 11:00:00', '2024-10-06 12:00:00', 3600, 3),
    ('2024-10-07 16:00:00', '2024-10-07 17:00:00', 3600, 3)
]

# Converte os dados em um DataFrame
df = pd.DataFrame(data, columns=['ocp_dtInicio', 'ocp_dtFim', 'ocp_tempo', 'sen_id'])

# Converte as datas de início e fim para o formato datetime
df['ocp_dtInicio'] = pd.to_datetime(df['ocp_dtInicio'])
df['ocp_dtFim'] = pd.to_datetime(df['ocp_dtFim'])

# Extrai a hora do início da ocupação
df['hora_pico'] = df['ocp_dtInicio'].dt.hour

# Agrupa por hora para calcular o número de ocupações e a soma ponderada em segundos
ocupacoes_por_hora = df.groupby('hora_pico')['ocp_tempo'].sum()

# Calcula o horário de pico ponderado
horario_pico_ponderado_em_horas = (ocupacoes_por_hora.index * ocupacoes_por_hora).sum() / ocupacoes_por_hora.sum()
horario_pico_ponderado_em_horas
