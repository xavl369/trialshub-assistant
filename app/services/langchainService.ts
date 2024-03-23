
import { LangChainStream } from "ai"; 
import { OpenAI, ChatOpenAI } from "@langchain/openai";
import { ConversationChain } from 'langchain/chains';
import { ConversationSummaryBufferMemory } from 'langchain/memory';
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { CallbackManager } from '@langchain/core/callbacks/manager';
import { UpstashRedisChatMessageHistory } from '@langchain/community/stores/message/upstash_redis';

export const getUpstashRedisChatMessageHistory = (sessionId: string, sessionTTL: number = 0) => {

    const url = process.env.UPSTASH_REDIS_URL || '';
    const token = process.env.UPSTASH_REST_TOKEN || ''
    console.log(url);

    if(!url || !token){
        console.log('Url or Token not provided for history');
        return undefined;
    }

    const config = {
        url,
        token
    };

    const upstashChatHistory = new UpstashRedisChatMessageHistory({
        sessionId: sessionId,
        config: config,
        sessionTTL: sessionTTL //expiration time
    });

    return upstashChatHistory;
}

export const getConversationSummaryBufferMemory = (inputKey: string, memoryKey: string, chatHistory: any) => {

    const memory = new ConversationSummaryBufferMemory({
        llm: new OpenAI({ temperature: 0 }),
        inputKey: inputKey,
        memoryKey: memoryKey,
        chatHistory: chatHistory,
        returnMessages: false,
        //maxTokenLimit: 10,
    });

    return memory;
}

export const getConversationChain = (llm: ChatOpenAI,  prompt:ChatPromptTemplate, memory: any) => {
    const chain = new ConversationChain({
        memory: memory,
        prompt:  prompt,
        llm: llm,
      })

    return chain;
}

export const getChatOpenAI = () => {

    const { stream, handlers } = LangChainStream();  
    const callBackManager = CallbackManager.fromHandlers(handlers);

    const model = new ChatOpenAI({
      streaming: true,
      callbackManager: callBackManager 
    });

    return {model, stream};

}