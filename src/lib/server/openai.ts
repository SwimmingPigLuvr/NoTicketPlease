import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

export const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
});

export async function generateLetter(ticketDetails: any, courtFormatting: any) {
	const prompt = `Generate a formal traffic ticket declaration letter with the following details:
    Ticket Information: ${JSON.stringify(ticketDetails)}
    Court Formatting Requirements: ${JSON.stringify(courtFormatting)}
    
    Please ensure:
    1. Professional and formal tone
    2. Follow court formatting requirements
    3. Include all required sections
    4. Maintain proper spacing
    5. Include all special statements`;

	try {
		const completion = await openai.chat.completions.create({
			messages: [{ role: "user", content: prompt }],
			model: "gpt-4",
			temperature: 0.7,
			max_tokens: 2000
		});

		return completion.choices[0].message.content || 'Failed to generate letter';
	} catch (error) {
		console.error('OpenAI API error:', error);
		throw new Error('Failed to generate letter');
	}
}
