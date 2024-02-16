import { Button, Farc, TextInput } from 'farc'
import { handle } from 'farc/vercel'

const app = new Farc({ basePath: '/api' })

export const config = {
  // runtime: 'edge', // Uncomment to use Edge Runtime
}

app.frame('/', (context) => {
  const { buttonValue, inputText, status } = context
  const fruit = inputText || buttonValue
  return {
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            ? `Nice choice.${fruit ? ` ${fruit.toUpperCase()}!!` : ''}`
            : 'Welcome!'}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter custom fruit..." />,
      <Button value="apples">Apples</Button>,
      <Button value="oranges">Oranges</Button>,
      <Button value="bananas">Bananas</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  }
})

export const GET = handle(app)
export const POST = handle(app)

if (process.env.NODE_ENV === 'development') {
  const { serve } = await import('bun')
  const server = serve(app)
  console.log(`𝑭𝒂𝒓𝒄 ▶︎ http://localhost:${server.port}/dev`)
}
