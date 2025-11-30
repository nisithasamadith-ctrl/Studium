import { Router } from 'express';
import OpenAI from 'openai';

const router = Router();

// Make OpenAI optional - gracefully handle missing API key
let openai: OpenAI | null = null;
if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
}

// Generate Study Plan
router.post('/studyplan', async (req, res) => {
    const { tasks, assignments } = req.body;

    if (!openai) {
        return res.json({
            plan: "OpenAI is not configured. Add OPENAI_API_KEY to enable AI features.\n\nMock Study Plan:\n- Focus on Math Assignment (Due tomorrow)\n- Review History notes for 30 mins."
        });
    }

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful study assistant. Generate a study plan based on the user's tasks and assignments." },
                { role: "user", content: `Tasks: ${JSON.stringify(tasks)}, Assignments: ${JSON.stringify(assignments)}` }
            ],
            model: "gpt-3.5-turbo",
        });

        res.json({ plan: completion.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.json({ plan: "Mock Study Plan: \n- Focus on Math Assignment (Due tomorrow)\n- Review History notes for 30 mins." });
    }
});

// Summarize Text
router.post('/summarize', async (req, res) => {
    const { text } = req.body;

    if (!openai) {
        return res.json({
            summary: "OpenAI is not configured. Add OPENAI_API_KEY to enable AI features.\n\nMock Summary: This text explains the core concepts of..."
        });
    }

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "Summarize the following text for a student." },
                { role: "user", content: text }
            ],
            model: "gpt-3.5-turbo",
        });

        res.json({ summary: completion.choices[0].message.content });
    } catch (error) {
        res.json({ summary: "Mock Summary: This text explains the core concepts of..." });
    }
});

export default router;
