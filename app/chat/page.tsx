'use client'

import 'react';
import "../styles/chat.css";
import { useMessage } from '../contexts/messageContext';
import { useEffect, useRef, useState } from 'react';
import { Message, useChat } from 'ai/react';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import MessageInput from '../components/ui/MessageInput';

const Chat : React.FC = () => {

  const { inputMessage, setInputMessage } = useMessage();
  const [ isConfirmationVisible, setIsConfirmationVisible ] = useState(false);
  const { messages, append } = useChat();
  const messageContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => sendMessage(inputMessage.value), [])

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }

    if(messages && messages.length > 0){
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.content.includes('confirm')) {
        setIsConfirmationVisible(true);
      }
      else{
        setIsConfirmationVisible(false);
      }
    }
    
  }, [messages])

  const handleClick = (message:string) => {
    sendMessage(message);
  }
  
  const sendMessage = (message:string) => {
    append({ id: '', 
             role: 'user', 
             content: message !== '' ? message : ' ' 
            } as Message);
    setInputMessage('');
  }
 
  return (
    <div>
      <Header />
      <section>
        <div className="message-container" ref={messageContainerRef}>
          { messages.length > 0 && messages.map((m, i) => (
            m.content.trim() !== '' && (
              <div key={i} className="message-box rounded-xl block">
                <div
                  className={`chip inline-block mt-4 ml-3 border border-gray rounded-full text-white ${
                    m.role == 'user' ? 'color-user' : 'color-ai'
                  }`}
                >
                  {m.role == 'user' ? <p>You</p> : <p>TrialsHub</p>}
                </div>
                <p className="message max-w-full mt-3 ml-3 mr-3 text-justify text-xl">
                  {m.content}
                </p>
              </div>
            )))
          }

      </div>

      { isConfirmationVisible &&
        <div className="confirmButtons w-full flex justify-end space-x-5" >
          <button 
            onClick={(e) => handleClick('Yes I want to confirm')} 
            className="btn-yes text-white px-12 py-3 font-bold">YES
          </button>
          <button 
            onClick={(e) => handleClick('No')}  
            className="btn-no text-white px-12 py-3 font-bold">NO
          </button>
        </div>
      }

      <MessageInput 
          inputMessage={inputMessage} 
          handleClick={() => handleClick(inputMessage.value)} 
          buttonClass={"ask-btn inline-block bg-gray-200 rounded-md px-9 py-3 text-3xl text-white"}
          placeholder={"Type your response or questions..."}
          buttonText="send" 
      />
      </section>
      <Footer className={"footer flex justify-center w-full mt-[18px]"}/>
    </div>
  );
}

export default Chat;
