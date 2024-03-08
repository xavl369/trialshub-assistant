'use client'

const MessageInput : React.FC<any> = ({ inputMessage, handleClick, buttonClass, placeholder, buttonText }) => {

    return(
        <div className="input-container mx-auto space-x-5 mt-9">
        <input 
          className='message-input text-3xl' 
          placeholder={placeholder}
          {... inputMessage}
        />
        <button 
          onClick={handleClick} 
          className={buttonClass}
          disabled={!inputMessage.value}
          >{buttonText}
        </button>
      </div>
    )

}


export default MessageInput;