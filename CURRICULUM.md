# GalloGo - Curriculo de Logo Programming

Baseado no curso [Logo Programming - Academy Europe](https://academyeurope.org/courses-4/certificate-courses/logo-programming/) (36 licoes, 7 secoes, 20 semanas).

Adaptado para 3 faixas etarias com conteudo progressivo e gamificacao.

---

## Visao Geral do Curriculo

O curriculo e dividido em **5 modulos progressivos**, cada um com licoes teoricas, exemplos praticos e desafios. A progressao segue o modelo: **observar -> imitar -> experimentar -> criar**.

| Modulo | Tema | Licoes | Faixa Etaria Min |
|--------|------|--------|-----------------|
| 1 | Primeiros Passos | 7 | 6-8 |
| 2 | Alem do Basico | 5 | 6-8 |
| 3 | Programacao Real | 5 | 8-12 |
| 4 | Referencia Tecnica | 7 | 10-14 |
| 5 | Projetos e Avaliacao | 4 | Todas |

---

## Modulo 1: Primeiros Passos com a Tartaruga Logo

> Baseado na Secao 2 do curso Academy Europe: "Your First Steps in Programming with the Logo Turtle"

### 1.1 Bem-vindo ao Mundo Logo!

**Objetivo**: Apresentar o ambiente e o conceito da tartaruga como agente programavel.

**Conteudo**:
- O que e programar? O que e Logo?
- Historia breve: criado nos anos 1960 por Seymour Papert para ensinar criancas
- O ambiente GalloGo: os 3 paineis (instrucoes, CLI, canvas)
- A tartaruga no centro da tela: posicao (0, 0) e direcao (para cima)
- O prompt de comando: onde voce "conversa" com a tartaruga

**Comandos introduzidos**: Nenhum (apenas observacao)

**Desafio**: Explorar a interface, clicar nos paineis e ler a mensagem de boas-vindas

---

### 1.2 Conheca Sua Tartaruga: A Artista

**Objetivo**: Entender a tartaruga como cursor grafico e o conceito de "raciocinio corporal" (body-syntonic reasoning — imaginar-se como a tartaruga).

**Conteudo**:
- A tartaruga como uma artista que segue suas instrucoes
- Posicao: onde ela esta (coordenadas x, y)
- Direcao: para onde ela esta olhando (angulo/heading)
- A caneta: a tartaruga desenha por onde passa (caneta abaixada por padrao)
- Sistema de coordenadas: origem no centro, x positivo para direita, y positivo para cima

**Comandos introduzidos**: Nenhum ainda (conceitual)

**Atividade**: "Seja a tartaruga" — descrever em palavras como ir de um ponto a outro

---

### 1.3 Os Quatro Movimentos Basicos

**Objetivo**: Aprender os 4 comandos fundamentais de movimento.

**Conteudo**:
- `fd N` / `pf N` (forward / para frente) — mover N passos para frente
- `bk N` / `pt N` (back / para tras) — mover N passos para tras
- `rt N` / `gd N` (right / girar direita) — girar N graus no sentido horario
- `lt N` / `ge N` (left / girar esquerda) — girar N graus no sentido anti-horario
- Argumentos: unidades para distancia, graus para rotacao
- Sistema de heading: 0° = cima, 90° = direita, 180° = baixo, 270° = esquerda

**Exemplos**:
```logo
fd 100
rt 90
fd 50
```

**Desafios**:
1. Mova a tartaruga 100 passos para frente
2. Desenhe uma linha em forma de "L" (fd + rt + fd)
3. Faca a tartaruga voltar ao ponto de partida (ida e volta)

---

### 1.4 Usando a Caneta da Tartaruga

**Objetivo**: Controlar quando a tartaruga desenha e a espessura do traco.

**Conteudo**:
- `pu` / `penup` / `ul` (use levantada) — levantar caneta (mover sem desenhar)
- `pd` / `pendown` / `ub` (use baixada) — abaixar caneta (voltar a desenhar)
- `setpensize N` / `setw N` — definir espessura da caneta
- `ht` / `hideturtle` / `et` (esconda tartaruga) — esconder tartaruga para ver o desenho
- `st` / `showturtle` / `mt` (mostre tartaruga) — mostrar tartaruga novamente
- `home` — voltar ao centro (pode deixar rastro se caneta estiver abaixada)

**Exemplos**:
```logo
fd 50
pu
fd 30
pd
fd 50
; Resultado: duas linhas com espaco no meio
```

**Desafios**:
1. Desenhe uma linha tracejada (fd, pu, fd, pd, repetindo)
2. Desenhe duas linhas paralelas (usar pu para reposicionar)
3. Desenhe com caneta grossa (setpensize 5)

---

### 1.5 Desenhando Sua Primeira Forma: O Quadrado Perfeito

**Objetivo**: Combinar comandos para criar formas fechadas e introduzir `repeat`.

**Conteudo**:
- Desenhando um quadrado passo a passo:
  ```logo
  fd 100 rt 90 fd 100 rt 90 fd 100 rt 90 fd 100 rt 90
  ```
- Observacao: estamos repetindo `fd 100 rt 90` quatro vezes!
- Introducao do `repeat` / `repita`:
  ```logo
  repeat 4 [fd 100 rt 90]
  repita 4 [pf 100 gd 90]
  ```
- A matematica: 4 lados × 90° = 360° (volta completa = forma fechada)
- `cs` / `clearscreen` / `lt` (limpar tela) — limpar tudo e resetar tartaruga

**Exemplos**:
```logo
; Quadrado de 100 passos
repeat 4 [fd 100 rt 90]

; Triangulo equilatero
repeat 3 [fd 100 rt 120]

; Hexagono
repeat 6 [fd 60 rt 60]
```

**Formula magica**: Para um poligono regular de N lados: `repeat N [fd tamanho rt 360/N]`

**Desafios**:
1. Desenhe um quadrado usando `repeat`
2. Desenhe um triangulo equilatero
3. Desenhe um hexagono
4. Desafio bonus: Desenhe um circulo (repeat 360 [fd 1 rt 1])

---

### 1.6 Mais Alguns Comandos Uteis

**Objetivo**: Expandir o repertorio de comandos para posicionamento e controle.

**Conteudo**:
- `home` — voltar ao centro da tela
- `setxy X Y` — mover para coordenadas especificas
- `setx X` / `sety Y` — definir apenas x ou y
- `setheading N` / `seth N` — apontar para direcao especifica (0=cima, 90=dir, 180=baixo, 270=esq)
- `show xcor` / `show ycor` — mostrar posicao atual
- `label "texto` — escrever texto na posicao da tartaruga
- `clean` — apagar desenhos mas manter posicao da tartaruga
- `cs` / `clearscreen` — apagar tudo E resetar tartaruga ao centro
- Modos de tela:
  - `wrap` (padrao) — tartaruga reaparece do lado oposto ao sair da tela
  - `fence` — tartaruga para na borda
  - `window` — tartaruga continua alem da area visivel

**Exemplos**:
```logo
setxy 100 100
label "Oi!
home
```

**Desafios**:
1. Desenhe um quadrado no canto superior direito da tela (usando setxy)
2. Escreva seu nome na tela com `label`
3. Desenhe uma forma, use `clean`, e desenhe outra na mesma posicao

---

### 1.7 O Que Vem Agora?

**Objetivo**: Recapitular o aprendido e preparar para os proximos modulos.

**Conteudo**:
- Recapitulacao: 4 movimentos, caneta, repeat, coordenadas
- Ate agora a tartaruga so faz o que mandamos diretamente
- Proximos "superpoderes": memoria (variaveis), habilidades (procedures), decisoes (logica)
- Desafio livre: criar um desenho combinando tudo aprendido

**Desafio**: Desenho livre — use todos os comandos aprendidos para criar uma arte

---

## Modulo 2: Alem do Basico — Liberando a Criatividade

> Baseado na Secao 3 do curso Academy Europe: "Beyond the Basics"

### 2.1 Superpoderes para Sua Tartaruga

**Objetivo**: Visao geral dos conceitos avancados que transformam a tartaruga de ferramenta manual em agente programavel.

**Conteudo**:
- Ate agora: comandos diretos, um por um
- Proximo nivel: a tartaruga vai ter "memoria" (variaveis), "habilidades" (procedures) e "inteligencia" (logica)
- Diferenca entre controle manual vs. programacao real
- Preview: desenhos que se adaptam, padroes que se repetem, arte que muda sozinha

---

### 2.2 Dando Memoria a Tartaruga: Variaveis

**Objetivo**: Entender variaveis como caixas de memoria nomeadas.

**Conteudo**:
- O que e uma variavel: uma "caixa" com nome onde guardamos um valor
- `make "nome valor` / `faca "nome valor` — criar/atribuir variavel
- `:nome` — usar o valor da variavel (dois pontos antes do nome)
- `print :nome` / `escreva :nome` — mostrar o valor
- Nomes de variaveis: letras, numeros, underscore (sem espacos)
- Operacoes aritmeticas: `+`, `-`, `*`, `/`
- Funcoes matematicas: `sqrt`, `power`, `random`
- `random N` — gerar numero aleatorio de 0 a N-1

**Exemplos**:
```logo
make "tamanho 100
fd :tamanho
rt 90
fd :tamanho

; Mudando o valor
make "tamanho 50
fd :tamanho

; Usando aritmetica
make "lado 80
repeat 4 [fd :lado rt 90]
print :lado * 4    ; perimetro = 320

; Aleatorio!
fd random 200
rt random 360
```

**Desafios**:
1. Crie uma variavel "lado" e desenhe um quadrado com ela
2. Mude o valor da variavel e desenhe outro quadrado (menor ou maior)
3. Use `random` para desenhar uma linha de tamanho aleatorio
4. Calcule e mostre o perimetro de um quadrado usando variaveis

---

### 2.3 Clonando Habilidades: Criando Procedures

**Objetivo**: Criar comandos personalizados reutilizaveis e entender recursao.

**Conteudo**:
- O que e um procedure: um "novo comando" que voce inventa
- Sintaxe:
  ```logo
  to nomeDoComando
    ; instrucoes aqui
  end
  ```
  ```logo
  aprenda nomeDoComando
    ; instrucoes aqui
  fim
  ```
- Chamando procedures como comandos normais
- Procedures com parametros:
  ```logo
  to quadrado :tamanho
    repeat 4 [fd :tamanho rt 90]
  end
  quadrado 100
  quadrado 50
  ```
- Procedures chamando outros procedures (composicao)
- Comentarios com `;` (ponto e virgula)

**Recursao** (conceito avancado):
- Um procedure que chama a si mesmo
- Obrigatorio ter condicao de parada: `if :tamanho < 3 [stop]`
- Exemplo classico — espiral:
  ```logo
  to espiral :tamanho
    if :tamanho < 1 [stop]
    fd :tamanho
    rt 20
    espiral :tamanho * 0.95
  end
  espiral 200
  ```

**Desafios**:
1. Crie um procedure `quadrado` com parametro de tamanho
2. Crie um procedure `casa` que usa `quadrado` + triangulo
3. Crie um procedure `fileira` que desenha 5 quadrados lado a lado
4. Desafio bonus: Crie uma espiral usando recursao

---

### 2.4 Dando Inteligencia: Logica e Decisoes

**Objetivo**: Fazer a tartaruga tomar decisoes com `if` e `while`.

**Conteudo**:
- `if condicao [comandos]` / `se condicao [comandos]` — executar so se a condicao for verdadeira
- Predicados de comparacao: `<`, `>`, `=`
- `while [condicao] [comandos]` / `enquanto [condicao] [comandos]` — repetir enquanto condicao verdadeira
- `stop` / `pare` — sair de um procedure
- Combinando logica com variaveis e random

**Exemplos**:
```logo
; Se o tamanho for grande, desenhar com caneta grossa
make "tamanho 150
if :tamanho > 100 [setpensize 5]
repeat 4 [fd :tamanho rt 90]

; Loop com while
make "contador 10
while [:contador > 0] [
  fd :contador * 10
  rt 90
  make "contador :contador - 1
]

; Caminhada aleatoria com parada condicional
to caminhar :passos
  if :passos < 1 [stop]
  fd 10 + random 20
  rt -45 + random 90
  caminhar :passos - 1
end
caminhar 50
```

**Desafios**:
1. Desenhe um quadrado so se a variavel "tamanho" for maior que 50
2. Use `while` para desenhar uma escada (quadrados decrescentes)
3. Crie uma "caminhada aleatoria" com `random` e `if` para parar
4. Desenhe poligonos diferentes baseado em uma variavel "lados"

---

### 2.5 Sua Jornada como Programador

**Objetivo**: Consolidar tudo e motivar para projetos criativos.

**Conteudo**:
- Recapitulacao completa: movimentos, caneta, repeat, variaveis, procedures, logica
- Voce agora sabe os fundamentos de QUALQUER linguagem de programacao!
- Conceitos aprendidos vs. conceitos universais:
  - Variaveis -> existem em todas as linguagens
  - Procedures -> funcoes em Python, metodos em Java
  - Repeat/while -> loops em qualquer linguagem
  - If -> condicionais em qualquer linguagem
- Proximo passo: referencia completa de comandos e projetos criativos

**Projeto final do modulo**: Criar uma cena completa (casa + sol + grama) usando procedures

---

## Modulo 3: Referencia e Aprofundamento

> Baseado nas Secoes 4 e 5 do curso Academy Europe: "Briefing Document" e "Technical Reference Manual"

### 3.1 Introducao a Linguagem Logo

**Objetivo**: Contexto historico e tecnico da linguagem.

**Conteudo**:
- Historia completa: criada nos anos 1960 por Wally Feurzeig, Daniel Bobrow e Seymour Papert na BBN
- Filosofia educacional de Papert: construtivismo — aprender fazendo
- Logo como dialeto de Lisp simplificado para criancas
- Tipos de dados: numeros (64-bit float), strings (8-bit), booleanos, listas
- Logo e "untyped" — variaveis nao tem tipo fixo

---

### 3.2 Turtle Graphics e o Mundo de Coordenadas

**Objetivo**: Dominar o sistema de coordenadas e posicionamento absoluto.

**Conteudo**:
- Plano cartesiano: eixo X (horizontal) e eixo Y (vertical)
- Origem (0, 0) no centro da tela
- Coordenadas extremas: tipicamente -250 a +250 em cada eixo
- Estado da tartaruga: posicao (x, y) + direcao (heading)
- Posicionamento relativo vs. absoluto:
  - Relativo: `fd`, `bk`, `rt`, `lt` (a partir de onde esta)
  - Absoluto: `setxy`, `setx`, `sety`, `setheading` (posicao exata)
- Consultas de posicao: `xcor`, `ycor`, `heading`
- Tres modos de tela:
  - `wrap` (padrao): reaparece do lado oposto
  - `fence`: para na borda (erro se tentar ultrapassar)
  - `window`: canvas infinito (pode sair da area visivel)

**Comandos**:
| Comando | Descricao |
|---------|-----------|
| `setxy X Y` | Mover para coordenadas absolutas |
| `setx X` | Definir apenas coordenada X |
| `sety Y` | Definir apenas coordenada Y |
| `setheading N` / `seth N` | Apontar para direcao (0=cima, 90=dir) |
| `xcor` | Retorna coordenada X atual |
| `ycor` | Retorna coordenada Y atual |
| `heading` | Retorna direcao atual |
| `towards [X Y]` | Retorna angulo em direcao a um ponto |
| `home` | Voltar a origem (0,0) com heading 0 |

**Desafios**:
1. Desenhe um quadrado usando apenas `setxy` (sem fd/rt)
2. Descubra e mostre a posicao da tartaruga apos uma sequencia de movimentos
3. Faca a tartaruga "pular" entre pontos especificos desenhando um padrao

---

### 3.3 Construcoes de Programacao Essenciais

**Objetivo**: Referencia completa de variaveis, aritmetica e repeticao.

**Conteudo**:

**Variaveis**:
| Operacao | Sintaxe | Exemplo |
|----------|---------|---------|
| Criar/atribuir | `make "nome valor` | `make "x 100` |
| Usar valor | `:nome` | `fd :x` |
| Mostrar | `print :nome` | `print :x` → 100 |
| Mostrar (detalhado) | `show :nome` | `show :x` → 100 |

**Aritmetica**:
| Operador | Descricao | Exemplo |
|----------|-----------|---------|
| `+` | Soma | `print 3 + 4` → 7 |
| `-` | Subtracao | `print 10 - 3` → 7 |
| `*` | Multiplicacao | `print 5 * 6` → 30 |
| `/` | Divisao | `print 10 / 3` → 3.333 |

**Funcoes matematicas**:
| Funcao | Descricao | Exemplo |
|--------|-----------|---------|
| `sqrt N` | Raiz quadrada | `sqrt 144` → 12 |
| `power B E` | Potencia | `power 2 8` → 256 |
| `random N` | Aleatorio 0 a N-1 | `random 100` → 0-99 |
| `abs N` | Valor absoluto | `abs -5` → 5 |
| `int N` | Parte inteira | `int 3.7` → 3 |
| `round N` | Arredondar | `round 3.7` → 4 |
| `remainder A B` | Resto da divisao | `remainder 10 3` → 1 |

**Repeticao**:
```logo
; repeat — numero fixo de vezes
repeat 4 [fd 100 rt 90]

; Usando variavel no repeat
make "lados 6
repeat :lados [fd 50 rt 360 / :lados]
```

---

### 3.4 Tecnicas Avancadas de Programacao

**Objetivo**: Dominar procedures, recursao e controle de fluxo.

**Conteudo**:

**Procedures completos**:
```logo
; Sem parametros
to quadrado
  repeat 4 [fd 100 rt 90]
end

; Com parametros
to poligono :lados :tamanho
  repeat :lados [fd :tamanho rt 360 / :lados]
end

; Procedure chamando procedure
to flor :petalas :tamanho
  repeat :petalas [
    poligono 4 :tamanho
    rt 360 / :petalas
  ]
end
```

**Controle de fluxo completo**:
| Comando | Sintaxe | Descricao |
|---------|---------|-----------|
| `repeat` | `repeat N [cmds]` | Repetir N vezes |
| `while` | `while [cond] [cmds]` | Repetir enquanto condicao verdadeira |
| `for` | `for [var inicio fim passo] [cmds]` | Loop com contador |
| `if` | `if cond [cmds]` | Executar se verdadeiro |
| `ifelse` | `ifelse cond [true] [false]` | Se/senao |
| `stop` | `stop` | Sair do procedure atual |
| `output` | `output valor` | Retornar valor de um procedure |

**Recursao com exemplos**:
```logo
; Espiral recursiva
to espiral :tamanho :angulo
  if :tamanho < 1 [stop]
  fd :tamanho
  rt :angulo
  espiral :tamanho * 0.95 :angulo
end

; Arvore fractal
to arvore :tamanho :nivel
  if :nivel < 1 [stop]
  fd :tamanho
  lt 30
  arvore :tamanho * 0.7 :nivel - 1
  rt 60
  arvore :tamanho * 0.7 :nivel - 1
  lt 30
  bk :tamanho
end

; Triangulo de Sierpinski
to sierpinski :tamanho :nivel
  if :nivel = 0 [repeat 3 [fd :tamanho rt 120] stop]
  sierpinski :tamanho / 2 :nivel - 1
  fd :tamanho / 2
  sierpinski :tamanho / 2 :nivel - 1
  bk :tamanho / 2
  lt 60
  fd :tamanho / 2
  rt 60
  sierpinski :tamanho / 2 :nivel - 1
  lt 60
  bk :tamanho / 2
  rt 60
end
```

---

### 3.5 Manipulacao de Dados e Estetica

**Objetivo**: Dominar cores, preenchimento e strings.

**Conteudo**:

**Sistema de cores RGB** (Red, Green, Blue — valores 0 a 255):
- 16.777.216 cores possiveis (256 × 256 × 256)
- Exemplos: `[255 0 0]` = vermelho, `[0 255 0]` = verde, `[0 0 255]` = azul
- `[255 255 0]` = amarelo, `[255 255 255]` = branco, `[0 0 0]` = preto

**Comandos de cor**:
| Comando | Alias | Descricao |
|---------|-------|-----------|
| `setpencolor [R G B]` | `setpc` | Cor da caneta |
| `setfloodcolor [R G B]` | `setfc` | Cor de preenchimento |
| `setscreencolor [R G B]` | `setsc`, `setbg` | Cor de fundo |
| `fill` | — | Preencher area fechada onde a tartaruga esta |
| `pencolor` | `pc` | Retorna cor atual da caneta |

**Fluxo de preenchimento**:
```logo
; 1. Desenhar forma fechada
repeat 4 [fd 100 rt 90]
; 2. Levantar caneta
pu
; 3. Mover para dentro da forma
setxy 50 50
; 4. Definir cor de preenchimento
setfc [255 0 0]
; 5. Preencher!
fill
; 6. Esconder tartaruga para ver resultado
ht
```

**Exemplo completo com cores**:
```logo
cs
setpensize 3
setpc [255 0 0]
setfc [0 0 255]
setsc [200 200 200]
repeat 4 [fd 80 rt 90]
pu
setxy 40 40
fill
ht
```

**Strings** (manipulacao de texto):
| Funcao | Descricao | Exemplo |
|--------|-----------|---------|
| `"texto` | String literal | `print "Ola` |
| `word "a "b` | Concatenar | `word "Ola "Mundo` → OlaMundo |
| `first "Ola` | Primeiro caractere | → O |
| `butfirst "Ola` | Tudo menos o primeiro | → la |
| `count "Ola` | Tamanho | → 3 |
| `emptyp "` | Verificar se vazio | → true |

---

### 3.6 Programacao Procedural Avancada

**Objetivo**: Construir programas complexos com composicao de procedures.

**Conteudo**:
- Decomposicao: quebrar problemas grandes em sub-procedures
- Composicao hierarquica: procedures que chamam procedures que chamam procedures
- `output` para retornar valores:
  ```logo
  to dobro :n
    output :n * 2
  end
  print dobro 5    ; → 10
  ```
- Salvar e carregar procedures (conceitual — no GalloGo, procedures persistem na sessao)
- Patterns de design:
  - Padrao "flor": repetir uma forma girando a cada iteracao
  - Padrao "espiral": repetir reduzindo o tamanho
  - Padrao "fractal": recursao com reducao de escala

---

### 3.7 Sistema de Cores e Preenchimento — Referencia Completa

**Objetivo**: Referencia tecnica completa do sistema de cores.

**Conteudo**:

**Tres formas de especificar cores**:
1. **Numero** (0-15): cores predefinidas
   - 0=preto, 1=azul, 2=verde, 4=vermelho, 5=magenta, 6=amarelo, 7=branco, 14=laranja, 15=cinza
2. **Nome**: `setpc "red`, `setpc "blue`, `setpc "green` (22 nomes disponiveis)
3. **RGB**: `setpc [R G B]` com valores 0-255 (mais preciso, 16M+ cores)

**Comandos completos**:
| Comando | Alias | O que faz |
|---------|-------|-----------|
| `setpencolor` | `setpc` | Define cor da caneta |
| `setfloodcolor` | `setfc` | Define cor de preenchimento |
| `setscreencolor` | `setsc`, `setbg` | Define cor de fundo |
| `setpensize [N N]` | `setw` | Define espessura da caneta |
| `fill` | — | Preenche area fechada |
| `pencolor` | `pc` | Consulta cor da caneta |
| `show pencolor` | — | Mostra valor RGB da caneta |
| `show floodcolor` | — | Mostra valor RGB do fill |
| `show screencolor` | — | Mostra valor RGB do fundo |

**Projeto**: Desenhar e colorir uma bandeira (forma + fill com cores diferentes)

---

## Modulo 4: Guia do Educador — Pedagogia Logo

> Baseado na Secao 6 do curso Academy Europe: "An Educator's Handbook for Teaching Programming with Logo"

### 4.1 O Poder Pedagogico do Logo

**Contexto**:
- Filosofia de Seymour Papert: construtivismo — criancas aprendem construindo
- "Raciocinio corporal" (body-syntonic reasoning): a crianca se imagina como a tartaruga
- Por que Logo e ideal para ensinar programacao a criancas:
  - Feedback visual imediato
  - Conexao com matematica (geometria, angulos)
  - Progressao natural do concreto ao abstrato
  - Baixa barreira de entrada, alto teto de complexidade

### 4.2 Fundamentos de Turtle Graphics (Plano de Aula)

**Objetivo pedagogico**: Ensinar comandos basicos com atividades praticas.

**Atividades sugeridas**:
1. "Seja a tartaruga": alunos caminham pela sala seguindo instrucoes verbais
2. Desenhar letras do alfabeto (L, T, F, E — linhas retas)
3. Desenhar uma casa (quadrado + triangulo)
4. Desafio do labirinto: tartaruga deve navegar um caminho especifico
5. Concepcoes erradas comuns: angulos de giro vs. angulos internos de formas

### 4.3 Introducao a Logica de Programacao (Plano de Aula)

**Objetivo pedagogico**: Ensinar variaveis, procedures e condicionais.

**Atividades sugeridas**:
1. "Receita de bolo": procedures como receitas que podem ser reutilizadas
2. "Caixa de ferramentas": cada procedure e uma nova ferramenta
3. Depuracao guiada: encontrar e corrigir erros em codigo dado
4. Progressao: concreto (comandos diretos) -> abstrato (variaveis e procedures)

### 4.4 Expandindo o Pensamento Computacional (Plano de Aula)

**Objetivo pedagogico**: Ensinar decomposicao, padroes e recursao.

**Atividades sugeridas**:
1. Decomposicao: "Como desenhar uma cidade?" -> dividir em casas, arvores, nuvens
2. Reconhecimento de padroes: espirais, estrelas, mandalas
3. Algoritmo: descrever o passo-a-passo antes de programar
4. Recursao visual: arvores fractais, flocos de neve de Koch

### 4.5 Aprimorando Criacoes Visuais (Plano de Aula)

**Objetivo pedagogico**: Ensinar cores e projetos criativos.

**Atividades sugeridas**:
1. Caleidoscopio: combinacoes de repeat + cores
2. Mandala: simetria com procedures
3. Paisagem: composicao de multiplos procedures
4. Portfolio digital: salvar e compartilhar criações

---

## Modulo 5: Avaliacao e Projetos

> Baseado na Secao 7 do curso Academy Europe: "Logo Programming Study Guide"

### 5.1 Quiz: Fundamentos de Logo

**Topicos avaliados**:
- Comandos de movimento (fd, bk, rt, lt)
- Controle de caneta (pu, pd, setpensize)
- Sistema de coordenadas (setxy, xcor, ycor)
- Repeticao (repeat e seus usos)
- Variaveis (make, uso com :)
- Procedures (to/end, parametros)
- Recursao (conceito e condicao de parada)
- Condicionais (if, while)
- Cores (setpencolor, setfloodcolor, fill)

### 5.2 Projetos Finais por Faixa Etaria

**Age 6-8 — Projetos Criativos Simples**:
1. Desenhar uma casa colorida com jardim
2. Criar um robo usando formas geometricas
3. Desenhar sua letra inicial estilizada

**Age 8-12 — Projetos Intermediarios**:
1. Cidade completa (procedures para casa, predio, arvore, carro)
2. Mandala simetrica usando repeat e procedures
3. Jogo de labirinto com caminho programado

**Age 10-14 — Projetos Avancados**:
1. Arvore fractal com folhas coloridas
2. Floco de neve de Koch (3 niveis de recursao)
3. Espiral de Fibonacci visualizada
4. Paisagem procedural gerada com random

### 5.3 Glossario de Termos-Chave

| Termo | Definicao |
|-------|-----------|
| **Tartaruga** | Cursor grafico que se move e desenha no canvas |
| **Forward (fd)** | Mover a tartaruga para frente N passos |
| **Backward (bk)** | Mover a tartaruga para tras N passos |
| **Right (rt)** | Girar a tartaruga N graus no sentido horario |
| **Left (lt)** | Girar a tartaruga N graus no sentido anti-horario |
| **Penup (pu)** | Levantar a caneta — mover sem desenhar |
| **Pendown (pd)** | Abaixar a caneta — voltar a desenhar |
| **Clearscreen (cs)** | Limpar o canvas e resetar a tartaruga |
| **Repeat** | Repetir um bloco de comandos N vezes |
| **Variavel** | Nome que armazena um valor na memoria |
| **Make** | Comando para criar/atribuir valor a uma variavel |
| **Procedure** | Bloco de comandos nomeado e reutilizavel |
| **To / End** | Delimitadores de definicao de procedure |
| **Parametro** | Valor passado para um procedure (`:nome`) |
| **Recursao** | Technique onde um procedure chama a si mesmo |
| **Stop** | Sair do procedure atual (condicao de parada) |
| **Output** | Retornar um valor de dentro de um procedure |
| **If** | Executar comandos apenas se uma condicao for verdadeira |
| **While** | Repetir comandos enquanto condicao for verdadeira |
| **Setpencolor** | Definir a cor da caneta usando RGB |
| **Fill** | Preencher area fechada com cor |
| **Random** | Gerar um numero aleatorio |
| **Heading** | Direcao atual da tartaruga em graus |
| **Coordenadas** | Posicao (x, y) da tartaruga no canvas |
| **RGB** | Modelo de cor: Red, Green, Blue (0-255 cada) |
| **Wrap** | Modo de tela onde tartaruga reaparece do lado oposto |
| **Fence** | Modo de tela onde tartaruga para na borda |
| **Window** | Modo de tela com canvas infinito |

---

## Referencia Completa de Comandos Logo

### Movimento
| Comando | Alias PT | Argumentos | Descricao |
|---------|----------|-----------|-----------|
| `fd N` | `pf N` | N = passos | Mover para frente |
| `bk N` | `pt N` | N = passos | Mover para tras |
| `rt N` | `gd N` | N = graus | Girar direita (sentido horario) |
| `lt N` | `ge N` | N = graus | Girar esquerda (sentido anti-horario) |

### Posicionamento
| Comando | Alias | Argumentos | Descricao |
|---------|-------|-----------|-----------|
| `home` | — | — | Voltar ao centro (0,0), heading 0 |
| `setxy X Y` | — | X, Y | Mover para coordenadas absolutas |
| `setx X` | — | X | Definir coordenada X |
| `sety Y` | — | Y | Definir coordenada Y |
| `setheading N` | `seth` | N = graus | Definir direcao absoluta |

### Caneta
| Comando | Alias | Descricao |
|---------|-------|-----------|
| `pu` | `penup` | Levantar caneta |
| `pd` | `pendown` | Abaixar caneta |
| `pe` | `penerase` | Caneta apaga ao mover |
| `px` | `penreverse` | Caneta inverte (desenha/apaga) |
| `setpensize N` | `setw` | Definir espessura |
| `setpencolor [R G B]` | `setpc` | Definir cor da caneta |

### Tartaruga
| Comando | Alias | Descricao |
|---------|-------|-----------|
| `ht` | `hideturtle` | Esconder tartaruga |
| `st` | `showturtle` | Mostrar tartaruga |

### Tela
| Comando | Alias | Descricao |
|---------|-------|-----------|
| `cs` | `clearscreen` | Limpar tudo e resetar tartaruga |
| `clean` | — | Limpar desenhos, manter posicao |
| `ct` | `cleartext` | Limpar area de texto |
| `wrap` | — | Modo: reaparece do lado oposto |
| `fence` | — | Modo: para na borda |
| `window` | — | Modo: canvas infinito |

### Cores e Preenchimento
| Comando | Alias | Descricao |
|---------|-------|-----------|
| `setpencolor [R G B]` | `setpc` | Cor da caneta |
| `setfloodcolor [R G B]` | `setfc` | Cor de preenchimento |
| `setscreencolor [R G B]` | `setsc`, `setbg` | Cor de fundo |
| `fill` | — | Preencher area fechada |

### Consultas
| Comando | Retorna |
|---------|---------|
| `xcor` | Coordenada X atual |
| `ycor` | Coordenada Y atual |
| `heading` | Direcao atual (graus) |
| `towards [X Y]` | Angulo em direcao a ponto |
| `pencolor` | Cor atual da caneta |

### Variaveis e Saida
| Comando | Descricao |
|---------|-----------|
| `make "nome valor` | Criar/atribuir variavel |
| `:nome` | Usar valor da variavel |
| `print valor` | Mostrar valor no output |
| `show valor` | Mostrar valor (detalhado) |
| `label "texto` | Escrever texto na posicao da tartaruga |

### Matematica
| Funcao | Descricao |
|--------|-----------|
| `+ - * /` | Operacoes basicas |
| `sqrt N` | Raiz quadrada |
| `power B E` | Potencia (B elevado a E) |
| `abs N` | Valor absoluto |
| `int N` | Parte inteira |
| `round N` | Arredondar |
| `remainder A B` | Resto da divisao |
| `random N` | Aleatorio de 0 a N-1 |

### Controle de Fluxo
| Comando | Sintaxe | Descricao |
|---------|---------|-----------|
| `repeat` | `repeat N [cmds]` | Repetir N vezes |
| `while` | `while [cond] [cmds]` | Repetir enquanto verdadeiro |
| `for` | `for [var ini fim passo] [cmds]` | Loop com contador |
| `if` | `if cond [cmds]` | Executar se verdadeiro |
| `ifelse` | `ifelse cond [v] [f]` | Se/senao |
| `stop` | `stop` | Sair do procedure |
| `output` | `output valor` | Retornar valor |

### Procedures
| Comando | Descricao |
|---------|-----------|
| `to nome :params ... end` | Definir procedure |
| `nome args` | Chamar procedure |
| `;` | Comentario (ignorado) |

---

## Mapeamento: Curriculo -> Faixas Etarias do GalloGo

| Conteudo | 6-8 (Explorador) | 8-12 (Aventureiro) | 10-14 (Hacker) |
|----------|:-:|:-:|:-:|
| Modulo 1: Primeiros Passos | Completo | Resumido | Resumido |
| Modulo 2: Alem do Basico | Parcial (sem recursao) | Completo | Completo |
| Modulo 3: Referencia Tecnica | Nao | Parcial | Completo |
| Modulo 4: Pedagogia | Nao (para educadores) | Nao (para educadores) | Nao (para educadores) |
| Modulo 5: Projetos | Projetos simples | Projetos intermediarios | Projetos avancados |

### Adaptacoes por Idade

**6-8 (Explorador)**:
- Apenas comandos basicos: fd, bk, rt, lt, pu, pd, repeat, cs, home
- Sem variaveis, sem procedures, sem logica condicional
- Foco em exploracoes visuais e desenhos simples
- Instrucoes com ilustracoes e linguagem simples
- Desafios: "Desenhe um quadrado", "Faca uma estrela"

**8-12 (Aventureiro)**:
- Todos os comandos basicos + variaveis + procedures + repeat avancado
- Introducao a if/while simplificada
- Recursao apenas como conceito com exemplos guiados
- Foco em criar procedures reutilizaveis e padroes geometricos
- Desafios: "Crie um procedure cidade", "Desenhe uma mandala"

**10-14 (Hacker)**:
- Curriculo completo incluindo recursao, for/foreach, output, strings
- Foco em pensamento algoritmico e eficiencia
- Fractais, arvores, padroes complexos
- Referencia tecnica completa disponivel
- Desafios: "Implemente Koch snowflake", "Crie arte generativa"
