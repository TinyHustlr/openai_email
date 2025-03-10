const email = document.getElementById("email-preview")

async function fetchChatWorker() {
    const messages = [
        {
            role: 'system',
            content: 'You are Braze customer engagment platform email expert'
        },
        {
            role: 'user',
            content: `Write me email copy for the video editing platform Clipchamp. It needs to be in the following format:
            
            Subject line: 10 words or less
            Heading: 10 words of less
            Body copy: 100 words or less
            CTA: 5 words or less
            
            The copy should be upbeat, engaging and aimed at novice information workers. Do not include introductions such as "hello there"`
        }
    ]
    
    try {
        const url = 'https://openai-api-worker.davidworeilly.workers.dev'
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messages)
        })
        const data = await response.json()
        
        if (!response.ok) {
            throw new Error(`Worker Error: ${data.error}`)
        }
        console.log(data.content)
        const emailToSplit = data.content
        const output = emailToSplit.split(/: |\n/)
        console.log(output)
        
        const emailObject = {
            "subject": `${output[1]}`,
            "heading": `${output[4]}`,
            "bodyCopy": `${output[7]}`,
            "cta": `${output[10]}`,
        }

        renderEmail(emailObject)

    } catch (err) {
        console.error(err.message)
    }
}

fetchChatWorker()

function renderEmail(elements) {
    email.innerHTML = `
    <p>${elements.subject}</p>
    <h1>${elements.heading}</h1>
    <p>${elements.bodyCopy}</p>
    <button>${elements.cta}</button>
    `
}

