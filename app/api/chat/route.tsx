import { LangChainStream, StreamingTextResponse, Message } from 'ai'
import { CallbackManager } from '@langchain/core/callbacks/manager';
import { ChatOpenAI } from '@langchain/openai';
//import { AIMessage, HumanMessage } from '@langchain/core/messages';
//import { PromptTemplate } from "@langchain/core/prompts";
import { TRIALSHUB_TEMPLATE } from '../../prompts/templates';
import {
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
    MessagesPlaceholder,
  } from "@langchain/core/prompts";
import { ConversationChain } from 'langchain/chains';
import { BufferMemory } from 'langchain/memory';
  
//for retieval using RetrievalQAChain using a retriever vectorStore from faiss file index
//import { readFileSync } from "node:fs";
//import { join } from "node:path";

export const runtime = "edge";


export const POST = async (req: Request) => {

    const { messages } = await req.json();
    const { stream, handlers } = LangChainStream();
    
    const model = new ChatOpenAI({
        streaming: true,
        callbackManager: CallbackManager.fromHandlers(handlers)
    });

    const chatPrompt = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate(
          TRIALSHUB_TEMPLATE
        ),
        new MessagesPlaceholder("history"),
        HumanMessagePromptTemplate.fromTemplate("{input}"),
      ]);

    // model.invoke(
    //     (messages as Message[]).map((m) =>
    //         m.role === 'user'
    //             ? new HumanMessage(m.content)
    //             : new AIMessage(m.content)
    //     )
    // )
    // .catch(console.error);

    const chain = new ConversationChain({
        memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
        prompt: chatPrompt,
        llm: model,
      });
    
      chain.invoke({
        input: messages[messages.length - 1].content
    })
    .catch(console.error);

    const streamTextResponse = new StreamingTextResponse(stream);
    return streamTextResponse;
}
