// import { GoogleGenerativeAI } from "@google/generative-ai";
// import History from "../models/History.js";


// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({
//   model: "gemini-2.5-flash",
// });


// const cleanJson = (text) => {
//   return text
//     .replace(/```json/g, "")
//     .replace(/```/g, "")
//     .trim();
// };

// const callGemini = async (prompt) => {
//   try {
//     const result = await model.generateContent(prompt);

//     return cleanJson(result.response.text());
//   } catch (error) {
//     console.error("Gemini Error:");
//     console.error(error);

//     throw error;
//   }
// };

// export const reviewCodeService = async ({
//   userId,
//   language,
//   code,
// }) => {
//   const prompt = `
// You are a Senior Software Engineer.

// Review this ${language} code.

// Return ONLY valid JSON.

// {
//   "score":0,
//   "summary":"",
//   "issues":[
//       {
//         "severity":"High",
//         "title":"",
//         "description":""
//       }
//   ],
//   "suggestions":[]
// }

// Code

// ${code}
// `;

//   const response = await callGemini(prompt);

//   const parsed = JSON.parse(response);

//   await History.create({
//     user: userId,
//     feature: "code-review",
//     title: `Code Review (${language})`,
//     language,
//     input: code,
//     output: parsed,
//   });

//   return parsed;
// };


// export const generateReadmeService = async ({
//   userId,
//   projectName,
//   description,
//   techStack,
//   features,
// }) => {
//   const prompt = `
// Generate a professional GitHub README.

// Project Name

// ${projectName}

// Description

// ${description}

// Tech Stack

// ${techStack}

// Features

// ${features}

// Return markdown only.
// `;

//   const result = await model.generateContent(prompt);

//   const markdown = result.response.text();

//   await History.create({
//     user: userId,
//     feature: "readme-generator",
//     title: projectName,
//     input: description,
//     output: markdown,
//   });

//   return markdown;
// };

// export const generateUnitTestService = async ({
//   userId,
//   language,
//   code,
// }) => {
//   const prompt = `
// Generate unit tests for the following ${language} code.

// Return only code.

// ${code}
// `;

//   const result = await model.generateContent(prompt);

//   const tests = result.response.text();

//   await History.create({
//     user: userId,
//     feature: "unit-test-generator",
//     title: `Unit Test (${language})`,
//     language,
//     input: code,
//     output: tests,
//   });

//   return tests;
// };