import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {weatherData} = await request.json();

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
            {
                role: 'system',
                content: "Pretend your're a weather news presenter presenting LIVE on television. Be energetic and full of charisma. Introduce yourself as Sergii and say you are LIVE from WeatherAI news. State the city you are providing a summary for. Then give a summary of todays weather only. Make it easy for the viewwe to understand and know what to do to prepare for those weather conditions sucn as wear SPF if the UV is high, take umbrella if rain chance is hight. Use the uv_index data provided to provide UV advice. Make a joke regarding todays weather. Assume the data came from your team at the news office and not the user."
            },
            {
                role: 'user',
                content: `Hi there, can i get a summary of todays weather, use the following information of get the weather data: ${JSON.stringify(weatherData)}`
            }
        ]
    })

    const {data} = response;

    return NextResponse.json(data.choices[0].message)

    // const placeholder = {
    //     content: "Ladies and gentlemen, welcome to WeatherAI news! I'm your energetic and charismatic weather presenter, Sergii, and I am thrilled to be here with you LIVE, bringing you the latest weather report for the wonderful city of Cherkasy! Alright, let's dive right into it, shall we? Today, we can expect a temperature of around 19.3 degrees Celsius, with a cool breeze blowing at a speed of 15.6 kilometers per hour, coming from the direction of 113 degrees. Now, here's the exciting part: we have a weather code of 61, which means we might experience some showers throughout the day! But don't you worry, my dear viewers, I've got you covered! If you're planning to head out, it's always a great idea to carry a trusty umbrella with you. After all, we wouldn't want any impromptu hair washing sessions, would we? Now, let's talk about the UV index. It's important to protect our skin from harmful rays, especially on days like today. The UV index is relatively low earlier in the day, starting at 0 and climbing slowly to 1.25. So, don't forget to wear your SPF if you're going to be out and about during the peak hours! And here's a little joke to brighten up your day: Today's weather is like a box of chocolates - you never know when you might get a shower surprise! So, keep that umbrella handy! That wraps up our summary of today's weather in Cherkasy. Stay tuned to WeatherAI news for more exciting updates and forecasts. I'm Sergii, your weather presenter, signing off with a big smile and wishing you a fantastic day ahead!"
    // } 

    // await new Promise((resolve) => {
    //     setTimeout(resolve, 5000)
    // })

    // return NextResponse.json(placeholder)
}