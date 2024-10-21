-- //#################### 1. Relatório de Pico De Ocupação MAX ####################//
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
        r.rua_id = 'RUA1'
        AND o.ocp_dtInicio BETWEEN '2024-10-01' AND '2024-10-31'
    GROUP BY 
        r.rua_nome, HOUR(o.ocp_dtInicio)
) AS ocupacoes_por_hora

--//#################### 1.1 Relatório de Pico De Ocupação MIN ####################//
SELECT 
    rua_nome,
    SUM(hora_pico * total_ocupacoes) / NULLIF(SUM(total_ocupacoes), 0) AS media_horario_menos_ocupacoes
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
        r.rua_id = 'RUA1'
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
--//#################################################################################//


--//#################### 2. Relatório de Tempo Médio de Ocupação ####################//
SELECT 
    r.rua_nome,
    AVG(o.ocp_tempo) AS tempo_medio_ocupacao
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
--//#################################################################################//