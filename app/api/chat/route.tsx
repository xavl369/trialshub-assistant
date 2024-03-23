import { /*LangChainStream, */StreamingTextResponse, Message } from 'ai'
//import { CallbackManager } from '@langchain/core/callbacks/manager';
//import { ChatOpenAI } from '@langchain/openai';
//import { AIMessage, HumanMessage } from '@langchain/core/messages';
//import { PromptTemplate } from "@langchain/core/prompts";
import { TRIALSHUB_TEMPLATE } from '../../prompts/templates';
// import {
//     ChatPromptTemplate,
//     HumanMessagePromptTemplate,
//     SystemMessagePromptTemplate,
//     MessagesPlaceholder,
//   } from "@langchain/core/prompts";
//import { ConversationChain } from 'langchain/chains';
import { BufferMemory } from 'langchain/memory';
import { HumanMessage } from "@langchain/core/messages";
import { NextResponse } from "next/server";
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { getChatOpenAI,
         getConversationChain ,
         getUpstashRedisChatMessageHistory, 
         getConversationSummaryBufferMemory } from '@/app/services/langchainService';
import { Redis } from '@upstash/redis';
import { UpstashRedisChatMessageHistory } from '@langchain/community/stores/message/upstash_redis';

//for retieval using RetrievalQAChain using a retriever vectorStore from faiss file index
//import { readFileSync } from "node:fs";
//import { join } from "node:path";

//export const runtime = "edge";


export const POST = async (req: Request) => {
  
  const { messages, sessionId } = await req.json();
    // const { stream, handlers } = LangChainStream();
    
    // const model = new ChatOpenAI({
    //     streaming: true,
    //     callbackManager: CallbackManager.fromHandlers(handlers)
    // });

    // const chatPrompt = ChatPromptTemplate.fromMessages([
    //     SystemMessagePromptTemplate.fromTemplate(TRIALSHUB_TEMPLATE),
    //     new MessagesPlaceholder("history"),
    //     HumanMessagePromptTemplate.fromTemplate("{input}"),
    //   ]);

    // model.invoke(
    //     (messages as Message[]).map((m) =>
    //         m.role === 'user'
    //             ? new HumanMessage(m.content)
    //             : new AIMessage(m.content)
    //     )
    // )
    // .catch(console.error);

    // const memory = new BufferMemory({ returnMessages: true, memoryKey: "history" });
    // const chain = new ConversationChain({
    //     memory: memory,
    //     prompt: chatPrompt,
    //     llm: model,
    //   });
    
    //   chain.invoke({
    //     input: messages[messages.length - 1].content
    // })
    // .catch(console.error);

    
    const chatOpenAI = getChatOpenAI();
    const prompt = ChatPromptTemplate.fromTemplate(TRIALSHUB_TEMPLATE);
    //const history = getUpstashRedisChatMessageHistory(sessionId);
    //const memory = getConversationSummaryBufferMemory('input', 'history', history);
  //   const memory = new BufferMemory({ 
  //     returnMessages: false, 
  //     memoryKey: "history", //history match with MessagesPlaceholde
  //     chatHistory: history
  //  }); 
  const url = process.env.UPSTASH_REDIS_URL || '';
  const token = process.env.UPSTASH_REST_TOKEN || '';
  const client = new Redis({
    url:url,
    token: token,
  });
  
  const memory = new BufferMemory({
    chatHistory: new UpstashRedisChatMessageHistory({
      sessionId: sessionId,
      client, // You can reuse your existing Redis client
    }),
  });
  
    const chain = getConversationChain(chatOpenAI.model, prompt, memory);
   
    chain.invoke({
      input: messages[messages.length - 1].content,
    });

    console.log(await memory.loadMemoryVariables({}));

    const streamTextResponse = new StreamingTextResponse(chatOpenAI.stream);
    return streamTextResponse;
}


export async function GET(req: Request) {

  const queryParams = getQueryParameters(req);
  const sessionId = queryParams.get('sessionId') as string;

  const history = getUpstashRedisChatMessageHistory(sessionId);
  if (history) {
      const historyMessages = await history.getMessages();
      const messages: Message[] = historyMessages.map(msg => {
          const role = msg instanceof HumanMessage ? 'user' : 'assistant';
          return {
              id: '',
              content: msg.content as string,
              role: role
          };
      });

      return NextResponse.json(messages)
  }
  else {
      return NextResponse.json([])
  }
}


const getQueryParameters = (req: Request) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(new URL(url).searchParams);
  return searchParams;
}

