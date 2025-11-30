import { Router } from 'express';
import OpenAI from 'openai';

const router = Router();

// Make OpenAI optional - gracefully handle missing API key
let openai: OpenAI | null = null;
if (process.env.OPENAI_API_KEY) {
            ],
    model: "gpt-3.5-turbo",
        });

res.json({ plan: completion.choices[0].message.content });
    } catch (error) {
    console.error(error);
    // Return mock response if API fails or key is missing
            ],
    model: "gpt-3.5-turbo",
        });

res.json({ summary: completion.choices[0].message.content });
    } catch (error) {
    res.json({ summary: "Mock Summary: This text explains the core concepts of..." });
}
});

export default router;
