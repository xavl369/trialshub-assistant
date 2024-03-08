'use client'

import { useRouter } from 'next/navigation';
import { useMessage } from './contexts/messageContext';
import TrialButton from './components/ui/TrialButton';
import Footer from './components/ui/Footer';
import MessageInput from './components/ui/MessageInput';

const Home : React.FC = () => {

  const { inputMessage, setInputMessage } = useMessage();
  const router = useRouter();
  
  const handleClick = () => {
    router.push('/chat');
  }

  return (
      <main>
        <div className="text-center">
          <div className="mt-16">
            <h1 className="font-semibold text-8xl mb-9">Trialshub</h1>
            <p className="text-5xl">Your personal virtual trial coordinator for finding the right</p>
            <p className="text-5xl">trial for you or your loved one.</p>
            <p className="font-bold text-4xl mt-16">How I can help you today?</p>
          </div>
          
          <div className="flex flex-wrap justify-center mt-11 space-x-5">
            <TrialButton setTrial={setInputMessage}>Find a trial for myself</TrialButton>
            <TrialButton setTrial={setInputMessage}>I'm looking for a trial for someone else</TrialButton>
            <TrialButton setTrial={setInputMessage}>How does trialhub work</TrialButton> 
          </div>
        </div>

        <MessageInput 
          inputMessage={inputMessage} 
          handleClick={handleClick} 
          buttonClass={"ask-btn inline-block bg-gray-200 rounded-md px-12 py-4 text-3xl text-white"}
          placeholder={"Ask me anything about clinical trials"} 
          buttonText="ask"
        />
        
        <Footer className={"footer flex justify-center w-full mt-[72px]"} />

      </main>
  );
}

export default Home;
