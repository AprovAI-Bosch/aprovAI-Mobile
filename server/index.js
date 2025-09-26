require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const OpenAI = require('openai')

const app = express()
const PORT = 3000

app.use(bodyParser.json())

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Route to receive test data
app.post('/upload', async (req, res) => {
  try {
    const prova = req.body.tests // The student's test text

    if (!prova) {
      return res.status(400).json({ error: 'No test data provided' })
    }

    // Prompt for GPT
    const prompt = `
Você é um professor experiente corrigindo uma prova de estudante em português brasileiro.

## DADOS DA PROVA:
${prova}

## INSTRUÇÕES FUNDAMENTAIS:
1. Avalie APENAS as questões enviadas - NÃO invente questões
2. (se informado) EXTRAIA O PESO de cada questão do formato "Questão X (Y)" onde Y é o peso 
3. Seja PRECISO e CONSISTENTE em suas avaliações

## CRITÉRIOS DE AVALIAÇÃO DETALHADOS:

### Para considerar CORRETA (correct: true):
- A resposta demonstra compreensão do conceito principal
- Atende ao que foi solicitado na questão
- Contém informações factualmente corretas
- É coerente e faz sentido no contexto
- NÃO precisa ser perfeita ou exaustiva

### Para considerar INCORRETA (correct: false):
- Contém erros conceituais graves ou factuais
- Não atende ao solicitado na questão
- Demonstra clara falta de compreensão
- Resposta completamente fora de contexto

## REGRAS DE FEEDBACK:
- Se correct=true: feedback deve ser "" (string vazia)
- Se correct=false: feedback DEVE explicar especificamente o erro e como melhorar

## CÁLCULO DA NOTA (CRÍTICO):
1. Some os pesos de TODAS as questões para obter o total_possivel
2. Some os pesos apenas das questões CORRETAS para obter pontos_obtidos
3. Calcule: final_score = (pontos_obtidos / total_possivel) * 10
4. Arredonde para 1 casa decimal

## EXEMPLO DE CÁLCULO:
Se temos 3 questões com pesos 3, 2, 5:
- Total possível = 3+2+5 = 10
- Se acertou questões 1 e 3: pontos = 3+5 = 8
- Nota final = (8/10) * 10 = 8.0

## VERIFICAÇÃO DUPLA:
Antes de retornar, verifique:
1. O número de questões no JSON corresponde às questões avaliadas?
2. Os pesos foram extraídos corretamente?
3. A nota foi calculada corretamente usando os pesos?
4. Os feedbacks estão específicos e úteis?

## FORMATO DE RESPOSTA OBRIGATÓRIO:
Retorne APENAS um JSON válido:
{
  "total_questoes": <número total de questões da prova>,
  "total_acertos": <quantidade de questões corretas>,
  "total_erros": <quantidade de questões erradas>,
  "questoes": [
    {
      "questao": <número da questão>,
      "correta": <true ou false, se o aluno acertou ou errou>,
      "pergunta": "<enunciado da questão>",
      "resposta": "<resposta dada pelo aluno>",
      "feedback": "<explicação do erro, se a resposta estiver errada; vazio se correta>"
    },
     . . . 
    ]
"media_perguntas": <soma do total de acertos (dividido) pelo total de questões (exemplo: 5 questões acertadas dividido por 7 questões, a média do mesmo deve ser aproximadamente 0,7), retorne um valor inteiro para a média final (ex: 1, 2, 4,5,6,7,8,9,10)>,
}

IMPORTANTE: Seja justo e consistente. Questões com respostas corretas devem ser marcadas como corretas, mesmo que simples.
`
    // Call to OpenAI API
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini', // choose the model you want
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3, // low = more deterministic answers
      response_format: { type: 'json_object' }, // enforce valid JSON output
    })

    let content = response.choices[0].message.content

    // Try to parse the GPT output as JSON
    let result
    try {
      result = JSON.parse(content)
    } catch (e) {
      result = { raw: content, error: 'Output was not valid JSON' }
    }
    return res.json(result)
  } catch (error) {
    console.error('Error processing test data:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})