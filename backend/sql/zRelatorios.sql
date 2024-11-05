-- /* 1.1 Relatório de Pico De Ocupação MIN */
SELECT 
    hora_pico,
    total_ocupacoes
FROM (
    SELECT 
        HOUR(o.ocp_dtInicio) AS hora_pico, -- Extrai a hora de ocp_dtInicio
        COUNT(o.ocp_id) AS total_ocupacoes -- Conta o número de ocupações para cada hora
    FROM 
        ocupacao o
    WHERE
        o.ocp_dtInicio BETWEEN '2024-10-01' AND '2024-10-31' -- Considera o intervalo de datas
    GROUP BY 
        HOUR(o.ocp_dtInicio) -- Agrupa por hora
) AS ocupacoes_por_hora
ORDER BY 
    total_ocupacoes ASC -- Ordena pelo total de ocupações em ordem ascendente
LIMIT 1; -- Retorna o horário com o menor total de ocupações


SELECT 
    rua_nome AS rua,
    SUM(hora_pico * total_ocupacoes) / NULLIF(SUM(total_ocupacoes), 0) AS picoMin
FROM (
    SELECT 
        r.rua_nome,
        HOUR(o.ocp_dtInicio) AS hora_pico,
        COUNT(o.ocp_id) AS total_ocupacoes
    FROM 
        ocupacao o
    JOIN 
        sensor s ON o.sen_id = s.sen_id
    JOIN 
        rua r ON s.rua_id = r.rua_id
    WHERE 
        r.rua_id = 'RUA2'
        AND o.ocp_dtInicio BETWEEN '2024-10-01' AND '2024-10-31'
    GROUP BY 
        r.rua_nome, HOUR(o.ocp_dtInicio)
) AS ocupacoes_por_hora
WHERE total_ocupacoes = (
    SELECT MIN(total_ocupacoes)
    FROM (
        SELECT 
            HOUR(o.ocp_dtInicio) AS hora_pico,
            COUNT(o.ocp_id) AS total_ocupacoes
        FROM 
            ocupacao o
        JOIN 
            sensor s ON o.sen_id = s.sen_id
        JOIN 
            rua r ON s.rua_id = r.rua_id
        WHERE 
            r.rua_id = 'RUA1'
            AND o.ocp_dtInicio BETWEEN '2024-10-01' AND '2024-10-31'
        GROUP BY 
            HOUR(o.ocp_dtInicio)
    ) AS sub_query
)




/* 2. Relatório de Tempo Médio de Ocupação */
SELECT 
    r.rua_nome AS rua,
    -- AVG(o.ocp_tempo) AS tempo_medio_ocupacao_segundos,
    FLOOR(AVG(o.ocp_tempo) / 3600) AS horas,  -- Calcula as horas
    FLOOR((AVG(o.ocp_tempo) % 3600) / 60) AS minutos  -- Calcula os minutoso
FROM 
    ocupacao o
JOIN 
    sensor s ON o.sen_id = s.sen_id
JOIN 
    rua r ON s.rua_id = r.rua_id
WHERE 
    r.rua_id = 'RUA1' -- Substitua pelo ID da rua desejada
    AND o.ocp_dtInicio >= '2024-10-01 00:00:00'
    AND o.ocp_dtFim <= '2024-10-13 23:59:59'
GROUP BY 
    r.rua_nome;




/* 1. Relatório de Pico De Ocupação MAX */
SELECT 
    rua_nome,
    SUM(hora_pico * total_ocupacoes) / SUM(total_ocupacoes) AS media_horario_pico
FROM (
    SELECT 
        r.rua_nome,
        HOUR(o.ocp_dtInicio) AS hora_pico,
        COUNT(o.ocp_id) AS total_ocupacoes
    FROM 
        ocupacao o
    JOIN 
        sensor s ON o.sen_id = s.sen_id
    JOIN 
        rua r ON s.rua_id = r.rua_id
    WHERE 
        r.rua_id = 'RUA2'
        AND o.ocp_dtInicio >= '2024-10-01' AND o.ocp_dtInicio <= '2024-10-31'
    GROUP BY 
        r.rua_nome, HOUR(o.ocp_dtInicio)
) AS ocupacoes_por_hora -- nome da tabela apos o select dentro do from